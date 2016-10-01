import chai, { expect } from 'chai';

import * as utils from './utils';
import * as dateFns from 'date-fns';

describe('Utils', function () {
    describe('getTimeStringUnits', function () {
        it('should return correctly for seconds', async function () {
            const input = '1S';
            const expectedOutput = 'S';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return correctly for minutes', async function () {
            const input = '1MI';
            const expectedOutput = 'MI';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return correctly for hours', async function () {
            const input = '1H';
            const expectedOutput = 'H';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return correctly for days', async function () {
            const input = '1D';
            const expectedOutput = 'D';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return correctly for months', async function () {
            const input = '1MO';
            const expectedOutput = 'MO';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return correctly for months', async function () {
            const input = '1MO';
            const expectedOutput = 'MO';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return correctly for years', async function () {
            const input = '1Y';
            const expectedOutput = 'Y';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });

        it('should return seconds for invalid units', async function () {
            const input = '1G';
            const expectedOutput = 'S';

            expect(utils.getTimeStringUnits(input)).to.equal(expectedOutput);
        });
    });

    describe('isValidTimeString', function () {
        it('should return true for valid time strings', async function () {
            expect(utils.isValidTimeString('S')).to.equal(true);
            expect(utils.isValidTimeString('MI')).to.equal(true);
            expect(utils.isValidTimeString('H')).to.equal(true);
            expect(utils.isValidTimeString('D')).to.equal(true);
            expect(utils.isValidTimeString('MO')).to.equal(true);
            expect(utils.isValidTimeString('Y')).to.equal(true);
        });

        it('should return false for invalid time strings', async function () {
            expect(utils.isValidTimeString('Z')).to.equal(false);
            expect(utils.isValidTimeString('P')).to.equal(false);
            expect(utils.isValidTimeString('Q')).to.equal(false);
            expect(utils.isValidTimeString('W')).to.equal(false);
            expect(utils.isValidTimeString('1')).to.equal(false);
            expect(utils.isValidTimeString(null)).to.equal(false);
            expect(utils.isValidTimeString(1)).to.equal(false);
        });
    });

    describe('addTimeStringToDate', function () {
        it('should add 1 second to the given date', async function () {
            const date = new Date();
            const expectedOutput = dateFns.addSeconds(date, 1);

            expect(utils.addTimeStringToDate('1S')).to.deep.equal(expectedOutput);
        });

        it('should add 1 minute to the given date', async function () {
            const date = new Date();
            const expectedOutput = dateFns.addMinutes(date, 1);

            expect(utils.addTimeStringToDate('1MI')).to.deep.equal(expectedOutput);
        });

        it('should add 1 hour to the given date', async function () {
            const date = new Date();
            const expectedOutput = dateFns.addHours(date, 1);

            expect(utils.addTimeStringToDate('1H')).to.deep.equal(expectedOutput);
        });

        it('should add 1 day to the given date', async function () {
            const date = new Date();
            const expectedOutput = dateFns.addDays(date, 1);

            expect(utils.addTimeStringToDate('1D')).to.deep.equal(expectedOutput);
        });

        it('should add 1 month to the given date', async function () {
            const date = new Date();
            const expectedOutput = dateFns.addMonths(date, 1);

            expect(utils.addTimeStringToDate('1MO')).to.deep.equal(expectedOutput);
        });

        it('should add 1 year to the given date', async function () {
            const date = new Date();
            const expectedOutput = dateFns.addYears(date, 1);

            expect(utils.addTimeStringToDate('1Y')).to.deep.equal(expectedOutput);
        });
    });
});