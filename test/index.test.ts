import {Calculator} from '../src/index'
import { describe, test, expect } from "@jest/globals"

let calc = new Calculator();
//todo test overflows
describe('Calculator operate addition', () => {
    test('Addition with positive numbers', () => {
        expect(calc.operate(1,'+',2)).toEqual(3);
    });
    test('Addition with zero', () => {
        expect(calc.operate(0,'+',2)).toEqual(2);
    });
    test('Addition with negative number', () => {
        expect(calc.operate(5,'+',-100)).toEqual(-95);
    });
});

describe('Calculator operate subtraction', () => {
    test('Subtraction with positive numbers', () => {
        expect(calc.operate(50, '-', 25)).toEqual(25);
    });
    test('Subtraction with negative numbers', () => {
        expect(calc.operate(-5,'-',-1395)).toEqual(1390);
    });
    test('Subtraction with zero', () => {
        expect(calc.operate(0,'-',0)).toEqual(0);
    });
});

describe('Calculator operate multiplication', () => {
    test('Multiplication with positive numbers', () => {
        expect(calc.operate(5,'*',12)).toEqual(60);
    }); 
    test('Multiplication with negative numbers', () => {
        expect(calc.operate(-1,'*',-2)).toEqual(2);
    });
    test('Multiplication with zero', () => {
        expect(calc.operate(0,'*',1)).toEqual(0);
    });
})

describe('Calculator operate division', () => {
    test('Division with positive numbers', () => {
        expect(calc.operate(15,'/',3)).toEqual(5);
    });
    test('Divide positive by negative number', () => {
        expect(calc.operate(300,'/',60)).toEqual(5);
    });
    test('Divide by zero', () => {
        expect(calc.operate(1,'/',0)).toEqual(Infinity);
    });
});

describe('Calculator operator not present', () => {
    test('Use an operator that isn\'t defined', () => {
        expect(() => {
            calc.operate(300,'?',30);
        }).toThrow('Operator not found in calculator');
    });
});
