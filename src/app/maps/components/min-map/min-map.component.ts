import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-min-map',
  templateUrl: './min-map.component.html',
  styleUrls: ['./min-map.component.css']
})
export class MinMapComponent {

  @Input() lngLat?: [ number, number ];
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map Div no encontrado"
    if( !this.lngLat ) throw "LngLat no puede ser null"

    // mapa
    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });
    //marker
    new Marker()
      .setLngLat( this.lngLat )
      .addTo( this.map )
  }
}
