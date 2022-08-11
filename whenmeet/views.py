from django.shortcuts import render

# 1. 타임 테이블 뿌리는 view 

# 2-1. 그룹원들 타임 테이블 취합하는 view 
# - wwmgroup modeld의 avaliablity_cal_length 속성 사용 
# - 유저의 avaliablity_days_time가 일주일 기준으로 월요일부터 총 24글자씩이라고 가정
# - 유저의 avaliablity_days_time을 24씩 분리해서 wwmGroup의 시작요일과 매칭해서 24시간씩 비교 

# 2-2. 시작 요일 구하는 view
# - 숫자 return 0(월), 1(화), 2(수) …  
# [python에서 datetime  불러와서 요일 구하는 로직] : https://ddolcat.tistory.com/688

# 3. 그룹 고유 url 만드는 view 
# - wwmgroup model의 generate_random_slug_code 속성 사용 
