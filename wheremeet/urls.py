from django.contrib import admin
from django.urls import path, include
from wheremeet.views import main, save_coordinate, wheremeet_result

urlpatterns = [
    path('wheremeet/<int:group_pk>/', main, name='main'),
    path('save-coordinate/', save_coordinate, name='save-coordinate'), 
    path('wheremeet/result/<int:group_pk>/', wheremeet_result, name='wheremeet-result'), 
]
