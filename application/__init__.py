__author__ = 'lbc'

from .ctx import app
from .controllers.index import index
from .controllers.admin import admin
from .controllers.install import install

app.register_blueprint(index, url_prefix='/index')
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(install, url_prefix='/install')