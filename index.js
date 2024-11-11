function updateTime() {
  const newYorkElement = document.querySelector("#new-york");
  if (newYorkElement) {
    const newYorkDateElement = newYorkElement.querySelector(".date");
    const newYorkTimeElement = newYorkElement.querySelector(".time");
    const newYorkTime = moment().tz("America/New_York");

    newYorkDateElement.innerHTML = newYorkTime.format("MMMM Do YYYY");
    newYorkTimeElement.innerHTML = newYorkTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  const parisElement = document.querySelector("#paris");
  if (parisElement) {
    const parisDateElement = parisElement.querySelector(".date");
    const parisTimeElement = parisElement.querySelector(".time");
    const parisTime = moment().tz("Europe/Paris");

    parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  const tokyoElement = document.querySelector("#tokyo");
  if (tokyoElement) {
    const tokyoDateElement = tokyoElement.querySelector(".date");
    const tokyoTimeElement = tokyoElement.querySelector(".time");
    const tokyoTime = moment().tz("Asia/Tokyo");

    tokyoDateElement.innerHTML = tokyoTime.format("MMMM Do YYYY");
    tokyoTimeElement.innerHTML = tokyoTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

let selectedCityInterval;

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (selectedCityInterval) clearInterval(selectedCityInterval);

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }

  if (cityTimeZone) {
    const cityName =
      cityTimeZone.replace("_", " ").split("/")[1] || "Unknown City";
    const country =
      event.target.selectedOptions[0].getAttribute("data-country");
    document.getElementById("back-to-main").style.display = "block";

    function updateSelectedCityTime() {
      const cityTime = moment().tz(cityTimeZone);
      const citiesElement = document.querySelector("#cities");

      citiesElement.innerHTML = `
        <div class="city">
          <div>
            <h2>
              ${
                country
                  ? `<img src="https://flagcdn.com/24x18/${country}.png" alt="${cityName} flag" style="margin-right:8px;vertical-align:middle;">`
                  : ""
              }${cityName}
            </h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${cityTime.format(
            "h:mm:ss"
          )} <small>${cityTime.format("A")}</small></div>
        </div>
      `;
    }

    updateSelectedCityTime();
    selectedCityInterval = setInterval(updateSelectedCityTime, 1000);
  }
}

function resetToDefaultView() {
  if (selectedCityInterval) clearInterval(selectedCityInterval);
  document.querySelector("#cities").innerHTML = `
    <div class="city" id="new-york">
      <div>
        <h2>New York</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
    <div class="city" id="paris">
      <div>
        <h2>Paris</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
    <div class="city" id="tokyo">
      <div>
        <h2>Tokyo</h2>
        <div class="date"></div>
      </div>
      <div class="time"></div>
    </div>
  `;
  document.getElementById("back-to-main").style.display = "none";
  updateTime();
}

updateTime();
setInterval(updateTime, 1000);

document.querySelector("#city").addEventListener("change", updateCity);
document.getElementById("back-to-main").addEventListener("click", (e) => {
  e.preventDefault();
  resetToDefaultView();
});
