from framework.exceptions import NotSupportError


def gennerate_connection(driverName, **config):
    connection = ""
    if driverName == "mysql":
        connection = 'mysql+mysqlconnector://%s:%s@%s:%s/%s' % (config['user'],
                                                                config['password'],
                                                                config['url'],
                                                                config['port'],
                                                                config['db'])
    else:
        raise NotSupportError("we don not supprt other driver")
    return connection
