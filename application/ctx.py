import os
import json

from flask import Flask, abort, render_template, send_from_directory, request, jsonify, current_app
from flask.ext.sqlalchemy import SQLAlchemy

def create_app():
    APP_BASE = os.path.abspath(os.path.join(os.path.dirname(__file__)))
    STATIC_PATH = os.path.join(APP_BASE, 'static')
    TEMPLATE_PATH = os.path.join(APP_BASE, 'views')

    app = Flask(
        __name__,
        instance_relative_config=True,
        template_folder=TEMPLATE_PATH,
        static_folder=STATIC_PATH,
        static_url_path='/static'
    )
    app.config.from_object('application.config')
    app.config.from_pyfile('config.py')
    return app

app = create_app()
db = SQLAlchemy(app)
app.db = db


class InvalidAPIUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


class ViewException(Exception):

    def __init__(self, message):
        Exception.__init__(self)
        self.message = str(message)

    def to_dict(self):
        rv = dict(())
        rv['message'] = self.message
        return rv


@app.errorhandler(InvalidAPIUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.errorhandler(ViewException)
def handle_view_exception(error):
    response = jsonify(error.to_dict())
    return response



