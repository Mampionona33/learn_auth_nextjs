export interface IUser {
    address:  Address | null;
    name:     Name ;
    id:       string;
    v:        number | null;
    email:    string | null;
    groupe:   string | null;
    id_:      number | null;
    password: string | null;
    phone:    string | null;
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
