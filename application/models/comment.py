from sqlalchemy import *
from ..ctx import db

class Comment(db.Model):

    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, autoincrement=True)                          # comment表主键
    cid = Column(Integer, index=True)                                                   # post表主键,关联字段
    created = Column(Integer, nullable=True)                                            # 评论生成时的GMT unix时间戳
    author = Column(String(200), nullable=True)                                         # 评论作者
    authorId = Column(Integer, nullable=True)                                           # 评论所属用户id
    ownerId = Column(Integer, nullable=True)                                            # 评论所属内容作者id
    mail = Column(String(200), nullable=True)                                           # 评论者邮件
    url = Column(String(200), nullable=True)                                            # 评论者网址
    ip = Column(String(64), nullable=True)                                              # 评论者ip地址
    agent = Column(String(200), nullable=True)                                          # 评论者网址
    text = Column(Text, nullable=True)                                                  # 可为空
    type = Column(String(16), nullable=True)                                            # 评论类型
    status = Column(String(16), nullable=True)                                          # 评论状态
    parent = Column(Integer, nullable=True)                                             # 父级评论