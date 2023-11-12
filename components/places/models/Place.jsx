export default class Place{
    constructor(title, image, location, address) {
        this.title    = title;
        this.image    = image;
        this.location = location; // {lat: xxx, lng: xxx}
        this.address  = address;
        this.id       = Date.now().toString();
    }
}