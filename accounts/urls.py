from django.urls import path
from . import views

urlpatterns = [
    path('user_grouplist/',views.user_grouplist, name='get_user_grouplist'),
    path('save_personal_timetable',views.save_personal_timetable, name='save_personal_timetable'),
    path('edit_personal_timetable',views.edit_personal_timetable, name='edit_personal_timetable'),
    path('post_personal_timetable',views.post_personal_timetable, name='post_personal_timetable'),
]