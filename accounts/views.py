from django.shortcuts import render, redirect, get_object_or_404
from accounts.models import User
from wwmgroup.models import WwmGroup
from .forms import UserForm
from django.shortcuts import render, redirect
from .forms import RegisterForm


def home(request):
    return render(request,"accounts/main_page.html")

# 그룹리스트 전달하는 뷰
# 유저가 속한 그룹들 찾기 - 그룹 이름, 그룹원 출력
def user_grouplist(request):
    group_list = list(WwmGroup.objects.filter(user=request.user))
    user_list = []
    for group in group_list:
        user_list.append(list(group.user.all()))

    my_list = zip(group_list,user_list)

    if group_list is not None:
        # 그룹 이름과 그룸원 출력 
        return render(request, 'accounts/my_page.html',{'my_list':my_list})
    else:
        return redirect('/')


# 개인 타임 테이블 저장하는 뷰 
# request method post시 user avaliablity_days_time 필드에 저장하는 뷰 
def save_personal_timetable(request):
    user = User.objects.get(id='1')
    if request.method == 'POST':
        timetable = UserForm(request.POST)
        if timetable.is_valid():
            user.avaliablity_days_time = timetable.save()
            return render(request, 'test.html')
    else:
        avaliablity_days_time = UserForm()
        return render(request, 'test.html', {'avaliablity_days_time': avaliablity_days_time})


# user avaliablity_days_time 수정하는 뷰
def edit_personal_timetable(request):
    avaliablity_days_time = get_object_or_404(User.avaliablity_days_time, pk=request.user.id)
    if request.method == 'POST':
        new_timetable = UserForm(request.POST, instance=avaliablity_days_time)
        if new_timetable.is_valid():
            avaliablity_days_time = new_timetable.save()
            return redirect('test.html')


# user avaliablity_days_time 조회하는 뷰 (시작일을 name = startdate 로 받아야됨)
def post_personal_timetable(request):
    user = User.objects.get(id='1')
    start = find_start(request.POST.get('startdate'))
    timetable = user.avaliablity_days_time
    timetable = timetable[start * 24:] + timetable[:start * 24]

    context = {
        'timetable': timetable,  # string 형으로 반환
        'startdate': start,  # index
    }
    return render(request, 'test.html', context)


# 2-2. 시작 요일 구하는 view
# - 숫자 return 0(월), 1(화), 2(수) …  
# [python에서 datetime  불러와서 요일 구하는 로직] : https://ddolcat.tistory.com/688
def find_start(date):
    return date.weekday()


# 로그인 함수
def login(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        print(request)
        if form.is_valid():
            user = form.save()
            user.save()
        return render(request, 'accounts/my_page.html')
    else:
        form = RegisterForm()
        return render(request, 'accounts/login.html', {'form': form})

# 마이페이지 처음 화면
def my_home(request) :
    return render(request ,'accounts/home.html')