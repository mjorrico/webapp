from flask import Blueprint, make_response, request
import requests
import json
import os
import jwt
import datetime

openai = Blueprint("openai", __name__)

openai_api_key = os.getenv("OPENAI_API_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
model = "gpt-4o-mini"
head = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai_api_key}",
}

with open("natural_sql/static/config/json_schema.json", "r") as f:
    json_schema = json.load(f)

with open("natural_sql/static/config/json_schema_context.json", "r") as f:
    json_schema_context = json.load(f)


@openai.route("/chat-completion", methods=["POST"])
def people_api():
    json_messages = request.get_json()["messages"]
    jwt_token = request.get_json()["context"]
    try:
        token_decoded = jwt.decode(jwt_token, JWT_SECRET_KEY, algorithms=["HS256"])
    except:
        print(JWT_SECRET_KEY)
        raise SyntaxError("what??")

    context = token_decoded["message"]

    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": f"You are a professional SQL Query engineer with a special skill in translating natural language query to the most optimized SQL query. Given the following database schema in JSON format, you are responsible to translate user's query into SQL query!\n\n{context}",
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

    return r.json()


@openai.route("/validate-context", methods=["POST"])
def test():
    context = request.get_json()["proposedContext"]

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a database schema checker. Your task is to decide whether a database schema can be inferred from user's input.",
            },
            {"role": "user", "content": context},
        ],
        "response_format": json_schema_context,
    }

    r = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers=head,
        json=payload,
    )

    output = r.json()
    output["ip"] = request.get_json()["addr"]
    token = jwt.encode(
        {
            "iat": datetime.datetime.now().timestamp(),
            "message": output["choices"][0]["message"]["content"],
            "ip": request.get_json()["addr"],
        },
        JWT_SECRET_KEY,
        algorithm="HS256",
    )

    return {"token": token}
