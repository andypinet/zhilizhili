import math
from sqlalchemy import *
from datetime import datetime
from framework.models.base_model import Model

# 用户表

class User(Model):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)                    # 主键
    name = Column(String(32), unique=True)                                        # 用户名称
    password = Column(String(32), nullable=True)                                  # 用户密码
    mail = Column(String(200), unique=True)                                       # 用户的邮箱
    url = Column(String(200), nullable=True)                                      # 用户的主页
    screenName = Column(String(32), nullable=True)                                # 用户显示的名称
    created = Column(Integer, nullable=True)                                      # 用户注册的GMT unix时间戳
    activated = Column(Integer, nullable=True)                                    # 最后活动时间
    logged = Column(Integer, nullable=True)                                       # 上次登陆最后活跃时间
    group = Column(String(16))                                                    # 用户组
    authCode = Column(String(40))                                                 # 用户登录验证码

    def __init__(self, **kwargs):
        for key,kwarg in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, kwarg)
        self.created = math.floor(datetime.now().timestamp())
        self.activated = math.floor(datetime.now().timestamp())