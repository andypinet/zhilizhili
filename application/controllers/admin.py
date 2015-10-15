# -*- coding:utf-8 -*-
from flask import Blueprint, render_template, current_app
from ..ctx import db
from ..models.user import User
from ..models.comment import Comment
from ..models.content import Content
from ..models.meta import Meta
from ..models.option import Option
from ..models.relationship import RelationShip

ADMIN_TEMPLATE_FODLER = 'admin'

admin = Blueprint('admin', __name__)


@admin.route('/')
def index_page():
    user = User()
    print(user.created)
    return render_template(ADMIN_TEMPLATE_FODLER + "/index.jinja2")