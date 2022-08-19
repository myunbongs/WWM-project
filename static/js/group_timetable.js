//초기 표 생성
//지정날짜만큼 표 생성

//날짜 포맷 조작 함수
function leftPad(value) {
  if (value >= 10) {
      return value;
  }
  return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

toStringByFormatting(new Date(2021, 0, 1));


let startDate = new Date(); //시작날짜 -- 전단계에서 받아오기
let endDate = new Date("2022-07-12"); //끝 날짜 -- 전단계에서 받아오기

var FirstDay = toStringByFormatting(startDate);
var startDate_string = FirstDay;

var gap = endDate.getTime() - startDate.getTime();
var dateGap = Math.ceil(gap/(1000 * 60 * 60 * 24)) + 1; //차이 +1 (시작날짜 포함하기 때문)
var col = dateGap; //열 개수 -> gap
let myCal = [];

//초기 테이블 출력
makeTable();
function makeTable() {
  var row = 25; //행 개수 입력
  const table = document.getElementById('our_table') //our_table 선택

  for (var i=0; i < col; i++){ //열 개수 만큼
    var startMonth = new String(startDate.getMonth() + 1);
    startMonth = startMonth >= 10 ? startMonth : '0' + startMonth;  //month 두자리로 저장
    var startDay = new String(startDate.getDate());
    startDay = startDay >= 10 ? startDay : '0' + startDay;          //day 두자리로 저장

    const newRow = table.insertRow(); //tr태그 삽입
    const newCell1 = newRow.insertCell(); //1행에는 날짜 출력하는 td
    newCell1.id = "tableDays";
    newCell1.innerText = startMonth + "/" + startDay;
    startDate.setDate(startDate.getDate()+1); //1행마다 지정날짜 +1일 만큼 innertext처리

    for (var j=0; j< row-1; j++){
      const newCell2 = newRow.insertCell(); //2행부터는 빈 타임테이블 출력
    }

    document.getElementById('dateBox').innerText = FirstDay + "~" + startMonth + "-" + startDay;
  }
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

//modal창 관련
const modal = document.querySelector('.modal');
const outModal = document.querySelector('#out-btn');

outModal.addEventListener('click', () => {
  modal.style.display = 'block';
});

var whichBtn = 0;

//모달에서 나가기
document.querySelector("#modal_closedbtn").addEventListener("click", function() {
  $(".modal").hide();
  document.querySelector(".total").classList.toggle("blur");
});

//예 누르기
document.querySelector("#modal_Yesbtn").addEventListener("click", function() {
  $(".modal").hide();
  document.querySelector(".total").classList.toggle("blur");
  if (whichBtn == 1) {
    console.log("추방");
  } else if (whichBtn == 2) {
    console.log("초대");
  } else {
    console.log("양도");
  }
});

//그룹원 추방 버튼을 눌렀을 때
document.querySelector("#out-btn").addEventListener("click", function() {

  // var username = {{user_list | safe}};
  // var count_name = username.length;
  
  $(".modal").show();
  document.querySelector(".total").classList.toggle("blur");
  document.getElementById("modal_text").innerHTML = "이 그룹원을 추방하시겠습니까?";
  // for( var i=0;  i<=count_name){
  //   doucument.getElementById("modal_name").innerHTML=
  // }
  whichBtn = 1;
});

//초대 버튼을 눌렀을 때
document.querySelector("#invite-btn").addEventListener("click", function() {
  $(".modal").show();
  document.querySelector(".total").classList.toggle("blur");
  document.getElementById("modal_text").innerHTML = "그륩원에 새로 초대하시겠습니까?";
  whichBtn = 2;
});

//양도 버튼을 눌렀을 때
document.querySelector("#transfer-btn").addEventListener("click", function() {
  $(".modal").show();
  document.querySelector(".total").classList.toggle("blur");
  document.getElementById("modal_text").innerHTML = "누구에게 방장을 양도하시겠습니까?";
  whichBtn = 3;
});
