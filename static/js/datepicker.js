// $(function() {
// $('input[name="daterangepicker]"').daterangepicker({
//     "autoApply": true,
//     "showCustomRangeLabel": false,
//     "alwaysShowCalendars": true,
//     "startDate": "08/12/2022",
//     "endDate": "08/18/2022",
//     "opens": "center"
// }, function(start, end, label) {
//   console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
//     });
// });

document.querySelector(".makeRoom").addEventListener("click", function() {
  document.querySelector(".groupbox").classList.toggle("show");
  document.querySelector(".total").classList.toggle("blur-effect");
});


$(function() {

  $('input[name="calender"]').daterangepicker({
    "alwaysShowCalendars": true,
    "autoApply": true,
    "opens": "center"},
      function(start, end, label) {
        document.getElementById("startdate").value=String(start.format('YYYY-MM-DD'))
        document.getElementById("enddate").value=String(end.format('YYYY-MM-DD'))
      });
      $('input[name="calender"]').data('daterangepicker').show();
});

document.querySelector(".makeRoom2").addEventListener("click", function() {
  console.log(document.getElementById("postSubmit"))
  document.getElementById("postSubmit").click();
});
