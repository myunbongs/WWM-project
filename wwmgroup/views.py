from django.shortcuts import render, get_object_or_404, redirect

from accounts.views import login
from accounts.models import User
from wwmgroup.forms import groupForm
from wwmgroup.models import WwmGroup

import base64
import codecs
import uuid

def final_result(request, group_pk):
    group = get_object_or_404(WwmGroup, pk=group_pk)
    user = get_object_or_404(User, pk=request.user.id)
    if group.user.get(email=user.email):
        return render(request, 'wwmgroup/final_result.html', context={'group_pk':group_pk})
    else:
        return render(request, 'wwmgroup/failconnect.html')

# 1. 그룹 생성하는 view,
# - 생성하는 순간 그룹장.그룹 고유 url 만든다.
# - wwmgroup model의 generate_random_slug_code 속성 사용

def groupcreate(request):
    user = get_object_or_404(User, pk=request.user.id)
    #user = get_object_or_404(User,pk='1') # test용 !

    # 유저 아이디 받아옴.
    if request.method == 'POST':
        group = WwmGroup.objects.create(leader_email=request.user.email, wwmgroupurl=generate_random_slug_code(8))
        #group = WwmGroup.objects.create(leader_email='asdasd@naver.com', wwmgroupurl=generate_random_slug_code(8))
        form = groupForm(request.POST, instance=group)
        group.user.add(user)
        if form.is_valid():
            group = form.save()
            group.save()
            return redirect(f'wwmgroup/{group.pk}')#그룹 만들고 어디로 이동할지
    else:
        user = get_object_or_404(User, pk=request.user.id)
        form = groupForm()
        context = {
            "username": user.username,
            "leaderemail": user.email,
            'form': form
        }
        return render(request, 'whenmeet/datepicker.html', context)


# 2. 그룹장 변경 view
# - html에서 리더만 변경 추방 버튼에 접근 할 수 있음.
def changeleader(request, group_url):
    group = WwmGroup.objects.get(wwmgroupurl=group_url)
    if request.method == 'GET':
        leaderemail = request.GET['email']
        group.leader_email = leaderemail
    elif request.method == 'POST':
        leaderemail = request.POST['email']
        group.leader_email = leaderemail
    return render(request, 'whennmeet/.html')


# 3. 그룹원 추방 view
# - 그룹장만 가능
def banuser(request, pk, ban_user):
    group = WwmGroup.objects.get(pk=pk)
    if request.user.email == group.leader_email:
        banuser = get_object_or_404(User, email=ban_user)
        group.user.remove(banuser)
        return render(request, 'wwmgroup/successban.html')
    else:
        return render(request, 'wwmgroup/failban.html')


# 5 그룹원 리스트 출력하는 view
"""def grouplist(request, group_url):
    list = WwmGroup.objects.filter(wwmgroupurl=group_url)
    return render(request, '그룹원리스트출력.html', {'list': list})"""


# 6 그룹 가입하는 view
# 우선 그룹 url로 들어오면 가입하거나, 가입된 것을 확인하거나 둘 중 하나를 한다.

def joingroup(request, group_url):
    if request.user.is_authenticated:
        user = get_object_or_404(User, pk=request.user.id)
        group = get_object_or_404(WwmGroup, wwmgroupurl=group_url)
        group.user.add(user)
        return render(request, 'wwmgroup/final_result.html', context={'group_pk': group.pk})
    else:
        login(request)
        return redirect(f'/wwmgroup/join/{group_url}')


# 7 그룹 정보 전달
"""def showgroup(request, group_url):
    group = WwmGroup.objects.filter(wwmgroupurl=group_url, user=request.user)
    if group is not None:
        #whenmeet 에서 리턴값으로 타임테이블을 준다.
        return render(request, '그룹페이지.html', {'group': group})
    else:
        return render(request, '그룹에 가입 되어있지 않음.html')"""

def leavegroup(request, group_url):
    group = get_object_or_404(WwmGroup, wwmgroupurl = group_url)
    user = get_object_or_404(User, pk=request.user.id)
    group.user.remove(user)
    return redirect('/accounts/my_home')


def generate_random_slug_code(length):
        """
    generates random code of given length
    """
        return base64.urlsafe_b64encode(
            codecs.encode(uuid.uuid4().bytes, "base64").rstrip()
        ).decode()[:length]

def group_test(request) :
    return render(request,'whenmeet/datepicker.html')

def input_address(request,pk) :
    return render(request,'wheremeet/coordinate_save.html',{'pk':pk})