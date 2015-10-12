# -*- coding:utf-8 -*-
import os
APP_CONFIG = {}

APP_CONFIG['base'] = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
APP_CONFIG['static_path'] = os.path.join(APP_CONFIG['base'], "static/dist")
APP_CONFIG['template_path'] = os.path.join(APP_CONFIG['base'], "views")