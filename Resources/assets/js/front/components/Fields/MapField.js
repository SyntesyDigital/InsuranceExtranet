import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Map, Marker, TileLayer } from 'react-leaflet';

const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [41.3850639, 2.1734];
const zoomLevel = 12;

export default class MapField extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            center: {
              lat: mapCenter[0],
              lng: mapCenter[1]
            },
            markerPosition : {
              lat: mapCenter[0],
              lng: mapCenter[1]
            },
            zoom: zoomLevel,
            field : props.field ? JSON.parse(atob(props.field)) : ''
        };

        console.log("MapField :: field => ",this.state.field);

    }

    componentDidMount() {
      const leafletMap = this.leafletMap.leafletElement;
      const markerPosition = this.state.markerPosition;
      const field = this.state.field;

      if(field.value !== undefined && field.value != null){
        markerPosition.lat = field.value.lat;
        markerPosition.lng = field.value.lng;
      }

      this.setState({
        markerPosition : markerPosition,
        center : markerPosition
      });

      setTimeout(function(){
          leafletMap.invalidateSize();
      },1000);

    }

    render() {

        const position = [this.state.center.lat, this.state.center.lng];

        var customIcon = L.icon({
            iconUrl: ASSETS+'modules/architect/images/marker-icon.png',
            shadowUrl: ASSETS+'modules/architect/images/marker-shadow.png',

            iconSize:     [25, 41], // size of the icon
            shadowSize:   [41, 41], // size of the shadow
            iconAnchor:   [12, 40], // point of the icon which will correspond to marker's location
            shadowAnchor: [12, 40],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        return (
            <div className="map-container">
              <Map
                  center={position}
                  zoom={this.state.zoom}
                  ref={m => { this.leafletMap = m; }}
              >
                  <Marker
                    position={this.state.markerPosition}
                    icon={customIcon}
                    ref={m => { this.refmarker = m; }}
                  />
                  <TileLayer
                      attribution={stamenTonerAttr}
                      url={stamenTonerTiles}
                  />
              </Map>
            </div>
        );
    }
}


if (document.getElementById('map-field')) {
    var element = document.getElementById('map-field');
    var field = element.getAttribute('field');

    ReactDOM.render(<MapField
        field={field}
      />, element);
}
