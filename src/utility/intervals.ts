const re_plushours = /([\+-]?\d+)\s*h(our(s)?)?$/;
const re_plusmins = /([\+-]?\d+)\s*m(in(s)?)?$/;
const re_plusdays = /([\+-]?\d+)\s*d(ay(s)?)?$/;

/**
 * Gets a new Date object offset by datestring amount, or an absolute date if an absolute one is passed in.
 *
 * Eg, if datestring is '1h' it will return a date equal to the current time plus 1 hour.
 */
export function getDatePlus(datestring: string, from?: Date): Date {
	if (from == undefined) {
		from = new Date();
	}
	datestring = datestring.trim();

	if (datestring.length == 0 || datestring === "now") {
		return from;
	}

	if (re_plushours.test(datestring)) {
		let groups = re_plushours.exec(datestring);
		if (groups) {
			let [_, n] = groups;
			return plusHours(from, parseInt(n));
		}
	} else if (re_plusmins.test(datestring)) {
		let groups = re_plusmins.exec(datestring);
		if (groups) {
			let [_, n] = groups;
			return plusMinutes(from, parseInt(n));
		}
	} else if (re_plusdays.test(datestring)) {
		let groups = re_plusdays.exec(datestring);
		if (groups) {
			let [_, n] = groups;
			return plusDays(from, parseInt(n));
		}
	}
	let d = new Date(datestring);
	if (isNaN(d.valueOf())) {
		throw "Not a valid datestring.";
	}
	return d;
}

function plusHours(date: Date, hours: number) {
	let nd = new Date(date.getTime());
	nd.setTime(nd.getTime() + hours * 60 * 60 * 1000);
	return nd;
}

function plusMinutes(date: Date, minutes: number) {
	let nd = new Date(date.getTime());
	nd.setTime(nd.getTime() + minutes * 60 * 1000);
	return nd;
}

function plusDays(date: Date, days: number) {
	let nd = new Date(date.getTime());
	nd.setTime(nd.getTime() + days * 24 * 60 * 60 * 1000);
	return nd;
}
