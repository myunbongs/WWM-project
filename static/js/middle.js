window.onload = function () {
  function onClick() {
    document.querySelector(".modal_wrap").style.display = "block";
  }
  function offClick() {
    document.querySelector(".modal_wrap").style.display = "none";
  }

  document.getElementById("result").addEventListener("click", onClick);
  document.querySelector(".goBack").addEventListener("click", offClick);
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

//var lati = document.getElementById("lat").value;
//var langi = document.getElementById("lan").value;
//지도 argument 파트. 해당 옵션바탕으로 지도 생성(차후, center를 만날지점으로)
// var mapContainer = document.getElementById("map"), // 지도를 표시할 div
//   mapOption = {
//     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표(kakao) (중간지점)
//     level: 3, // 지도의 확대 레벨
//   };
//   lati.value, langi.value
// 지도를 생성합니다
// var map = new kakao.maps.Map(mapContainer, mapOption);

// var positions = [
//   {
//     title: "임진강",
//     latlng: new kakao.maps.LatLng(37.888421, 126.746765),
//   },
//   {
//     title: "용답",
//     latlng: new kakao.maps.LatLng(37.561904, 127.050899),
//   },

//   {
//     title: "신설동",
//     latlng: new kakao.maps.LatLng(37.574747, 127.024932),
//   },
// ];

// // 마커 이미지의 이미지 주소입니다
// var imageSrc =
//   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

// for (var i = 0; i < positions.length; i++) {
//   // 마커 이미지의 이미지 크기 입니다
//   var imageSize = new kakao.maps.Size(24, 35);

//   // 마커 이미지를 생성합니다
//   var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

//   // 마커를 생성합니다
//   var marker = new kakao.maps.Marker({
//     map: map, // 마커를 표시할 지도
//     position: positions[i].latlng, // 마커를 표시할 위치
//     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//     image: markerImage, // 마커 이미지
//   });
// marker.setMap(map);
// }

//   // 지도에 표시되고 있는 마커를 제거합니다
//   removeMarker();

//   //   for (var i = 0; i < places.length; i++) {
//   //     // 마커를 생성하고 지도에 표시합니다
//   //     var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//   //       marker = addMarker(placePosition, i),
//   //       itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//   //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//   //     // LatLngBounds 객체에 좌표를 추가합니다
//   //     bounds.extend(placePosition);

//   //     // 마커와 검색결과 항목에 mouseover 했을때
//   //     // 해당 장소에 인포윈도우에 장소명을 표시합니다
//   //     // mouseout 했을 때는 인포윈도우를 닫습니다
//   //     (function (marker, title, x, y) {
//   //       itemEl.onclick = function () {
//   //         displayInfowindow(marker, title, x, y);
//   //         //console.log(x, y); //itemEl 클릭한 장소 좌표
//   //         console.log(title); //itemEl 클릭한 장소 이름
//   //       };
//   //     })(marker, places[i].place_name, places[i].x, places[i].y);

//   //     fragment.appendChild(itemEl);
//   //   }

// //   // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
// //   listEl.appendChild(fragment);
// //   menuEl.scrollTop = 0;

// //   // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
// // }

// // // 검색결과 항목을 Element로 반환하는 함수입니다
// // function getListItem(index, places) {
// //   var el = document.createElement("li"),
// //     itemStr = '<div class="info">' + "   <h5>" + places.place_name + "</h5>";

// //   if (places.road_address_name) {
// //     itemStr +=
// //       "    <span>" +
// //       places.road_address_name +
// //       "</span>" +
// //       '   <span class="jibun gray">' +
// //       places.address_name +
// //       "</span>";
// //   } else {
// //     itemStr += "    <span>" + places.address_name + "</span>";
// //   }

// //   itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

// //   el.innerHTML = itemStr;
// //   el.className = "item";

// //   return el;
// // }

// // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
// // function addMarker(position, idx, title) {
// //   var imageSrc =
// //       "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
// //     imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
// //     imgOptions = {
// //       spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
// //       spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
// //       offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
// //     },
// //     markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
// //     marker = new kakao.maps.Marker({
// //       position: position, // 마커의 위치
// //       image: markerImage,
// //     });

// //   marker.setMap(map); // 지도 위에 마커를 표출합니다
// //   markers.push(marker); // 배열에 생성된 마커를 추가합니다

// //   return marker;
// // }

// // //지도 위에 표시되고 있는 마커를 모두 제거합니다
// // function removeMarker() {
// //   for (var i = 0; i < markers.length; i++) {
// //     markers[i].setMap(null);
// //   }
// //   markers = [];
// // }

// // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// // function displayPagination(pagination) {
// //   var paginationEl = document.getElementById("pagination"),
// //     fragment = document.createDocumentFragment(),
// //     i;

// //   // 기존에 추가된 페이지번호를 삭제합니다
// //   while (paginationEl.hasChildNodes()) {
// //     paginationEl.removeChild(paginationEl.lastChild);
// //   }

// //   for (i = 1; i <= pagination.last; i++) {
// //     var el = document.createElement("a");
// //     el.href = "#";
// //     el.innerHTML = i;

// //     if (i === pagination.current) {
// //       el.className = "on";
// //     } else {
// //       el.onclick = (function (i) {
// //         return function () {
// //           pagination.gotoPage(i);
// //         };
// //       })(i);
// //     }

// //     fragment.appendChild(el);
// //   }
// //   paginationEl.appendChild(fragment);
// // }

// // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// // function displayInfowindow(marker, title, x, y) {
// //   var content = title;

// //   const search = document.getElementById("keyword");
// //   search.value = content;

// //   //var position = new kakao.maps.LatLng(places[i].x, places[i].y);
// //   const myposition = document.getElementById("start_point");
// //   myposition.value = content;

// //   const langX = document.getElementById("lan");
// //   const latY = document.getElementById("lat");
// //   langX.value = x;
// //   latY.value = y;

// //   console.log(latY.value + "," + langX.value);
// //   console.log("tmp test : doc.getEl.val = " + document.getElementById("lat"));
// //   //console.log("tmp test :" + document.getElementById("lat"));
// //   console.log("print is " + lati.value);
// // }

// // // 검색결과 목록의 자식 Element를 제거하는 함수입니다
// // function removeAllChildNods(el) {
// //   while (el.hasChildNodes()) {
// //     el.removeChild(el.lastChild);
// //   }
//}
