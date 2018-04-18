
function initMap() {
  var listLatLng = [
    {
      name: "Address 2",
      lat: 21.027764,
      lng: 105.834160
    },
    {
      name: "Address 3",
      lat: 16.2046956925200057,
      lng: 105.68964629980474
    },
    {
      name: "Address 4",
      lat: 15.274160423247254,
      lng: 109.29316192480474
    },
    {
      name: "Address 5",
      lat: 10.218210241079948,
      lng: 112.80878692480474
    },
    {
      name: "Address 6",
      lat: 6.741576413458112,
      lng: 109.55683379980474
    },
    {
      name: "Address 7",
      lat: 8.9182208255691,
      lng: 94.17597442480474
    },
    {
      name: "Address 8",
      lat: 17.634118601618376,
      lng: 90.22089629980474
    },
  ];
  var start = {
    name: "Address 1",
    lat: 10.823099,
    lng: 106.629664
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: start
  });
  var marker = new google.maps.Marker({
    position: start,
    map: map,
    icon: {
      url: "./images/marker-active.png",
      scaledSize: new google.maps.Size(50, 50), // scaled size
    }
  });

  var markerIconActive = {
    url: "./images/marker-inactive.png",
    scaledSize: new google.maps.Size(50, 50), // scaled size
  };

  var markerIconInactive = {
    url: "./images/marker-inactive.png",
    scaledSize: new google.maps.Size(50, 50), // scaled size
  };

  var arrAddressMarker = [];

  // Hiển thị danh sách địa chỉ và thêm marker, sự kiện marker
  listLatLng.map(function (item, idx) {
    var addressMarker = new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map: map,
      icon: markerIconInactive
    });

    arrAddressMarker.push(addressMarker);

    $('.wrap-list-address ul').append("<li>" + item.name + "</li>")
    var idxString = (idx+2).toString();
    var markerLi = ".wrap-list-address ul li:nth-child(" + idxString + ")";
    $(markerLi).click(function () {
      map.setZoom(7);
      map.setCenter({
        lat: item.lat,
        lng: item.lng
      });

      marker.setIcon({
        url: "./images/marker-inactive.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
      })

      arrAddressMarker.map(function (addressItem, addressIdx) {
        addressItem.setIcon({
          url: "./images/marker-inactive.png",
          scaledSize: new google.maps.Size(50, 50), // scaled size
        })
      })

      addressMarker.setIcon({
        url: "./images/marker-active.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
      });

      window.setTimeout(function () {
        map.setZoom(10);
      }, 2000)
    })

    addressMarker.addListener('click', function () {
      map.setZoom(7);
      map.setCenter({
        lat: item.lat,
        lng: item.lng
      });

      marker.setIcon({
        url: "./images/marker-inactive.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
      })

      arrAddressMarker.map(function (addressItem, addressIdx) {
        addressItem.setIcon({
          url: "./images/marker-inactive.png",
          scaledSize: new google.maps.Size(50, 50), // scaled size
        })
      })

      addressMarker.setIcon({
        url: "./images/marker-active.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
      });

      window.setTimeout(function () {
        map.setZoom(10);
      }, 2000)

    })
  })

  marker.addListener('click', function () {
    map.setZoom(7);
    map.setCenter(start);

    arrAddressMarker.map(function (addressItem, addressIdx) {
      addressItem.setIcon({
        url: "./images/marker-inactive.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
      })
    })

    marker.setIcon({
      url: "./images/marker-active.png",
      scaledSize: new google.maps.Size(50, 50), // scaled size
    });

    window.setTimeout(function () {
      map.setZoom(10);
    }, 2000)
  })

  $('#markerStart').click(function () {
    map.setZoom(7);
    map.setCenter(start);

    arrAddressMarker.map(function (addressItem, addressIdx) {
      addressItem.setIcon({
        url: "./images/marker-inactive.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
      })
    })

    marker.setIcon({
      url: "./images/marker-active.png",
      scaledSize: new google.maps.Size(50, 50), // scaled size
    });
    window.setTimeout(function () {
      map.setZoom(10);
    }, 2000)
  })



  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function (event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    $('#listLatLng').append("<li>" + lat + " - " + lng + "</li>")
  });
}
