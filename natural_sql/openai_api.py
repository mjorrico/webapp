from flask import Blueprint, make_response, request
import requests
import json
import os

openai = Blueprint("openai", __name__)

openai_api_key = os.getenv("OPENAI_API_KEY")
model = "gpt-4o-mini"
head = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}",
}

with open("natural_sql/static/config/bookstore_schema.txt", "r") as f:
    bookstore_schema = f.read()

with open("natural_sql/static/config/json_schema.json", "r") as f:
    json_schema = json.load(f)


@openai.route("/chat-completion", methods=["POST"])
def people_api():
    json_messages = request.get_json()["messages"]
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": f"You are a professional SQL Query engineer with a special skill in translating natural language query to the most optimized SQL query. Given the following database schema in JSON format, you are responsible to translate user's query into SQL query!\n\n{bookstore_schema}",
            },
        ],
        "response_format": json_schema,
    }
    payload["messages"] += json_messages[-10:]

    r = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=head,
        json=payload,
    )

    # print(r.json())

    return r.json()


@openai.route("/test")
def test():
    return "<h1>This is just a test</h1>"
