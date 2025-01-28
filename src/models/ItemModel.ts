export class ItemModel {
    name: string;
    Quantity: number;
    price: number;

    constructor(name: string, quantity: number, price: number) {
        this.name = name;
        this.Quantity = quantity;
        this.price = price;
    }
}
