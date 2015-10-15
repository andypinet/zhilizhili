from framework.exceptions.NotSupportException import *


def gennerate_connection(driverName, **config):
    connection = ""
    if driverName == "mysql":
        connection = 'mysql+mysqlconnector://%s:%s@%s:%s/%s' % (config['user'],
                                                                config['password'],
                                                                config['url'],
                                                                config['port'],
                                                                config['db'])
    else:
        raise NotSupportException("we don not supprt other driver")
    return connection
