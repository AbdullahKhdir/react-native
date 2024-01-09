export default class Place{
    constructor(title, image, location) {
        this.title    = title;
        this.image    = image;
        this.location = {latitude: location.latitude, longitude: location.longitude}; // {lat: xxx, lng: xxx}
        this.address  = location.address;
        this.id       = Date.now().toString() + Math.random().toString();
    }
}