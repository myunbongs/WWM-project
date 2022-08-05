from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
# 이메일
    userid =models.CharField(max_length=30, unique = True, verbose_name='email')
# 주소
    address = models.CharField(max_length=50, unique = True, verbose_name='address')
# 이름
    name = models.CharField(max_length=20, unique = True, verbose_name='name')
# 가입된 그룹 아이디
    groupid = models.IntegerField(max_length=20, unique = True, verbose_name='groupid')
