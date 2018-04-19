function initMap() {
    var start = {
        name: "Address 1",
        lat: 10.823099,
        lng: 106.629664
    };
    var listLatLng = [];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: start
    });

    // Map View
    $.getJSON("http://localhost/cumargold/js/latlng.json", function (data) {
        data.map(function (e) {
            listLatLng.push(e);
        })
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

    // Thêm địa chỉ mới
    var map1 = new google.maps.Map(document.getElementById('map1'), {
        zoom: 10,
        center: start
    });

    var startAddMarker = new google.maps.Marker({
        position: start,
        map: map1,
        draggable: true,
    });

    $('#add-lat').val(start.lat);
    $('#add-lng').val(start.lng);

    google.maps.event.addListener(startAddMarker, 'dragend', function (e) {
        $('#add-lat').val(e.latLng.lat());
        $('#add-lng').val(e.latLng.lng());
    });

    // Hàm xử lý tìm địa điểm
    function findAddress(addService, setMap) {
        var myAddress = document.getElementById('address').value;
        addService.geocode({ 'address': myAddress },
            function (results, status) {
                if (status === 'OK') { // Tìm thấy địa điểm
                    myResult = results[0].geometry.location;
                    setMap.setCenter(myResult);
                    startAddMarker.setPosition(myResult);
                    $('#add-lat').val(myResult.lat);
                    $('#add-lng').val(myResult.lng);
                } else {
                    alert('Không tìm thấy vì ' + status);
                }
            }
        );
    }

    // nút tìm kiếm địa chỉ
    var addressService = new google.maps.Geocoder();
    document.getElementById('submit').onclick = function () {
        findAddress(addressService, map1);
    }

    $('#btn-save').click(function () {
        var addName = $('#add-name').val();
        var addAddress = $('#add-address').val();
        var addPhone = $('#add-phone').val();
        var addLat = $('#add-lat').val();
        var addLng = $('#add-lng').val();

        listLatLng.push({
            "name": addName,
            "lat": parseFloat(addLat),
            "lng": parseFloat(addLng),
            "address": addAddress,
            "phone": addPhone
        })

        $.ajax({
            method: "GET",
            url: "./js/save.php",
            data: {
                data: listLatLng
            },
            success: function(msg) {
                alert(msg)
            }
        })
        console.log(listLatLng);
    })

}

$(document).ready(function () {
    // $('.wrap-add-marker').hide();
    $('.wrap-view-map').hide();

    $('#btn-view-map').click(function () {
        $('.wrap-add-marker').hide();
        $('.wrap-view-map').show();
    })


    $('#btn-add-marker').click(function () {
        $('.wrap-add-marker').show();
        $('.wrap-view-map').hide();
    })


})
