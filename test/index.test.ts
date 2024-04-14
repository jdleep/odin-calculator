import {Calculator} from '../src/index'
import { describe, test, expect } from "@jest/globals"


//todo test big numbers
describe('Calculator operate addition', () => {
    test('Addition with positive integers', () => {
        let calc = new Calculator();
        expect(calc.operate(1,'+',2)).toEqual(3);
    });
    test('Addition with zero', () => {
        let calc = new Calculator();
        expect(calc.operate(0,'+',2)).toEqual(3);
    });
    test('Addition with negative number', () => {
        let calc = new Calculator();
        expect(calc.operate(5,'+',-100)).toEqual(3);
    });
});