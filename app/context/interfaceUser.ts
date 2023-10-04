export interface IUser {
    address:  Address;
    name:     Name;
    id:       string;
    v:        number;
    email:    string;
    groupe:   string;
    id_:      number;
    password: string;
    phone:    string;
    username: string;
}

export interface Address {
    city:        string;
    geolocation: Geolocation;
    number:      number;
    street:      string;
    zipcode:     string;
}

export interface Geolocation {
    lat:  string;
    long: string;
}

export interface Name {
    firstname: string;
    lastname:  string;
}
