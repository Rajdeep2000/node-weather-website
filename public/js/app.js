const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        const { weather, temperature, feelslike, precip, icon, humidity } =
          data.forecast;
        messageTwo.innerHTML = `<img src="${icon}" alt="" id="icon"> ${weather}.
          <br>Current Temperature is ${temperature} degree Celcius. But it feels like ${feelslike} degree Celcius.
          <br> Chance of precipitation is ${precip}%
          <br> Humidity ${humidity}%
          `;
      }
    });
});
