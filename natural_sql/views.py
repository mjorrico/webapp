from flask import Blueprint, render_template, make_response

views = Blueprint("views", __name__)

@views.route("/")
def home():
    page = render_template("sql.html")
    resp = make_response(page)
    return resp