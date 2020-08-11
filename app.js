window.addEventListener('load',()=>{
   let long;
   let lat;
   let temperatureDescription = document.querySelector(".temperature-description");
   let temperatureDegree = document.querySelector(".temperature-degree");
   let locationTimezone = document.querySelector(".location-timezone");
   let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
          long=position.coords.longitude;
          lat=position.coords.latitude;
        // console.log(position); 
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api =`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
         // fetching with our own custom long,lat
         fetch(api)
        .then(response=>{
            return response.json();
        }) 
        .then(data=> {
           //console.log(data);
           const {temperature, summary,icon} = data.currently;
           //Set DOM elements from the api
           temperatureDegree.textContent=temperature;
           temperatureDescription.textContent = summary;
           locationTimezone.textContent = data.timezone;
           //formula for celcius
           let celcius = (temperature-32)*(5/9);
           //Set icon
           setIcons(icon,document.querySelector('.icon')) ;

           //Change temp to celcius/farenheit
           
           //   changing to cels
            temperatureSection.addEventListener('click',()=>{
                if(temperatureSpan.textContent==='F'){
                    temperatureSpan.textContent='C';
                    temperatureDegree.textContent= Math.floor(celcius); //rounding off
                }
                else{
                    temperatureSpan.textContent='F';
                    temperatureDegree.textContent = temperature;

                }
            });
        
                  

            });
    });
   }
   else{
       h1.text="location error!!";
   }
   function setIcons(icon, iconId){
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play(); //animation 
    return skycons.set(iconId, Skycons[currentIcon]);
   }
});