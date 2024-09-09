from flask import Blueprint, render_template, make_response

webapps = Blueprint("webapps", __name__)

@webapps.route("/sql")
def home():
    page = render_template("sql.html")
    resp = make_response(page)
    return resp