# -*- coding:utf-8 -*-
from flask import Flask, abort, render_template, send_from_directory, request
import os
from settings import CONFIG

import models.db

app = Flask(__name__, template_folder=CONFIG['template_path'], static_folder=CONFIG['static_path'], static_url_path="/static")
app.jinja_env.variable_start_string = '{{ '
app.jinja_env.variable_end_string = ' }}'

@app.route("/")
def hello():
    return "hello world"


@app.route("/<path:path>")
def template_handler(path):
    tmp = render_template(path + ".jinja2")
    return tmp


if __name__ == "__main__":
    app.run()