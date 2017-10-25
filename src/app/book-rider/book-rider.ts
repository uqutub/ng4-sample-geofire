import { Component } from '@angular/core';
import { FirebaseService } from '../service/firebase';

@Component({
    selector: 'app-book-rider-component',
    templateUrl: './book-rider.html',
    styleUrls: ['./book-rider.css']
})
export class BookRiderComponent {
    bookedRiders = [
        { uid: '-KxDt-GaFzjocYN46-P1', location: [24.9348324, 67.0399438], name: 'Rider1', status: false },
        { uid: '-KxDtGzgBknp3AQcJdLJ', location: [24.937623, 67.0384059], name: 'Rider2', status: false },
        { uid: '-KxDtWKA9E-QTjNWkmlM', location: [24.9360977, 67.0389612], name: 'Rider3', status: false },
        { uid: '-KxDwpRywuZahSqYV6BS', location: [24.9359666, 67.0404276], name: 'Rider4', status: false },
    ];

    constructor(private fbService: FirebaseService) {

    }

    bookRider(rider: number, e) {
        e.preventDefault();
        this.bookedRiders[rider].status = !this.bookedRiders[rider].status;
        if (this.bookedRiders[rider].status) {
            this.fbService.removeLocation(this.bookedRiders[rider].uid);
        } else {
            this.fbService.setLocation(this.bookedRiders[rider].uid, this.bookedRiders[rider].location);
        }

    }

}
