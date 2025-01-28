export class CustomerModel {
    // private id: string;
    name: string;
    nic: string;
    email: string;
    phone: string;

    constructor(name: string, nic: string, email: string, phone: string) {
        this.name = name;
        this.nic = nic;
        this.email = email;
        this.phone = phone;
    }
}