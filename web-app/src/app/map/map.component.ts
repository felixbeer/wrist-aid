import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  markers: any[] = [
    {
      role: 'P',
      capacity: 2,
      lngLat: [16.420664,48.207638]
    },
    {
      role: 'P',
      capacity: 3,
      lngLat: [16.421405, 48.207779]
    },
    {
      role: 'P',
      capacity: 1,
      lngLat: [16.421606,
        48.207069]
    },
    {
      role: 'P',
      capacity: 5,
      lngLat: [16.42173,
        48.207342]
    },
    {
      role: 'P',
      capacity: 1,
      lngLat: [16.421428,
        48.207757]
    },
    {
      role: 'P',
      capacity: 1,
      lngLat: [16.421334,
        48.206818]
    },
    {
      role: 'P',
      capacity: 2,
      lngLat: [16.420959,
        48.207743]
    },
    {
      role: 'P',
      capacity: 0,
      lngLat: [16.42168,
        48.207589]
    },
    {
      role: 'A',
      capacity: 0,
      lngLat: [16.421136,
        48.20674]
    },
    {
      role: 'A',
      capacity: 5,
      lngLat: [16.421714,
        48.207282]
    },
    {
      role: 'A',
      capacity: 1,
      lngLat: [16.420236,
        48.207007]
    },
    {
      role: 'A',
      capacity: 0,
      lngLat: [16.421571,
        48.207706]
    },
    {
      role: 'A',
      capacity: 2,
      lngLat: [16.420569,
        48.20761]
    },
    {
      role: 'A',
      capacity: 1,
      lngLat: [16.42168,
        48.207589]
    },
    {
      role: 'A',
      capacity: 0,
      lngLat: [16.421405,
        48.207779]
    },
    {
      role: 'A',
      capacity: 2,
      lngLat: [16.42017,
        48.207002]
    },
    {
      role: 'A',
      capacity: 3,
      lngLat: [16.421267,
        48.206828]
    }
    // Add more marker data as needed
  ];

  constructor(public changeRef:ChangeDetectorRef) { }

  ngOnInit() {
    // Set the Mapbox access token
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    const map = new mapboxgl.Map({
      container: 'map', // The HTML element ID where the map will be displayed
      style: 'mapbox://styles/grizzlybeer/clkoc4b1q00k201qpeczv5fvu', // The map style
      center: [16.421000, 48.207268], // Starting center coordinates (longitude, latitude)
      zoom: 17 // Starting zoom level
    });

    this.addMarkersToMap(map);
  }

  addMarkersToMap(map: mapboxgl.Map) {
 
    this.markers.forEach(markerData => {
      const el = document.createElement('div');
      //add text to marker
      el.innerHTML = markerData.role;

      if(markerData.capacity > 2){
        el.className = 'red-marker';
      }
      else{
        if(markerData.capacity > 0){
          el.className = 'yellow-marker';
        }
        else{
          el.className = 'green-marker';
        }
      }
    
      const marker = new mapboxgl.Marker(el)
      .setLngLat(markerData.lngLat)
      .setPopup(new mapboxgl.Popup().setHTML(`<h1>${markerData.role}</h1><p>Capacity: ${markerData.capacity}</p>`))
      .addTo(map);
    });
  }

  createCustomMarker(size: string): HTMLElement {
    const customMarker = document.createElement('div');
    customMarker.className = 'custom-marker';
    customMarker.style.width = size;
    customMarker.style.height = size;
    return customMarker;
  }

//mapbox://styles/grizzlybeer/clkodlmrc00k301qp1up8hyrc

  addPoints(map: mapboxgl.Map) {
    // Example points data - Replace this with your own data
    const pointsData = [
      {
        name: 'Paramedic 1',
        coordinates: [16.421000, 48.207268]
      },
      {
        name: 'Paramedic 2',
        coordinates: [16.421140, 48.207278]
      },
      {
        name: 'Paramedic 3',
        coordinates: [16.421640, 48.207578]
      },
      {
        name: 'Paramedic 4',
        coordinates: [16.421640, 48.207378]
      },
      {
        name: 'Paramedic 5',
        coordinates: [16.421140, 48.207078]
      },
      {
        name: 'Paramedic 6',
        coordinates: [16.420140, 48.207078]
      },
    ];

    pointsData.forEach(point => {
      const marker = new mapboxgl.Marker()
        .setLngLat(point.coordinates as [number, number])
        .setPopup(new mapboxgl.Popup().setText(point.name))
        .addTo(map);
    });
  }
}