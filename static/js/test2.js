window.onload = function () {
  function onClick() {
    document.querySelector(".modal_wrap").style.display = "block";
    const title = document.getElementById("start_title");
    title.innerText = "출발지를 입력해주세요";
    title.style.color = "#828282";
  }
  function offClick() {
    document.querySelector(".modal_wrap").style.display = "none";
    const title = document.getElementById("start_title");
    title.innerText = "언제만나 팀의 출발지점 확인";
    title.style.color = "#000000";
  }

  document.getElementById("start_point").addEventListener("focus", onClick);
  document.querySelector(".modal_close").addEventListener("click", offClick);
};

function locationLoadSuccess(pos) {
  // 현재 위치 해당하는 위도/경도 받아오기(currentPos 변수에 저장)
  // var infom = new kakao.maps.geolocation();
  var currentPos = new kakao.maps.LatLng(
    pos.coords.latitude,
    pos.coords.longitude
  );

  lat = new kakao.maps.LatLng(pos.coords.latitude);
  lng = new kakao.maps.LatLng(pos.coords.longitude);
  //console.log(lat);
  // console.log(lng);

  let geocoder = new kakao.maps.services.Geocoder();

  //let coord = new kakao.maps.LatLng(lat, lng);
  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log("your crnt adress is ", result[0].address.address_name);
      document.getElementById("start_point").placeholder =
        result[0].address.address_name;
      const mySearch = document.getElementById("keyword");
      mySearch.value = result[0].address.address_name;
    }
  };

  geocoder.coord2Address(currentPos.getLng(), currentPos.getLat(), callback);

  console.log("your crnt coord is ", currentPos); //currentPos => 현재위치의 위도, 경도
}

function locationLoadError(pos) {
  alert("위치 정보를 가져오는데 실패했습니다.");
}

// 위치 가져오기 버튼 클릭시
function getCurrentPosBtn() {
  navigator.geolocation.getCurrentPosition(
    locationLoadSuccess,
    locationLoadError
  );
}

var markers = [];
var lati = document.getElementById("lat");
var langi = document.getElementById("lan");
//지도 argument 파트. 해당 옵션바탕으로 지도 생성(차후, center를 만날지점으로)
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표 (중간지점) 이곳을 lati, langi, lati.value ...등 시도해봄
    level: 3, // 지도의 확대 레벨
  };
//   lati.value, langi.value
// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다(검색어 입력 후, 돋보기 눌렀을때 연관 리스트들)
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
  var keyword = document.getElementById("keyword").value;

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면
    // 검색 목록과 마커를 표출합니다
    displayPlaces(data);

    // 페이지 번호를 표출합니다
    displayPagination(pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  var listEl = document.getElementById("placesList"),
    menuEl = document.getElementById("menu_wrap"),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = "";

  // 검색 결과 목록에 추가된 항목들을 제거합니다
  removeAllChildNods(listEl);

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker();

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i),
      itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    (function (marker, title, x, y) {
      itemEl.onclick = function () {
        displayInfowindow(marker, title, x, y);
        //console.log(x, y); //itemEl 클릭한 장소 좌표
        console.log(title); //itemEl 클릭한 장소 이름
      };
    })(marker, places[i].place_name, places[i].x, places[i].y);

    fragment.appendChild(itemEl);
  }

  // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  listEl.appendChild(fragment);
  menuEl.scrollTop = 0;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
  var el = document.createElement("li"),
    itemStr = '<div class="info">' + "   <h5>" + places.place_name + "</h5>";

  if (places.road_address_name) {
    itemStr +=
      "    <span>" +
      places.road_address_name +
      "</span>" +
      '   <span class="jibun gray">' +
      places.address_name +
      "</span>";
  } else {
    itemStr += "    <span>" + places.address_name + "</span>";
  }

  itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

  el.innerHTML = itemStr;
  el.className = "item";

  return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

//지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

console.log("바뀌었당");

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  // 기존에 추가된 페이지번호를 삭제합니다
  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = "on";
    } else {
      el.onclick = (function (i) {
        return function () {
          pagination.gotoPage(i);
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
function displayInfowindow(marker, title, x, y) {
  var content = title;

  const search = document.getElementById("keyword");
  search.value = content;

  //var position = new kakao.maps.LatLng(places[i].x, places[i].y);
  const myposition = document.getElementById("start_point");
  myposition.value = content;

  const longX = document.getElementById("lan");
  const latY = document.getElementById("lat");

  var latFix = x;
  var longFix = y;

  longX.value = latFix.substring(0, latFix.indexOf(".") + 6);
  latY.value = longFix.substring(0, latFix.indexOf(".") + 6);

  console.log(latY.value + "," + longX.value);
  console.log(
    "tmp test : doc.getEl.val = " + document.getElementById("lat").value
  );
  //console.log("tmp test :" + document.getElementById("lat"));
  console.log("print is " + lati.value);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
