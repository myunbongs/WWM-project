from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    address = models.CharField(max_length=100, verbose_name='사용자 주소', blank=True)
    latitude = models.FloatField(verbose_name='위도', null=True,default = 0)
    longitude = models.FloatField(verbose_name='경도', null=True,default = 0)
    name = models.CharField(max_length=20, unique=False, verbose_name='사용자 이름', blank=True)
    avaliablity_days_time = models.TextField(verbose_name='meet 가능 시간', blank=True,default="0"*168)

    def __str__(self):
        return self.username

    def __str__(self):
        return self.email
