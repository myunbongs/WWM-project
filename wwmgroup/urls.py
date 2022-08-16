from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('banuser', views.login, name='banuser'),
    path('<group_url>', views.joingroup, name='joingroup'),
]