export default class Place{
    constructor(title, image, location, id) {
        this.title    = title;
        this.image    = image;
        this.location = {latitude: location.latitude, longitude: location.longitude};
        this.address  = location.address;
        this.id       = Date.now().toString() + Math.random().toString();
    }
}