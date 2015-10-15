from sqlalchemy import *
from flask_sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from application.ctx import db

class BaseModel(db.Model):

    """Baseclass for custom user models."""

    #: the query class used. The `query` attribute is an instance
    #: of this class. By default a `BaseQuery` is used.
    query_class = BaseQuery

    #: an instance of `query_class`. Can be used to query the
    #: database for instances of this model.
    query = None

    id = Column(Integer, primary_key=True, autoincrement=True)                    # 主键

    def __init__(self, **kwargs):
        for key,kwarg in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, kwarg)


Model = declarative_base(cls=BaseModel)