
function initMap() {
  var listLatLng = [
    {
      lat: 10.823099,
      lng: 106.629664
    },
    {
      lat: 21.027764,
      lng: 105.834160
    },
    {
      lat: 16.204695692550057,
      lng: 105.68964629980474
    },
    {
      lat: 15.274160423247254,
      lng: 109.29316192480474
    },
    {
      lat: 10.218210241079948,
      lng: 112.80878692480474
    },
    {
      lat: 6.741576413458112,
      lng: 109.55683379980474
    },
    {
      lat: 8.9182208255691,
      lng: 94.17597442480474
    },
    {
      lat: 17.634118601618376,
      lng: 90.22089629980474
    },
  ];
  var start = listLatLng[0];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: start
  });
  var marker = new google.maps.Marker({
    position: start,
    map: map
  });

  listLatLng.map(function(item) {
    new google.maps.Marker({
      position: item,
      map: map
    })
  })

  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function (event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    $('#listLatLng').append("<li>" + lat + " - " + lng+ "</li>")
  });
}
