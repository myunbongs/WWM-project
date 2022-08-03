## ⚠️  WWM 협업시 주의사항

### 📍 최초 1회 세팅 방법

1. 자신의 repository로 fork 뜬다! 
    
    ※ fork시 main branch만 fork 뜨겠다 체크박스 해제하기 
    
2. fork 뜬 repository를 clone한다! 

```
$ git clone -b develop --single-branch https://github.com/{username}/WWM-project.git
```

1. project를 연다!
2. 가상환경을 생성한다! (아래는 MAC 기준) 

```
$ python3 -m venv venv 
$ source venv/bin/activate
```

1. pip list를 설치한다! 

```
$ pip install -r requirements.txt
```

### 👫 개발 규칙

> 🪵 **Git 브랜치** 
>- main (배포 브랜치) 
>- develop (개발 브랜치)

**💬 Git Convention 규칙**
- 깃모지 사용 [gitmoji](https://gitmoji.dev/)
- 접두사 feat, fix, … 기타 등등 붙여서 사용 
ex) git commit -m “feat: ✨ 개인별 시간 그래프 기능 추가"


