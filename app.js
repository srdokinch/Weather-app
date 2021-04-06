window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.degree-section');
  let temperatureSpan = document.querySelector('.degree-section span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition (position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // apiで返ってくる中の
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          //set dom elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
            //forumula for celsisus
            let celsius = (temperature - 32) * (5 / 9);
            //set icon
            setIcon(icon, document.querySelector('.icon'));

            //change temp to F from document.classList.add('class');\
            temperatureSection.addEventListener('click', () =>  {
              if(temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
            });
        });
    },
    (error => {
      swal({
        title : "位置情報を許可してください",
        text : "位置情報を許可しないとこのアプリは使用できません",
        icon : "warning",
      });
    })
   );
  }
  function setIcon(icon,iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
