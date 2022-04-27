const issAPI = 'http://api.open-notify.org/astros.json';

async function userAction () {
    try {
       console.log ("entrei na funcao");

       const response = await fetch (issAPI);
       const apiReturn = await response.json();

       console.log("passei pela api");

       document.getElementById("result").innerHTML =  "<br><br> There are " + apiReturn.number + "  astronauts on board the ISS now. They are:<br>";
        
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