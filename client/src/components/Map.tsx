import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useMainContext } from './Context';
import { defaultLocation } from '../services/mapApiService';
import { Location } from '../types';
// const mapsApiKey = import.meta.env.VITE_MAPS_API_KEY;
const myMapsApiKey = "AIzaSyBJy83b3lUe0y-rtCtkPZfd7FQxwUEKNu0";

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultCenter = defaultLocation;
type propsType = {
  mapAsInput: boolean,
  onLocationSelect?: (location:Location) => void,
  zoom: number
}
function Map({mapAsInput, onLocationSelect, zoom}: propsType) {
  const { location, list } = useMainContext();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: myMapsApiKey // 
  });

  const [marker, setMarker] = useState<Location>({lat:0, lng:0});
  const [mapCenter, setMapCenter] = useState<Location>(defaultCenter);


  // set the map center to the current location
  useEffect(() => setMapCenter(location),[location]);

  /*

lat
: 
52.507389
lng
: 
13.378096
*/
  // choose a location by clicking on the map
  const onMapClick = mapAsInput ? (e: google.maps.MapMouseEvent) => {
    if(!e.latLng ) return 
    const lat:number = e.latLng.lat(); //  || 52.507389;
    const lng:number = e.latLng.lng(); //  || 13.378096
    setMarker({ lat, lng });
    onLocationSelect && onLocationSelect({ lat, lng });
  } : null;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={zoom}
      onClick={(e) => {
        if (mapAsInput && onMapClick !== null) {
          onMapClick(e);
        }
      }}
    >
      {/* if we use the map as an input form */}
      {mapAsInput && marker && (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
      )}
      {/* if we use the map to render items */}
      {!mapAsInput && list && list.map(elem => (
        <Marker key={elem._id} position={{ lat: elem.location.lng || 52.507389, lng: elem.location.lat || 13.378096}} /> // Added the || number
      ))}
    </GoogleMap>
  ) : <></>;
/*

lat
: 
52.507389
lng
: 
13.378096
*/
}

export default Map;