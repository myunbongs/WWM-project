from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    address = models.CharField(max_length=50, unique = True, verbose_name='address')
    name = models.CharField(max_length=20, unique = True, verbose_name='name')
    avaliablity_days_time = models.TextField()  