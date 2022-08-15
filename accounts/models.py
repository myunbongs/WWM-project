from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    latitude = models.FloatField(verbose_name='위도')
    longitude = models.FloatField(verbose_name='경도')
    name = models.CharField(max_length=20, unique = True, verbose_name='사용자 이름')
    avaliablity_days_time = models.TextField(verbose_name='meet 가능 시간')  