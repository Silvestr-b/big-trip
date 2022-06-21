import {AdditionalOption} from "../../AdditionalOption";
import {IllegalOptionException} from "../../errors/IllegalOptionException";
import {ActivityType} from "../../ActivityType";
import {Location} from "../../Location";
import {Activity} from "../../Activity";

export class ActivityDriver {
	private activity: Activity;

	constructor(activity: Activity) {
		this.activity = activity;
	}

	public verifyName(expected: string) {
		expect(this.activity.getName()).toBe(expected);
	}

	public verifyBasePrice(expected: number) {
		expect(this.activity.getBasePrice()).toBe(expected);
	}

	public verifyTotalCost(expected: number) {
		expect(this.activity.getTotalCost()).toBe(expected);
	}

	public verifyIsFavorite() {
		expect(this.activity.isFavorite()).toBe(true);
	}

	public verifyIsNotFavorite() {
		expect(this.activity.isFavorite()).toBe(false);
	}

	public verifyNoOptionSelected() {
		expect(this.activity.getSelectedOptions()).toEqual([]);
	}

	public verifyOptionSelected(option: AdditionalOption) {
		expect(this.activity.isOptionSelected(option)).toBe(true);
	}

	public verifyOptionNotSelected(option: AdditionalOption) {
		expect(this.activity.isOptionSelected(option)).toBe(false);
	}

	public verifyToggleOptionThrows(option: AdditionalOption) {
		expect(() => {
			const form = this.activity.getUpdateForm();
			form.toggleOption(option);
		}).toThrow(IllegalOptionException);
	}

	public verifyDuration(duration: number) {
		expect(this.activity.getDuration()).toBe(duration);
	}

	public changeType(type: ActivityType) {
		const form = this.activity.getUpdateForm();
		form.changeType(type);
		this.activity.apply(form);
	}

	public changeLocation(location: Location) {
		const form = this.activity.getUpdateForm();
		form.changeLocation(location);
		this.activity.apply(form);
	}

	public changePrice(price: number) {
		const form = this.activity.getUpdateForm();
		form.changePrice(price);
		this.activity.apply(form);
	}

	public toggleOption(option: AdditionalOption) {
		const form = this.activity.getUpdateForm();
		form.toggleOption(option);
		this.activity.apply(form);
	}

	public toggleFavorite() {
		const form = this.activity.getUpdateForm();
		form.toggleFavorite();
		this.activity.apply(form);
	}

	public changeStartDate(date: Date) {
		const form = this.activity.getUpdateForm();
		form.changeStartDate(date);
		this.activity.apply(form);
	}

	public changeEndDate(date: Date) {
		const form = this.activity.getUpdateForm();
		form.changeEndDate(date);
		this.activity.apply(form);
	}
}