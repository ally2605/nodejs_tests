const peopleInSpaceApi = 'http://api.open-notify.org/astros.json';
const ISSLocationApi = 'http://api.open-notify.org/iss-now.json';

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
       console.log("Latitude = " + apiReturn["iss_position"].latitude + " Longitude = " + apiReturn["iss_position"].longitude);
       document.getElementById("result").innerHTML = "<br><br>Latitude = " + apiReturn["iss_position"].latitude + " Longitude = " + apiReturn["iss_position"].longitude;
       

       callGoogleApi(apiReturn["iss_position"].latitude, apiReturn["iss_position"].longitude);
    }     
    catch (error) {
       console.log(error);
       document.getElementById("result").innerHTML = "<br><br>It wasn't possible to fetch the results. Try again later."
    }

    function initMap(pLatitude, pLongitude) {
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

async function callGoogleApi(pLatitude, pLongitude) {

    try {

       let  mapsGoogleApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrUoQNgn0CYbObkxobPVOyYP7PmVeDekk&callback=initMap("
            + pLatitude +"," + pLongitude + ")" + "&v=weekly";

       const response = await fetch (mapsGoogleApi);
       const apiReturn = await response.json();

       window.initMap = initMap;
        
    } catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "<br><br>It wasn't possible to fetch the results. Try again later."

    }
    
}

