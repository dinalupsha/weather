const details = document.querySelectorAll('.details__value');

var currentTime = new Date().getHours();

var cities = [];

for(let i = 0; i < document.querySelectorAll('option').length; i++) {
  cities.push(document.querySelectorAll('option')[i].value);
}
 
function timeCheck(iconInfo) {
  const src = iconInfo.getAttribute('src');
    if ( src.indexOf('d') === -1 ) {
      document.documentElement.style.setProperty('--theme-color-1', '20, 0, 98, 1');
      document.documentElement.style.setProperty('--theme-color-2', '78, 0, 205, 1');
    }
    else {
      document.documentElement.style.setProperty('--theme-color-1', '125, 177, 255, 1');
      document.documentElement.style.setProperty('--theme-color-2', '100, 62, 251, 1');
    }
}

let flag = false;

if ( !flag ) {
  fetching("Chisinau");
  flag = true;
}
  
var tmpCity = "Chisinau";
for (const elem of document.getElementsByName('city-input')) {
  elem.addEventListener('input', e => {      
    console.log(tmpCity);
    if (!cities.includes(e.target.value)) {
      fetching(tmpCity)
    } else { 
      fetching(e.target.value);
      tmpCity = e.target.value;
    }
    }
  )
}

function fetching (city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb6f0d6aa1006b2e48a57d57bf9abd2c`)
    .then(function (resp) { return resp.json() })
    .then(function (data) { console.log(data)
  document.querySelector('.current__city') .textContent = data.name;
  document.querySelector('.current__temperature') .innerHTML = Math.round(data.main.temp - 273) + '&deg;';
  document.querySelector('.forecast__temperature') .innerHTML = Math.round(data.main.temp - 273) + '&deg;';
  document.querySelector('.current__description') .textContent = data.weather[0] ['description'];
  document.querySelector('.forecast__icon') .innerHTML = `<img src="img/${data.weather[0]['icon']}.svg">`;
  document.querySelector('.current__icon') .innerHTML = `<img id="icon-check" src="img/${data.weather[0]['icon']}.svg">`;

  const iconCheck = document.getElementById('icon-check');
  timeCheck(iconCheck);
  details[2].innerHTML = `${data.main.humidity}%`;
  details[1].innerHTML = `${data.main.pressure} hPa`;
  details[0].innerHTML = `${Math.round(data.main.feels_like - 273)} &deg`;
  details[3].innerHTML = `${data.wind.speed} m/s.`;
  })
    .catch(function () {
  })
  }