"use strict";

let arr = [];
let renderHtml = function (data) {
  let html = `<div class="box" data-id="${data.idMeal}">
  <div class="meal--img">
  <img src="${data.strMealThumb}">
  </div>
  <div class="meal--name">${data.strMeal}</div>
  
    <button class="recipe--button">Get Recipe</button>
</div>`;
  document.querySelector(".flex").insertAdjacentHTML("beforeend", html);
};

let renderModal = function () {};

let getAPI = function (meal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      if (res.meals == null) {
        alert("Bunday taom bizning ruyhatda mavjud emas");
      } else {
        let data = res.meals;
        data.forEach((element) => {
          element.inputValue = meal;
          arr.push(element);

          renderHtml(element);
          document.querySelector(".rezultbegin").style.display = "none  ";
          // console.log(element);
        });
        document.querySelector(".flex").addEventListener("click", function (e) {
          let k = window.pageYOffset;
          let element = e.target.closest(".recipe--button");
          if (!element) return;
          let elementId = element.parentElement.getAttribute("data-id");
          let obj = arr.find(function (val) {
            return val.idMeal == elementId;
          });
          document.querySelector(".general").style.top = `${k}px`;
          document.querySelector(".general").style.display = "block";
          document.querySelector(".general").style.transform = "scale(1)";
          document.querySelector(".meal__name").textContent = obj.strMeal;
          document.querySelector(".inputVal").textContent =
            obj.inputValue[0].toUpperCase() + obj.inputValue.slice(1);
          document.querySelector(".lorem").textContent = obj.strInstructions;
          document.querySelector(".imgcha").src = `${obj.strMealThumb}`;
          document.querySelector(".youtube").href = `${obj.strYoutube}`;
          if (document.querySelector(".general").style.top == `${k}px`) {
          }
          // document.querySelector(".general").style.position = "absolute";
          // console.log(document.querySelector(".general").style.position);
        });

        // document.querySelector(".general").style.position = "fixed";
        // console.log(document.querySelector(".general").style.position);
        document
          .querySelector(".fordelete__icon")
          .addEventListener("click", function () {
            document.querySelector(".general").style.display = "none";
            document.querySelector(".general").style.position = "absolute";
            document.querySelector(".general").style.transform = "scale(0.3)";
          });
      }
    });
};
document.querySelector(".search").addEventListener("click", function (e) {
  e.preventDefault();
  getAPI(document.querySelector(".input").value);
  document.querySelector(".input").value = "";
});
