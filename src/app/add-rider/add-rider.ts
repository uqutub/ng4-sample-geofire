import { Component } from '@angular/core';
import { FirebaseService } from '../service/firebase';

@Component({
    selector: 'app-add-rider-component',
    templateUrl: './add-rider.html',
    styleUrls: ['./add-rider.css']
})
export class AddRiderComponent {
    model = {
        name: null,
        lat: null,
        lng: null,
        location: null
    };

    constructor(private fbService: FirebaseService) {

    }

    addRider(e) {
        e.preventDefault();
        this.model.location = [this.model.lat, this.model.lng];
        console.log(this.model);
        this.fbService.addRider({ ...this.model });
        this.clearModel();
    }

    clearModel() {
        this.model = {
            name: null,
            lat: null,
            lng: null,
            location: null
        };
    }
}
