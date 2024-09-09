from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from os import path, urandom

db = SQLAlchemy()
DB_NAME = "database.db"
db_dir = path.abspath(path.dirname(__file__))


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = urandom(24)
    app.config["SESSION_PROTECTION"] = "basic"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:////{db_dir}/{DB_NAME}"

    from .views import views
    from .webapps import webapps
    from .starwars_api import starwars
    from .openai_api import openai
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(webapps, url_prefix="/app")
    app.register_blueprint(starwars, url_prefix="/api/starwars")
    app.register_blueprint(openai, url_prefix="/api/openai")

    return app