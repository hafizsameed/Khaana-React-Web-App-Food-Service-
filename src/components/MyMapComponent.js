import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <div > 
        <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
        >
        <Marker 
        draggable={true} 
        position={{ lat: props.location.lat, lng: props.location.lng }} 
        onDragEnd={(loc) => {console.log('loc ===>', loc.latLng.lat(), loc.latLng.lng())
                            props.setlnglat(loc.latLng.lng(),loc.latLng.lat())
                        }}
        />
    </GoogleMap>
        </div>
))
export default MyMapComponent