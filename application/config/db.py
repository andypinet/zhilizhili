# -*- coding:utf-8 -*-
DB = {}

DB['driver'] = "mysql"
DB['url'] = 'localhost'
DB['port'] = '3306'
DB['db'] = 'zhilizhili'
DB['user'] = 'root'
DB['password'] = ''
DB['connect_settings'] = {
    'convert_unicode': True,
    'echo': True,
    'encoding': 'UTF-8'
}

SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:@localhost:3306/zhilizhili'