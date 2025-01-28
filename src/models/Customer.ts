export class Customer {
    private id: string;
    private name: string;
    private nic: string;
    private email: string;
    private phone: number;

    constructor(id: string, name: string, nic: string, email: string, phone: number) {
        this.id = id;
        this.name = name;
        this.nic = nic;
        this.email = email;
        this.phone = phone;
    }
}