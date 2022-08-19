from django.urls import path,include
from . import views
whenmeet_patterns = [
    path('group_timetable/<int:pk>',views.post_group_timetable,name = "get_group_timetable"),
    path('personal_timetable/',views.post_personal_timetable,name = "get_personal_timetable"),
    path('edit_personal_timetable/',views.edit_personal_timetable,name= "edit_personal_timetable"),
]

urlpatterns = [
    path('whenmeet/', include(whenmeet_patterns)),
]