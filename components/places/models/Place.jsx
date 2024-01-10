export default class Place{
    constructor(title, image, location, id) {
        this.title    = title;
        this.image    = image;
        this.location = {lat: location.latitude, lng: location.longitude}; // {lat: xxx, lng: xxx}
        this.address  = location.address;
        this.id       = Date.now().toString() + Math.random().toString();
    }
}