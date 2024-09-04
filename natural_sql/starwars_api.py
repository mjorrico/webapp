from flask import Blueprint, make_response
import requests
import json

starwars = Blueprint("starwars", __name__)

@starwars.route("/people")
def people_api():
    r = requests.get("https://swapi.dev/api/people/69")
    return r.json()