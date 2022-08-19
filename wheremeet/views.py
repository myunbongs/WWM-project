import json
import math
from django.http import JsonResponse
from django.shortcuts import render
import pandas as pd

from wwmgroup.models import WwmGroup

def main(reqeust, group_pk):

    wwmgroup = WwmGroup.objects.get(id=group_pk)

    user_list = wwmgroup.user.all()        

    context = {
        'group': wwmgroup, 
        'user_list': user_list 
    }

    return render(reqeust, 'wheremeet/coordinate_save.html', context)

# 참고 로직: https://coding-god.tistory.com/72

# 1. 프론트엔드에서 그룹원별 위치 정보(위도, 경도) 받는 함수  
def save_coordinate(request):
    
    if request.method == 'POST':
        coordinate = json.loads(request.body)

        current_user = request.user

        address = coordinate['address']
        latitude= float(coordinate['latitude'])
        longitude= float(coordinate['longitude'])

        print(latitude, longitude)

        current_user.address = address
        current_user.latitude = latitude
        current_user.longitude = longitude

        current_user.save()
        
        context={'latitude': current_user.latitude, 'longitude': current_user.longitude}
    
    return JsonResponse(context)

# 2. 중간 지점 및 가장 가까운 지하철 역 뿌리는 view 
def wheremeet_result(request, group_pk):

    wwmgroup = WwmGroup.objects.get(id=group_pk)

    user_list = wwmgroup.user.all()

    user_count = len([user for user in wwmgroup.user.all()])
    user_coors = list(wwmgroup.user.all().values('name', 'latitude', 'longitude'))

    latitude, longitude = cal_center(user_list)


    station = cal_close_station(latitude, longitude, 'wheremeet/서울시 역사마스터 정보.csv')

    wwmgroup.meeting_station = station['역사명']

    wwmgroup.save()

    context = {
        'user_coors': user_coors, 
        'user_list': user_list,
        'user_count': user_count,
        'station': wwmgroup.meeting_station,
        'latitude_station': station['위도'], 
        'longitude_station': station['경도'],
        'group_pk':group_pk
    }

    return render(request, 'wheremeet/group_station.html', context)


# 2-1. 그룹원별 위치 정보(위도, 경도)의 평균 계산 함수 
def cal_center(user_list):

    latitude = 0.0
    longitude = 0.0

    for user in user_list:
        latitude += user.latitude 
        longitude += user.longitude

    latitude = latitude / user_list.count()
    longitude = longitude / user_list.count()

    print(latitude, longitude)

    return latitude, longitude


# 2-2. 서울시 역사마스터 정보.csv dataframe 형태로 저장
# - 컬럼: 역사_ID, 역사명, 호선, 위도, 경도 
def cal_close_station(latitude, longitude, file_name):
    df = pd.read_csv(file_name, encoding='cp949')
    df['center_latitude'] = latitude
    df['center_longitude'] = longitude
    df['최종 거리'] = float('inf')

    for i, row in df.iterrows():
        df['최종 거리'][i] = distance(float(row['center_latitude']), float(row['center_longitude']), float(row['위도']), float(row['경도']))

    station = df.loc[df["최종 거리"].idxmin()]

    print(station)
    print(station.center_latitude, station.center_longitude ) 
    return station

# 두 점 사이의 거리 구하기 
def distance(x1, y1, x2, y2):
    result = math.sqrt( math.pow(x1 - x2, 2) + math.pow(y1 - y2, 2))
    return result