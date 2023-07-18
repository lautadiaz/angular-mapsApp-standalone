
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlainMarker {
  color: string,
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})

export class MarkersPageComponent implements AfterViewInit {


  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public lngLat : LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readToLocalStorege();
  //   const markerHtml = document.createElement('div');
  //   markerHtml.innerHTML = 'Lautaro';

  //   const marker = new Marker({
  //     color: 'red',
  //     element: markerHtml
  //   })
  //     .setLngLat(this.lngLat)
  //     .addTo(this.map)
  }

  createMarker() {
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color :string = 'red' ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo(this.map)

    this.markers.push( { color, marker });
    this.saveToLocalStorege();


    marker.on('dragend', () => {
      this.saveToLocalStorege();
    })

  }

  deleteMarker( index: number) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
    this.saveToLocalStorege()
  }

  fly( index: number ) {
    if ( !this.map ) return;

    const ubi = this.markers[index].marker.getLngLat();
    this.map.flyTo({ center: ubi, zoom: 15 });
  }

  saveToLocalStorege() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readToLocalStorege() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = (JSON.parse(plainMarkersString)); // peligroso

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat
      const coords = new LngLat( lng, lat )

      this.addMarker( coords, color );
    })
  }
}
