import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as GeoFire from 'geofire/dist/geofire';

@Injectable()
export class FirebaseService {

    firebaseRef = firebase.database().ref();
    riderLocation = this.firebaseRef.child('rider-location');
    geoFire = new GeoFire(this.riderLocation);
    ref = this.geoFire.ref();
    geoQuery: any;

    private onReadyRegistration: any;
    private onKeyEnteredRegistration: any;
    private onKeyExitedRegistration: any;
    private onKeyMovedRegistration: any;

    locationArray = [];

    constructor() {
        console.log('Firebase Service Running');
    }

    addRider(model) {
        const ref = this.firebaseRef.child('riders').push(model);
        this.setLocation(ref.key, model.location);
    }

    setLocation(uid: string, location: number[]) {
        this.geoFire.set(uid, location).then(() => {
            console.log('Provided key has been added to GeoFire');
        }, (error) => {
            console.log('Error: ' + error);
        });
    }

    removeLocation(uid: string) {
        this.geoFire.remove(uid).then(() => {
            console.log('Provided key has been removed from GeoFire');
        }, (error) => {
            console.log('Error: ' + error);
        });
    }

    getNearByRiderLocation(center: number[], radius: number = 10.5) {
        this.geoQuery = this.geoFire.query({
            center,
            radius
        });

        this.addRiderLocationListners();
    }

    updateNearByRiderLocation(center: number[], radius: number = 10.5) {
        this.geoQuery.updateCriteria({
            center,
            radius
        });
    }

    addRiderLocationListners() {
        this.onReadyRegistration = this.geoQuery.on('ready', () => {
            console.log('GeoQuery has loaded and fired all other events for initial data');
        });

        this.onKeyEnteredRegistration = this.geoQuery.on('key_entered', (key, location, distance) => {
            console.log(key + ' entered query at ' + location + ' (' + distance + ' km from center)');
            this.locationArray.push({ uid: key, location });
        });

        this.onKeyExitedRegistration = this.geoQuery.on('key_exited', (key, location, distance) => {
            console.log(key + ' exited query to ' + location + ' (' + distance + ' km from center)');
            this.riderHasBooked(key);
        });

        this.onKeyMovedRegistration = this.geoQuery.on('key_moved', (key, location, distance) => {
            console.log(key + ' moved within query to ' + location + ' (' + distance + ' km from center)');
        });
    }

    riderHasBooked(key: string) {
        // this.locationArray = this.locationArray.filter(x => x.uid !== key);
        let index;
        for (let i = 0; i < this.locationArray.length; i++) {
            if (this.locationArray[i].uid === key) {
                index = i;
                break;
            }
        }
        this.locationArray.splice(index, 1);
    }

    cancelAllGeoQuery() {
        this.geoQuery.cancel();
    }

    cancelSpecificGeoQuery() {
        this.onKeyEnteredRegistration.cancel();
        this.onKeyMovedRegistration.cancel();
    }


}
