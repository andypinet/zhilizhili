from sqlalchemy import *
from ..ctx import db

class Meta(db.Model):

    __tablename__ = 'metas'

    id = Column(Integer, primary_key=True, autoincrement=True)                                  # 项目主键
    name = Column(String(200), nullable=True)                                                   # 名称
    slug = Column(String(200), index=True, nullable=True)                                       # 项目缩略名
    type = Column(String(32), nullable=True)                                                    # 项目类型
    description = Column(String(200), nullable=True)                                            # 项目描述
    count = Column(Integer, nullable=True)                                                      # 项目所属内容个数
    order = Column(Integer, nullable=True)                                                      # 项目排序