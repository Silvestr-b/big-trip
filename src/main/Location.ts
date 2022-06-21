export class Location {
	private readonly name: string;
	private readonly description: string;
	private readonly photos: string[];

	constructor(name: string, description: string, photos: string[]) {
		this.name = name;
		this.description = description;
		this.photos = photos;
	}

	public getName() {
		return this.name;
	}

	public getDescription() {
		return this.description;
	}

	public getPhotos() {
		return this.photos;
	}
}
