//최종본
//초기 표 생성
//지정날짜만큼 표 생성

//날짜 포맷 조작 함수
function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

function toStringByFormatting(source, delimiter = "-") {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}

toStringByFormatting(new Date(2021, 0, 1));

let startDate = new Date("2022-08-08"); //시작날짜 -- 전단계에서 받아오기
let endDate = new Date("2022-08-15"); //끝 날짜 -- 전단계에서 받아오기

var FirstDay = toStringByFormatting(startDate);
var LastDay = toStringByFormatting(endDate);
var startDate_string = FirstDay;

var gap = endDate.getTime() - startDate.getTime();
var dateGap = Math.ceil(gap / (1000 * 60 * 60 * 24)) + 1; //차이 +1 (시작날짜 포함하기 때문)
var col = dateGap; //열 개수 -> gap
let myCal = [];

//초기 테이블 출력
makeTable();
function makeTable() {
  var row = 25; //행 개수 입력
  var col = 7;
  const table = document.getElementById("our_table"); //our_table 선택

  for (var i = 0; i < 7; i++) {
    //열 개수 만큼
    var startMonth = new String(startDate.getMonth() + 1);
    startMonth = startMonth >= 10 ? startMonth : "0" + startMonth; //month 두자리로 저장
    var startDay = new String(startDate.getDate());
    startDay = startDay >= 10 ? startDay : "0" + startDay; //day 두자리로 저장

    const newRow = table.insertRow(); //tr태그 삽입
    const newCell1 = newRow.insertCell(); //1행에는 날짜 출력하는 td
    newCell1.id = "tableDays";
    newCell1.innerText = weekdays[i];
    // document.getElementById("tableDays").getElementsByTagName("tr")[3].innerHTML ="화"
    // newCell1.innerText = startMonth + "/" + startDay;
    // startDate.setDate(startDate.getDate()+1); //1행마다 지정날짜 +1일 만큼 innertext처리

    for (var j = 0; j < row - 1; j++) {
      const newCell2 = newRow.insertCell(); //2행부터는 빈 타임테이블 출력
    }

    document.getElementById("dateBox").innerText = startdate + "~" + enddate;
  }
  const ourtable = document.getElementById("our_table"); //our_table 선택
  for (var i = 1; i <= 7; i++) {
    for (var j = 1; j <= row - 1; j++) {
      ourtable.rows[i].cells[j].classList.add("checkbox");
    }
  }

  // //myCal list받아오기 ~ 아래의 이 데이터를 받아왔다고 가정했을 때.
  let myCalStr = timetable;
  $(document).ready(function () {
    var row = 24;
    var sliced_myCal = myCalStr.split("");
    const table = document.getElementById("our_table"); //our_table 선택
    console.log(sliced_myCal);

    // for (var a=0; a<myCalStr.length; a++){
    var a = 0;

    for (var i = 1; i <= col; i++) {
      for (var j = 1; j <= row; j++) {
        if (sliced_myCal[a++] == 1) {
          //1이면 색칠하기
          table.rows[i].cells[j].classList.add("highlighted");
        }
      }
    }
  });

  // for (var a=0; a< dateGap*24; a++){
  //   myCal.push('0');
  // }

  //myCal list에 1이 있으면 반영 - class 추가
  // var chunk_size = 7;
  // var sliced_myCal = [];
  // for(var i=0; i<myCal.length; i+=chunk_size) sliced_myCal.push(myCal.slice(i, i+chunk_size));
  // console.log(sliced_myCal);

  // for (var i=1; i<col; i++){
  //   for (var j=1; j< row-1; j++){
  //       if (sliced_myCal[i][j] == 1){
  //         mytable.rows[i].cells[j].classList.add('fixedCal');
  //       } else { myCal.push('0'); }
  //     }
  //   }
}

// 드래그했을 때 table 색깔이 변함 - 가능시간 / 불가능 시간
function is_checked() {
  const checkbox = document.getElementsByClassName("checkbox");
  const is_checked = checkbox.checked;
  console.log(is_checked);
}

$(function () {
  var isMouseDown = false;
  $("#our_table td")
    .mousedown(function () {
      isMouseDown = true;
      $(this).toggleClass("highlighted"); //highlighted class 토글 방식으로 추가
      return false; // prevent text selection
    })
    .mouseover(function () {
      if (isMouseDown) {
        $(this).toggleClass("highlighted");
      }
    })
    .bind("selectstart", function () {
      return false; // prevent text selection in IE
    });

  $(document).mouseup(function () {
    isMouseDown = false;
  });
});

//타임테이블 초기화
$(document).ready(function () {
  $("#init-btn").click(function () {
    $("td").removeClass("highlighted"); //highlighted class 삭제
  });
});

// let calendars = [
//     {% for calendar in calendars %}
//     {
//        date : "{{ calendar.title }}",
//        time : "{{ calendar.content }}",
//     },
//   {% endfor %}
//   ]

//저장하기 버튼 - 셀이 선택되어있으면 1, 선택되어있지않으면 0 리스트로 표시
$(document).ready(function () {
  var row = 25;
  $("#save_button").click(function () {
    const mytable = document.getElementById("our_table");
    for (var i = 1; i < col; i++) {
      for (var j = 1; j <= row - 1; j++) {
        //일정 있는 시간 드래그 모드
        if (mytable.rows[i].cells[j].classList.contains("highlighted")) {
          myCal.push("1");
        } else {
          myCal.push("0");
        }
      }
    }
    console.log(myCal);
    const myCalStr = myCal.join("");

    $.ajax({
      //요청이 전송될 URL 주소
      url: "/whenmeet/edit_personal_timetable/",
      type: "POST",
      dataType: "JSON",
      data: {
        timetable: myCalStr,
        csrfmiddlewaretoken: "{{ csrf_token }}",
      },
      headers: { "X-CSRFToken": "{{ csrf_token }}" },

      success: function () {
        console.log("1");
        location.reload();
      },
      error: function (xhr, textStatus, thrownError) {
        alert(
          "Could not send URL to Django. Error: " +
            xhr.status +
            ": " +
            xhr.responseText
        );
      },
    });
  });
});

//inform icon 위에 커서 올렸을 때
//설명 말풍선 보여주기
// $(document).ready(function() {
// $(".inform_img").mouseover(function() {
//   $(".informBox").css({"display" : "block"});
//   });
// });

function show(id) {
  document.getElementById(id).style.display = "block";
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}
