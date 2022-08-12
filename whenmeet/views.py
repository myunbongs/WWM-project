from django.shortcuts import render
from wwmgroup.models import WwmGroup
from accounts.models import User

# 1-1. 그룹타임 테이블 뿌리는 view -> group_id를 받아야됨
def post_group_timetable(request):
    if request.method == 'POST':
        group_id = request.POST.get('group_id')
        start = find_start(WwmGroup.objects.get(id = '1').startdate)
        timetable = create_group_timetable(group_id)
        timetable = timetable[start*24:]+timetable[:start*24]
        context = {
            'timetable' : timetable, #리스트 형이며 리스트의 요소는 안되는사람의 이름들의 리스트임
            'startdate' : start, # index
        }
        return render(request,'(html이름).html',context)
# 1-2. 개인타임 테이블 뿌리는 view -> 시작일을 name = startdate 로 받아야됨
def post_personal_timetable(request):
    user = User.objects.get(id = '1')
    start = find_start(request.POST.get('startdate'))
    timetable = user.avaliablity_days_time
    timetable = timetable[start*24:]+timetable[:start*24]

    context = {
            'timetable' : timetable, #string 형으로 반환
            'startdate' : start, # index
    }
    return render(request,'test.html',context)
# 2-1. 그룹원들 타임 테이블 취합하는 view 
# - wwmgroup modeld의 avaliablity_cal_length 속성 사용 
# - 유저의 avaliablity_days_time가 일주일 기준으로 월요일부터 총 24글자씩이라고 가정
# - 유저의 avaliablity_days_time을 24씩 분리해서 wwmGroup의 시작요일과 매칭해서 24시간씩 비교 
def create_group_timetable(group_id):
    timetable = []
    group = WwmGroup.objects.get(id = '1')
    users_timetables = [[user.name,user.avaliablity_days_time] for user in group.user.all()]
    users = [data[0] for data in users_timetables]
    timetables = [data[1] for data in users_timetables]
    binds = list(map(list,zip(*timetables)))
    for bind in binds:
        timetable.append([users[i] for i in range(len(bind)) if bind[i]=='0'])

    return timetable
# 2-2. 시작 요일 구하는 view
# - 숫자 return 0(월), 1(화), 2(수) …  
# [python에서 datetime  불러와서 요일 구하는 로직] : https://ddolcat.tistory.com/688
def find_start(date):
    return date.weekday()
