from sqlalchemy import *
from ..ctx import db

class Option(db.Model):

    __tablename__ = 'options'

    id = Column(Integer, primary_key=True, autoincrement=True)                  # 主键
    name = Column(String(32), primary_key=True)                                 # 配置名称
    user = Column(Integer, primary_key=True, default=0)                         # 配置所属用户,默认为0(全局配置)
    value = Column(Text, nullable=True)                                         # 配置值