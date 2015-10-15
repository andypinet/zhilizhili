from sqlalchemy import *
from ..ctx import db

class Content(db.Model):

    __tablename__ = 'contents'

    id = Column(Integer, primary_key=True, autoincrement=True)                              # post表主键
    title = Column(String(200), nullable=True)                                              # 内容标题
    slug = Column(String(200), index=True, nullable=True)                                   # 内容缩略名
    created = Column(Integer, index=True, nullable=True)                                    # 内容生成时的GMT unix时间戳
    modified = Column(Integer, nullable=True)                                               # 内容更改时的GMT unix时间戳
    text = Column(Text, nullable=True)                                                      # 内容文字
    order = Column(Integer, nullable=True)                                                  # 排序
    authorId = Column(Integer, nullable=True)                                               # 内容所属用户id
    template = Column(String(32), nullable=True)                                            # 内容使用的模板
    type = Column(String(16), nullable=True)                                                # 内容类别
    status = Column(String(16), nullable=True)                                              # 内容状态
    password = Column(String(32), nullable=True)                                            # 受保护内容,此字段对应内容保护密码
    commentsNum = Column(Integer, nullable=True)                                            # 内容所属评论数
    allowComment = Column(CHAR(1), nullable=True)                                           # 是否允许评论
    allowPing = Column(CHAR(1), nullable=True)                                              # 是否允许ping
    allowFeed = Column(CHAR(1), nullable=True)                                              # 允许出现在聚合中