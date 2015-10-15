from sqlalchemy import *
from ..ctx import db

class RelationShip(db.Model):

    __tablename__ = 'relationships'

    cid = Column(Integer, primary_key=True)                                # 内容主键
    mid = Column(Integer, primary_key=True)                                # 项目主键