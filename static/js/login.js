document.getElementById("bar1").addEventListener("click", function () {
    console.log("click1")
});

document.getElementById("bar2").addEventListener("click", function () {
    console.log("click2")
});

document.getElementById("bar3").addEventListener("click", function () {
    console.log("click3")
});

link = 'index2.html';

function hrefLink() {
    location.href = link;
}