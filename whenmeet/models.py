from django.db import models

class Timetable(models.Model):
    #user = models.ForeignKey('accounts.유저 클래스 이름',on_delete=models.CASCADE)
    day = models.DateField()
    schedule = models.CharField(max_length=24)

