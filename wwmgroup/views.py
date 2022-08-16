from django.shortcuts import render, get_object_or_404, redirect

from accounts.views import login
from accounts.models import User
from wwmgroup.forms import groupForm
from wwmgroup.models import WwmGroup


# 1. 그룹 생성하는 view,
# - 생성하는 순간 그룹장.그룹 고유 url 만든다.
# - wwmgroup model의 generate_random_slug_code 속성 사용

def groupcreate(request):
    user = get_object_or_404(User, pk=request.user.id)
    # 유저 아이디 받아옴.
    if request.method == 'POST':
        form = groupForm(request.POST, instance=WwmGroup)
        group = WwmGroup.objects.create(user=user, leader_email=request.user.email,
                                        wwmgroupurl=WwmGroup.generate_random_slug_code)
        if form.is_valid():
            group = form.save()
            group.save()
            # return redirect(group.groupUrl)#그룹 만들고 어디로 이동할지
    else:
        form = groupForm(instance=WwmGroup)
        return render(request, '그룹만드는화면.html', {'form': form})


# 2. 그룹장 변경 view
# - html에서 리더만 변경 추방 버튼에 접근 할 수 있음.
def changeleader(request, group_url, nextleader):
    group = WwmGroup.objects.filter(wwmgroupurl=group_url)
    for g in group:
        g.leader_email = nextleader
        g.save()
    return render(request, '그룹화면.html')


# 3. 그룹원 추방 view
# - 그룹장만 가능
def banuser(request, group_url, ban_user):
    banuser = WwmGroup.objects.filter(wwmgroupurl=group_url, user=ban_user)
    if banuser is not None:
        banuser.delete()
    return render(request, '그룹화면.html')


# 5 그룹원 리스트 출력하는 view
def grouplist(request, group_url):
    list = WwmGroup.objects.filter(wwmgroupurl=group_url)
    return render(request, '그룹원리스트출력.html', {'list': list})


# 6 그룹 가입하는 view
# 우선 그룹 url로 들어오면 가입하거나, 가입된 것을 확인하거나 둘 중 하나를 한다.

def joingroup(request, group_url):
    group = get_object_or_404(WwmGroup, wwmgroupurl=group_url)
    if request.user.is_authenticated:
        g, created = WwmGroup.objects.get_or_create(groupurl=group_url, user=request.user)
        return render(request, '그룹페이지.html')
    else:
        login(request)
        return redirect(f'/wwmgroup/{group_url}')


# 7 그룹 정보 전달
def showgroup(request, group_url):
    group = WwmGroup.objects.filter(wwmgroupurl=group_url, user=request.user)
    if group is not None:
        #whenmeet 에서 리턴값으로 타임테이블을 준다.
        return render(request, '그룹페이지.html', {'group': group})
    else:
        return render(request, '그룹에 가입 되어있지 않음.html')
