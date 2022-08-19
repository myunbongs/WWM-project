document.getElementById("bar1").addEventListener("click", function () {
    console.log("click1")
});

document.getElementById("bar2").addEventListener("click", function () {
    console.log("click2")
});

document.getElementById("bar3").addEventListener("click", function () {
    console.log("click3")
});

link = 'main2.html'

function hrefLink() {
    location.href = link;
}

function enter1() {
    document.querySelector(".mainText").style.color = "white";
    document.querySelector(".subText").style.color = "white";
}

function enter2() {
    document.querySelector(".mainText2").style.color = "white";
    document.querySelector(".subText2").style.color = "white";
}   

function leave1() {
    document.querySelector(".mainText").style.color = "black";
    document.querySelector(".subText").style.color = "black";
}

function leave2() {
    document.querySelector(".mainText2").style.color = "black";
    document.querySelector(".subText2").style.color = "black";
}   
