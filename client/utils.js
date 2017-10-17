export const markers = [];
export const places = [];

export function createMarkers(placesArr, mapCanvas, request) {
  deleteMarkers();
  let bounds = new google.maps.LatLngBounds();

  let i = 0, count=0;
  for (let place; place = placesArr[i]; i++) {
    if(google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, request.location) < request.radius) {
      count++;
      const image = {
        url: place.icon,
        anchor: new google.maps.Point(0, -29),
        scaledSize: new google.maps.Size(25, 25)
      };

      const marker = new google.maps.Marker({
        map: mapCanvas,
        icon: image,
        place: {
          placeId: place.place_id,
          location: place.geometry.location
        }
      });

      marker.setPosition(place.geometry.location);

      markers.push(marker);

      place.photos = place.photos
        ?
        place.photos[0].getUrl({maxHeight:90, maxWidth: 90})
        :
        "./assets/no-photo.jpg";

      place.distance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, request.location)/1609;

      places.push(place);
      bounds.extend(place.geometry.location);
    }
  }
  if(count > 0) {
    bounds.extend(request.location);
    mapCanvas.fitBounds(bounds);
  }
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers.splice(0, markers.length);
  places.splice(0, places.length);
}
