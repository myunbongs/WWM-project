from django import forms
from wwmgroup.models import WwmGroup


class groupForm(forms.ModelForm):
    class Meta:
        model = WwmGroup
        fields = ['groupname', 'desc', 'startdate', 'enddate']
