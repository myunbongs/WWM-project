from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
# 주소
    address = models.CharField(max_length=50, unique = True, verbose_name='address')
# 이름
    name = models.CharField(max_length=20, unique = True, verbose_name='name')
# 일주일 기준으로 월요일부터 총 24글자씩이라고 가정 
    avaliablity_days_time: models.CharField(max_length=168)  