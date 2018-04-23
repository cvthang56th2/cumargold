function initMap() {
  $.getJSON("http://localhost/cumargold/js/dsNhaThuoc.json", function (data) {
    var listLatLng = [];
    data.map(function (e) {
      listLatLng.push(e);
    })
    var shortestMarker;
    var shortestInfoWindow;
    var showRouteService;
    var infoWindowCurrentLocation;

    listLatLng.map(function (e) {
      e.lat = parseFloat(e.lat);
      e.lng = parseFloat(e.lng);
    })

    var start = {
      lat: listLatLng[0].lat,
      lng: listLatLng[0].lng
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: start
    });

    var markerIconActive = {
      url: "./images/marker-active.png",
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

        var liIdx = idx + 1;

        var liDiv = '<div>'
        + '<h5><span>'+ liIdx +'. </span>'+item.TenNhaThuoc + '</h5>'
        + '<p>' + item.DiaChi + '</p>'
        '</di>'

        $('.wrap-list-address ul').append('<li>' + liDiv +'</li>')
        var idxString = (idx + 1).toString();
        var markerLi = ".wrap-list-address ul li:nth-child(" + idxString + ")";

        // Sự kiện trong danh sách li
        $(markerLi).click(function () {
          $('.wrap-list-address ul li').removeClass('active');
          $(markerLi).addClass('active');
          arrAddressMarker.map(function (e) {
            e.setMap(map);
          })
          if (typeof shortestMarker != 'undefined') {
            shortestMarker.setMap(null);
          }

          if (typeof shortestInfoWindow != 'undefined') {
            shortestInfoWindow.close();
          }

          if (typeof showRouteService != 'undefined') {
            showRouteService.setMap(null);
          }

          if (typeof infoWindowCurrentLocation != 'undefined') {
            infoWindowCurrentLocation.close();
          }

          map.setZoom(14);
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

          addressMarker.setAnimation(google.maps.Animation.DROP);

          addressMarker.setZIndex(9999);

          arrInfoWindow.map(function (infoWindowItem, infoIdx) {
            infoWindowItem.close();
          })

          infoWindow.open(map, addressMarker);

          
        })

        // Sự kiện nhấn marker
        addressMarker.addListener('click', function () {
          if (typeof shortestMarker != 'undefined') {
            shortestMarker.setMap(null);
          }

          if (typeof shortestInfoWindow != 'undefined') {
            shortestInfoWindow.close();
          }

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

    function displayRoute(routeService, showRouteService) {
      infoWindowCurrentLocation = new google.maps.InfoWindow;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindowCurrentLocation.setPosition(pos);
          infoWindowCurrentLocation.setContent('Vị trí hiện tại của bạn');
          infoWindowCurrentLocation.open(map);
          var myLat = parseFloat(pos.lat);
          var myLng = parseFloat(pos.lng);
          var routeResults = [];

          findNearestPlace();


          function findNearestPlace() {
            var i = listLatLng.length;
            size = listLatLng.length;
            routeResults = [];
            while (i--) {
              calcRoute({
                "lat": parseFloat(listLatLng[i].lat),
                "lng": parseFloat(listLatLng[i].lng)
              }, storeResult);
            }
          }

          function calcRoute(end, callback) {
            var request = {
              origin: pos,
              destination: end,
              travelMode: google.maps.TravelMode.DRIVING
            };
            routeService.route(request, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                callback(response);
              } else {
                size--;
              }
            });
          }

          function storeResult(data) {
            routeResults.push(data);
            if (routeResults.length === size) {
              findShortest();
            }
          }

          function findShortest() {
            var i = routeResults.length;
            var shortestIndex = 0;
            var shortestLength = routeResults[0].routes[0].legs[0].distance.value;

            while (i--) {
              if (routeResults[i].routes[0].legs[0].distance.value < shortestLength) {
                shortestIndex = i;
                shortestLength = routeResults[i].routes[0].legs[0].distance.value;
              }
            }
            showRouteService.setDirections(routeResults[shortestIndex]);
            arrAddressMarker.map(function (e) {
              e.setMap(null);
            })
            console.log(routeResults[shortestIndex]);
          }
        }, function () {
          handleLocationError(true, infoWindow1, map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow1, map.getCenter());
      }

    }


    $('#btn-direction').click(function () {
      var routeService = new google.maps.DirectionsService;
      showRouteService = new google.maps.DirectionsRenderer;
      showRouteService.setMap(map);
      var getRoute = function () {
        displayRoute(routeService, showRouteService);
      };
      getRoute();

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
      arrAddressMarker = [];
      arrInfoWindow = [];
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
      if (typeof shortestMarker != 'undefined') {
        shortestMarker.setMap(null);
      }

      if (typeof shortestInfoWindow != 'undefined') {
        shortestInfoWindow.close();
      }

      if (typeof showRouteService != 'undefined') {
        showRouteService.setMap(null);
      }

      if (typeof infoWindowCurrentLocation != 'undefined') {
        infoWindowCurrentLocation.close();
      }
      showMarker(listFiltered);
    })

  });


}
