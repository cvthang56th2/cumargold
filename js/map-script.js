function initMap() {
  $.getJSON("http://localhost/cumargold/js/dsNhaThuoc.json", function (data) {
    var listLatLng = [];
    data.map(function (e) {
      listLatLng.push(e);
    })

    listLatLng.map(function (e) {
      e.lat = parseFloat(e.lat);
      e.lng = parseFloat(e.lng);
    })

    var start = {
      lat: listLatLng[0].lat,
      lng: listLatLng[0].lng
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

    function showMarker(listLatLng) {
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

        $('.wrap-list-address ul').append("<li>" + item.TenNhaThuoc + "</li>")
        var idxString = (idx + 1).toString();
        var markerLi = ".wrap-list-address ul li:nth-child(" + idxString + ")";

        // Sự kiện trong danh sách li
        $(markerLi).click(function () {
          map.setZoom(7);
          map.setCenter({
            lat: item.lat,
            lng: item.lng
          });

          var infoContent = '<div class="infoWindowContent">' + '<h4>' + item.TenNhaThuoc + '</h4>' + '<p>Địa chỉ: ' + item.DiaChi + '</p>' + '<p>Phone: ' + item.DienThoai + '</p>' + '</div>'

          infoWindow = new google.maps.InfoWindow({
            content: infoContent
          });

          arrInfoWindow.push(infoWindow);

          arrAddressMarker.map(function (addressItem, addressIdx) {
            addressItem.setIcon({
              url: "./images/marker-inactive.png",
              scaledSize: new google.maps.Size(50, 50),
            })

            addressItem.setZIndex(1);
          })

          addressMarker.setIcon({
            url: "./images/marker-active.png",
            scaledSize: new google.maps.Size(50, 50),
          });

          addressMarker.setZIndex(9999);

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

          var infoContent = '<div class="infoWindowContent">' + '<h4>' + item.TenNhaThuoc + '</h4>' + '<p>Địa chỉ: ' + item.DiaChi + '</p>' + '<p>Phone: ' + item.DienThoai + '</p>' + '</div>'

          infoWindow = new google.maps.InfoWindow({
            content: infoContent
          });

          arrInfoWindow.push(infoWindow);

          arrAddressMarker.map(function (addressItem, addressIdx) {
            addressItem.setIcon({
              url: "./images/marker-inactive.png",
              scaledSize: new google.maps.Size(50, 50),
            })

            addressItem.setZIndex(1);
          })

          addressMarker.setIcon({
            url: "./images/marker-active.png",
            scaledSize: new google.maps.Size(50, 50),
          });

          addressMarker.setZIndex(9999);

          arrInfoWindow.map(function (infoWindowItem, infoIdx) {
            infoWindowItem.close();
          })

          infoWindow.open(map, addressMarker);

          window.setTimeout(function () {
            map.setZoom(10);
          }, 2000)

        })
      })
    }
    showMarker(listLatLng);


    // Sự kiện click vào map
    google.maps.event.addListener(map, 'click', function (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      $('#listLatLng').append("<li>" + lat + " - " + lng + "</li>")
    });

    $('#btn-location').click(function () {
      var infoWindow1 = new google.maps.InfoWindow;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow1.setPosition(pos);
          infoWindow1.setContent('Location found.');
          infoWindow1.open(map);
          $('.myLat').html(pos.lat);
          $('.myLng').html(pos.lng);
          map.setCenter(pos);
        }, function () {
          handleLocationError(true, infoWindow1, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow1, map.getCenter());
      }
    })

    var listFilterProvince = [];
    listLatLng.map(function (e, i) {
      listFilterProvince.push(e.TenTinh);
    })

    listFilterProvince = $.unique(listFilterProvince).sort();

    listFilterProvince.map(function (e, i) {
      $('#filter-province').append('<option value="' + e + '">' + e + '</option>')
    })

    $('#filter-province').change(function () {

      $('.wrap-list-address ul').empty();
      var selectedFilterValue = this.value;
      var listFiltered = [];
      arrAddressMarker.map(function (item, idx) {
        item.setMap(null);
      })
      arrInfoWindow.map(function (infoWindowItem, infoIdx) {
        infoWindowItem.close();
      })
      if (selectedFilterValue === "all") {
        listFiltered = listLatLng;
      } else {
        listLatLng.map(function (e, i) {
          if (e.TenTinh === selectedFilterValue) {
            listFiltered.push(e);
          }
        })
      }
      map.setCenter({
        lat: listFiltered[0].lat,
        lng: listFiltered[0].lng
      });

      showMarker(listFiltered);
    })

  });


}
