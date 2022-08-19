from django.urls import path
from wwmgroup import views

urlpatterns = [
    path('banuser', views.banuser, name='banuser'),
    path('join/<group_url>', views.joingroup, name='joingroup'),
    path('groupcreate', views.groupcreate, name='groupcreate'),
    path('<group_url>/leave', views.leavegroup, name='leavegroup'),
    path('<group_url>/changeleader', views.changeleader, name='changeleader'),
    path('<int:pk>/banuser/<ban_user>', views.banuser, name='banuser'),
]