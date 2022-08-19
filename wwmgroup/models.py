import base64
import codecs
import datetime
import uuid
from django.db import models
from accounts.models import User


# Create your models here.
class WwmGroup(models.Model):
    groupname = models.CharField(max_length=20)
    desc = models.CharField(max_length=100, help_text='그룹 설명', blank=True)
    startdate = models.DateField(default=datetime.date.today)
    enddate = models.DateField(default=datetime.date.today)
    leader_email = models.CharField(max_length=30)
    wwmgroupurl = models.CharField(max_length=1000, blank=True)

    meeting_time = models.CharField(max_length=100, blank=True)  # 최종 모임 시각
    meeting_station = models.CharField(max_length=50, blank=True)  # 최종 모임 장소(역)

    user = models.ManyToManyField(User)

    @property
    def avaliablity_cal_length(self):
        self.avaliablity_days_time = {(self.enddate - self.startdate) * 24} * "0"
        return self.avaliablity_days_time


