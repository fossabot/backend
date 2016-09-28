import { addSeconds, addMinutes, addHours, addDays, addMonths, addYears } from 'date-fns';

export function generateUID(len = 32) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * This adds a stringified length of time to a given date (or now if not provided).
 *
 * Examples of stringified time is '1D', '33S', '3M' etc.
 *
 * @param {Date|string|null} date
 * @param {string|null} string
 * @returns {Date}
 */
export function addTimeStringToDate(date, string) {
    if (!date && !string) {
        return new Date();
    }

    if (!string) {
        string = date;
        date = new Date();
    }

    const isValid = isValidTimeString(string);

    if (!isValid) {
        return new Date();
    }

    const units = getTimeStringUnits(string);
    const amount = string.substr(0, -(units.length));

    switch (units) {
        case 'S':
            return addSeconds(date, amount);
        case 'MI':
            return addMinutes(date, amount);
        case 'H':
            return addHours(date, amount);
        case 'D':
            return addDays(date, amount);
        case 'MO':
            return addMonths(date, amount);
        case 'Y':
            return addYears(date, amount);
    }

    return new Date();
}

/**
 * This will determine and return the time string units for the give time string.
 *
 * Valid time string units are:
 *
 * S
 * MI
 * H
 * D
 * MO
 * Y
 *
 * @param string
 * @returns {string}
 */
export function getTimeStringUnits(string) {
    const isValid = isValidTimeString(string);

    if (!isValid) {
        return 'S';
    }

    const minus1 = string.substr(-1).toUpperCase();

    if (minus1 === 'I' || minus1 === 'O') {
        return string.substr(-2).toUpperCase();
    }

    return minus1;
}

/**
 * This will check the given time string and see if it's valid or not.
 *
 * @param string
 * @returns {boolean}
 */
export function isValidTimeString(string) {
    if (typeof string !== 'string') {
        return false;
    }

    const minus1 = string.substr(-1).toUpperCase();

    if (string.length >= 2 && minus1 === 'I' || minus1 === 'O') {
        const minus2 = string.substr(-2).toUpperCase();

        return minus2 === 'MI' || minus2 === 'MO';
    }

    return minus1 === 'S' || minus1 === 'H' || minus1 === 'D' || minus1 === 'Y';
}