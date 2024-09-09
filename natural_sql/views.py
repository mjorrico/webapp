from flask import Blueprint, render_template, make_response

views = Blueprint("views", __name__)

@views.route("/")
def home():
    page = render_template("homepage.html")
    resp = make_response(page)
    return resp

@views.route("/about")
def tentang():
    page = render_template("about.html")
    resp = make_response(page)
    return resp

@views.route("/portfolio")
def porto():
    page = render_template("app_homepage.html")
    resp = make_response(page)
    return resp