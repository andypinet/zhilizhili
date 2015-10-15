# -*- coding:utf-8 -*-
from flask import Blueprint, render_template, current_app
from ..ctx import app,db,ViewException
from ..models.user import User

INDEX_TEMPLATE_FOLDER = 'install'

install = Blueprint('install', __name__)


@install.route('/')
def index_page():
    admin = User(name="admin", password="admin")
    db.session.add(admin)

    try:
        db.session.commit()
    except Exception as e:
        raise ViewException(e)

    return render_template(INDEX_TEMPLATE_FOLDER + '/index.jinja2')