function initMap() {
    var myLatLng = {lat: 48.3652509, lng: 24.3981648};

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        minZoom: 14,
        maxZoom: 17
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "My Location"
    });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(48.3652509,24.3981648),
        new google.maps.LatLng(48.3652509, 24.4003535));

    var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          animation: google.maps.Animation.DROP
    });
    marker.addListener('mouseover', toggleBounce);
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
    
    function toggleBounce() {
       if (marker.getAnimation() !== null) {
         marker.setAnimation(null);
       } else {
         marker.setAnimation(google.maps.Animation.BOUNCE);
       }
     }
}
