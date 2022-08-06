import datetime
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class WwmGroup(models.Model) :
   groupid = models.IntegerField(primary_key=True) 
   groupname = models.CharField(max_length=20) 
   desc = models.CharField(max_length=100, help_text='그룹 설명', blank=True)  
   startdate = models.DateField(default=datetime.date.today )
   enddate = models.DateField(default=datetime.date.today )
   leader_email = models.CharField(max_length=30) 
   avaliablity_days_time = models.CharField(max_length=9999,blank=True) 

   @property
   def avaliablity_cal_length(self) :
       self.avaliablity_days_time = { (self.enddate - self.startdate) * 24 } * "0"
       return self.avaliablity_days_time

   memebers = models.ForeignKey(User, on_delete = models.CASCADE, null=True)
   
   point = models.CharField(max_length=40,blank=True) # 중간지점 
   url = models.URLField(default="http://127.0.0.1:8000") # 랜덤으로하는거 찾아보고..! 도전할게여 ..!

