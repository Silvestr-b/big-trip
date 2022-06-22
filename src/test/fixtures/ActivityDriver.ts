import {AdditionalOption} from "../../main/AdditionalOption";
import {IllegalOptionException} from "../../main/errors/IllegalOptionException";
import {ActivityType} from "../../main/ActivityType";
import {Location} from "../../main/Location";
import {Activity} from "../../main/Activity";

export class ActivityDriver extends Activity {
	constructor(type: ActivityType, location: Location) {
		super(type, location);
	}

	public changeType(type: ActivityType) {
		const form = this.getUpdateForm();
		form.changeType(type);
		this.apply(form);
	}

	public changeLocation(location: Location) {
		const form = this.getUpdateForm();
		form.changeLocation(location);
		this.apply(form);
	}

	public changeBasePrice(price: number) {
		const form = this.getUpdateForm();
		form.changePrice(price);
		this.apply(form);
	}

	public toggleOption(option: AdditionalOption) {
		const form = this.getUpdateForm();
		form.toggleOption(option);
		this.apply(form);
	}

	public toggleFavorite() {
		const form = this.getUpdateForm();
		form.toggleFavorite();
		this.apply(form);
	}

	public changeStartDate(date: Date) {
		const form = this.getUpdateForm();
		form.changeStartDate(date);
		this.apply(form);
	}

	public changeEndDate(date: Date) {
		const form = this.getUpdateForm();
		form.changeEndDate(date);
		this.apply(form);
	}

	public verifyName(expected: string) {
		expect(this.getName()).toBe(expected);
	}

	public verifyBasePrice(expected: number) {
		expect(this.getBasePrice()).toBe(expected);
	}

	public verifyTotalCost(expected: number) {
		expect(this.getTotalCost()).toBe(expected);
	}

	public verifyIsFavorite() {
		expect(this.isFavorite()).toBe(true);
	}

	public verifyIsNotFavorite() {
		expect(this.isFavorite()).toBe(false);
	}

	public verifyNoOptionSelected() {
		expect(this.getSelectedOptions()).toEqual([]);
	}

	public verifyOptionSelected(option: AdditionalOption) {
		expect(this.isOptionSelected(option)).toBe(true);
	}

	public verifyOptionNotSelected(option: AdditionalOption) {
		expect(this.isOptionSelected(option)).toBe(false);
	}

	public verifyToggleOptionThrows(option: AdditionalOption) {
		expect(() => {
			const form = this.getUpdateForm();
			form.toggleOption(option);
		}).toThrow(IllegalOptionException);
	}

	public verifyDuration(duration: number) {
		expect(this.getDuration()).toBe(duration);
	}
}