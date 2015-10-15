# -*- coding:utf-8 -*-
from flask import Blueprint, render_template

INDEX_TEMPLATE_FODLER = 'index'

index = Blueprint('index', __name__)


@index.route('/')
def index_page():
    return render_template(INDEX_TEMPLATE_FODLER + "/index.jinja2")