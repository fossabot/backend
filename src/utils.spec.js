import chai, { expect } from 'chai';

import * as utils from './utils';

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
            expect(utils.isValidTimeString('S')).to.be.true;
            expect(utils.isValidTimeString('MI')).to.be.true;
            expect(utils.isValidTimeString('H')).to.be.true;
            expect(utils.isValidTimeString('D')).to.be.true;
            expect(utils.isValidTimeString('MO')).to.be.true;
            expect(utils.isValidTimeString('Y')).to.be.true;
        });

        it('should return false for invalid time strings', async function () {
            expect(utils.isValidTimeString('Z')).to.be.false;
            expect(utils.isValidTimeString('P')).to.be.false;
            expect(utils.isValidTimeString('Q')).to.be.false;
            expect(utils.isValidTimeString('W')).to.be.false;
            expect(utils.isValidTimeString('1')).to.be.false;
            expect(utils.isValidTimeString(null)).to.be.false;
            expect(utils.isValidTimeString(1)).to.be.false;
        });
    });
});