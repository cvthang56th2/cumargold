
function initMap() {
  var listLatLng = [];
  var uluru = { lat: -25.363, lng: 131.044 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });



  $('#btn1').click(function () {
    var latln = { lat: 21.027764, lng: 105.834160 };
    var marker1 = new google.maps.Marker({
      position: latln,
      map: map
    });
    map.setCenter(new google.maps.LatLng(21.027764, 105.834160))
  });


  $('#btn2').click(function () {
    var latln = { lat: 10.823099, lng: 106.629664 };
    var marker1 = new google.maps.Marker({
      position: latln,
      map: map
    });
    map.setCenter(new google.maps.LatLng(10.823099, 106.629664))
  });


  infowindow = new google.maps.InfoWindow({
    content: document.getElementById('form')
  });

  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function (event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    $('#listLatLng').append("<li>" + lat + " - " + lng+ "</li>")
  });
}
