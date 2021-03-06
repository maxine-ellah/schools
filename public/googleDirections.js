var schoolLat = document.getElementById("lat").innerHTML
var schoolLng = document.getElementById("lng").innerHTML


function getGeolocation(callback){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLat = position.coords.latitude
      var currentLong = position.coords.longitude
      console.log(currentLat, "latitude", currentLong, "currentLong")
      callback(currentLat, currentLong)
    });

  }
}

function initMap() {
  getGeolocation(function(currentLat, currentLong){
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: currentLat, lng: currentLong}
    });
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay, currentLat, currentLong);
  })


}

function calculateAndDisplayRoute(directionsService, directionsDisplay, currentLat, currentLong) {
  var selectedMode = "DRIVING";
  directionsService.route({
    origin: {lat: currentLat, lng: currentLong},
    destination: {lat: Number(schoolLat), lng: Number(schoolLng)},

    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
