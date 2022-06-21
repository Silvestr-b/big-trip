import {nanoid} from "nanoid";

export class AdditionalOption {
	private readonly ID_LENGTH = 6;
	private readonly name: string;
	private readonly description: string;
	private readonly price: number;
	private readonly id: string;

	constructor(name: string, description: string, price: number) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.id = nanoid(this.ID_LENGTH);
	}

	public getName() {
		return this.name;
	}

	public getId() {
		return this.id;
	}

	public getDescription() {
		return this.description;
	}

	public getPrice() {
		return this.price;
	}
}
