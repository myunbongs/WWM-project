from django.contrib import admin
from wwmgroup.models import WwmGroup
# Register your models here.

class UsersInline(admin.TabularInline):
    model = WwmGroup.user.through

class WwmGroupAdmin(admin.ModelAdmin):
    inlines = [
        UsersInline,
    ]
    exclude = ('user',)

admin.site.register(WwmGroup, WwmGroupAdmin)