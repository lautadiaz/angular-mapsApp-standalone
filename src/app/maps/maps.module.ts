import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoibGF1dGEwMTAxMDEiLCJhIjoiY2xqeXh5Mms3MDhkajNmcjNtMzNhaHAzeiJ9.gbtTS7npE5fMzg-zQYt1aQ';

import { MapsRoutingModule } from './maps-routing.module';
import { MinMapComponent } from './components/min-map/min-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullSceenPageComponent } from './pages/full-sceen-page/full-sceen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
// Alone
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';


@NgModule({
  declarations: [
    FullSceenPageComponent,
    MapsLayoutComponent,
    MarkersPageComponent,
    MinMapComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [
    CommonModule,
    CounterAloneComponent,
    MapsRoutingModule,
    SideMenuComponent,
  ],
})
export class MapsModule { }
