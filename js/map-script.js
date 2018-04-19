function initMap() {
  $.getJSON("http://localhost/cumargold/js/latlng.json", function (data) {
    var listLatLng = [];
    data.map(function (e) {
      listLatLng.push(e);
    })


    var start = {
      name: "Address 1",
      lat: 10.823099,
      lng: 106.629664
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: start
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
    var arrInfoWindow = [];

    // Hiển thị danh sách địa chỉ và thêm marker, sự kiện marker
    listLatLng.map(function (item, idx) {
      var addressMarker = new google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map: map,
        icon: markerIconInactive
      });

      if (idx == 0) {
        addressMarker.setIcon({
          url: "./images/marker-active.png",
          scaledSize: new google.maps.Size(50, 50),
        });
      }

      arrAddressMarker.push(addressMarker);

      $('.wrap-list-address ul').append("<li>" + item.name + "</li>")
      var idxString = (idx + 1).toString();
      var markerLi = ".wrap-list-address ul li:nth-child(" + idxString + ")";

      // Sự kiện trong danh sách li
      $(markerLi).click(function () {
        map.setZoom(7);
        map.setCenter({
          lat: item.lat,
          lng: item.lng
        });

        var infoContent = '<div class="infoWindowContent">' + '<h4>' + item.name + '</h4>' + '<p>Địa chỉ: ' + item.address + '</p>' + '<p>Phone: ' + item.phone + '</p>' + '</div>'

        infoWindow = new google.maps.InfoWindow({
          content: infoContent
        });

        arrInfoWindow.push(infoWindow);

        arrAddressMarker.map(function (addressItem, addressIdx) {
          addressItem.setIcon({
            url: "./images/marker-inactive.png",
            scaledSize: new google.maps.Size(50, 50),
          })
        })

        addressMarker.setIcon({
          url: "./images/marker-active.png",
          scaledSize: new google.maps.Size(50, 50),
        });

        arrInfoWindow.map(function (infoWindowItem, infoIdx) {
          infoWindowItem.close();
        })

        infoWindow.open(map, addressMarker);

        window.setTimeout(function () {
          map.setZoom(10);
        }, 2000)
      })

      // Sự kiện nhấn marker
      addressMarker.addListener('click', function () {
        map.setZoom(7);
        map.setCenter({
          lat: item.lat,
          lng: item.lng
        });

        var infoContent = '<div class="infoWindowContent">' + '<h4>' + item.name + '</h4>' + '<p>Địa chỉ: ' + item.address + '</p>' + '<p>Phone: ' + item.phone + '</p>' + '</div>'

        infoWindow = new google.maps.InfoWindow({
          content: infoContent
        });

        arrInfoWindow.push(infoWindow);

        arrAddressMarker.map(function (addressItem, addressIdx) {
          addressItem.setIcon({
            url: "./images/marker-inactive.png",
            scaledSize: new google.maps.Size(50, 50),
          })
        })

        addressMarker.setIcon({
          url: "./images/marker-active.png",
          scaledSize: new google.maps.Size(50, 50),
        });

        arrInfoWindow.map(function (infoWindowItem, infoIdx) {
          infoWindowItem.close();
        })

        infoWindow.open(map, addressMarker);

        window.setTimeout(function () {
          map.setZoom(10);
        }, 2000)

      })
    })


    // Sự kiện click vào map
    google.maps.event.addListener(map, 'click', function (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      $('#listLatLng').append("<li>" + lat + " - " + lng + "</li>")
    });
  });


}
