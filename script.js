const peopleInSpaceApi = 'http://api.open-notify.org/astros.json';
const ISSLocationApi = 'http://api.open-notify.org/iss-now.json';

var pLatitude = 0, pLongitude = 0;


async function peopleInSpace () {

    document.getElementById("result").innerHTML = "";

    try {
       console.log ("entrei na funcao");

       const response = await fetch (peopleInSpaceApi);
       const apiReturn = await response.json();

       console.log("passei pela api");

       document.getElementById("result").innerHTML =  "<br><br> There are currently " + apiReturn.number + "  astronauts in space right now. They are:<br>";
        
       for (i=0; i < apiReturn["people"].length; i++) {
          document.getElementById("result").innerHTML += "<br>" + apiReturn["people"][i].name;
       }
       console.log (apiReturn.number);
    }
    catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "<br><br>It wasn't possible to fetch the results. Try again later."

    }
}

async function ISSLocation () {

    document.getElementById("result").innerHTML = "";

    try {
       const response = await fetch (ISSLocationApi);
       const apiReturn = await response.json();
       document.getElementById("result").innerHTML = "<br><br>Latitude = " + apiReturn["iss_position"].latitude + " Longitude = " + apiReturn["iss_position"].longitude;
       
       pLatitude = apiReturn["iss_position"].latitude;
       pLongitude = apiReturn["iss_position"].longitude;
       console.log("ISSLocation ==> Latitude = " + pLatitude + " Longitude = " + pLongitude);
      
       callGoogleApi();
    }     
    catch (error) {
       console.log(error);
       document.getElementById("result").innerHTML = "<br><br>It wasn't possible to fetch the results. Try again later."
    }

async function callGoogleApi() {

    try {

       let mapsGoogleApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrUoQNgn0CYbObkxobPVOyYP7PmVeDekk&callback=initMap&v=weekly";
       let options = { mode:'no-cors'};

console.log("CallGoogleApi ==> Latitude = " + pLatitude + " Longitude = " + pLongitude);

       const response = await fetch (mapsGoogleApi, options);

       window.initMap = initMap();
        
    } catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "<br><br>It wasn't possible to fetch the results. Try again later."

    }
    
}

function initMap() {

    console.log("initMap ==>  Latitude = "+ pLatitude + " Longitude = " + pLongitude);
    var options = {
        zoom: 15,
        center: { lat: pLatitude, lng: pLongitude },
      };
      var map = new google.maps.Map(document.getElementById('map'), options);
      var marker = new google.maps.Marker({
        position: { lat: pLatitude, lng: pLongitude },
        map: map,
      });
    }


}

