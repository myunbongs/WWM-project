from django.urls import path
from wwmgroup import views

urlpatterns = [
    path('banuser', views.banuser, name='banuser'),
    path('join/<group_url>', views.joingroup, name='joingroup'),
    path('groupcreate', views.groupcreate, name='groupcreate'),
]