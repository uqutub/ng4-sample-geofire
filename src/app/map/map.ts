import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase';

@Component({
  selector: 'app-map-component',
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent implements OnInit {
  title = 'Map Component';
  center = {
    lat: 24.9359666,
    lng: 67.0404276
  };

  ridersLocation;

  constructor(private fbService: FirebaseService) {
  }

  ngOnInit() {
    this.fbService.getNearByRiderLocation([this.center.lat, this.center.lng], 10.5);
    this.ridersLocation = this.fbService.locationArray;
  }

}
