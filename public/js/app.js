console.log("Client Side JS is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        const { weather, temperature, feelslike, precip } = data.forecast;
        messageTwo.innerHTML =
          weather +
          ".<br>Current Temperature is " +
          temperature +
          " degree Celcius. But it feels like " +
          feelslike +
          " degree Celcius.<br>Chance of precipitation is " +
          precip +
          "%";
      }
    });
});
