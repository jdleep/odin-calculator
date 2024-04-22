import {Calculator} from '../src/index'
import { describe, test, expect } from "@jest/globals"

let calc = new Calculator();
//todo test overflows
describe('Calculator binary operators', () => {
    test('Addition with positive numbers', () => {
        expect(calc.binaryOperate(1,'+',2)).toEqual(3);
    });
    test('Addition with zero', () => {
        expect(calc.binaryOperate(0,'+',2)).toEqual(2);
    });
    test('Addition with negative number', () => {
        expect(calc.binaryOperate(5,'+',-100)).toEqual(-95);
    });
    test('Subtraction with positive numbers', () => {
        expect(calc.binaryOperate(50, '-', 25)).toEqual(25);
    });
    test('Subtraction with negative numbers', () => {
        expect(calc.binaryOperate(-5,'-',-1395)).toEqual(1390);
    });
    test('Subtraction with zero', () => {
        expect(calc.binaryOperate(0,'-',0)).toEqual(0);
    });
    test('Multiplication with positive numbers', () => {
        expect(calc.binaryOperate(5,'*',12)).toEqual(60);
    }); 
    test('Multiplication with negative numbers', () => {
        expect(calc.binaryOperate(-1,'*',-2)).toEqual(2);
    });
    test('Multiplication with zero', () => {
        expect(calc.binaryOperate(0,'*',1)).toEqual(0);
    });
    test('Division with positive numbers', () => {
        expect(calc.binaryOperate(15,'/',3)).toEqual(5);
    });
    test('Divide positive by negative number', () => {
        expect(calc.binaryOperate(300,'/',60)).toEqual(5);
    });
    test('Divide by zero', () => {
        expect(calc.binaryOperate(1,'/',0)).toEqual(Infinity);
    });
});

describe('Calculator unary operators', () => {
    test('Sign with positive number', () => {
        expect(calc.unaryOperate(1,'+/-')).toEqual(-1);
    });
    test('Sign with zero', () => {
        expect(calc.unaryOperate(0,'+/-')).toEqual(0);
    });
    test('Sign with negative number', () => {
        expect(calc.unaryOperate(-120340, '+/-')).toEqual(120340);
    });
    test('Percent with negative number', () => {
        expect(calc.unaryOperate(-120340, '%')).toEqual(-1203.40);
    });
    test('Percent with positive number', () => {
        expect(calc.unaryOperate(120340, '%')).toEqual(1203.40);
    });
    test('Percent with zero', () => {
        expect(calc.unaryOperate(0, '%')).toEqual(0);
    });
})

describe('Calculator errors', () => {
    test('Use an operator that isn\'t defined', () => {
        expect(() => {
            calc.binaryOperate(300,'?',30);
        }).toThrow('Operator not found in calculator');
    });
});


describe('Calculator digit entry', () => {
    test('Operand1 digit entry', () => {
        let calcDigit = new Calculator();
        calcDigit.calculate('1');
        calcDigit.calculate('2');
        calcDigit.calculate('3');
        expect(calcDigit.calculate('4')).toEqual({
            stage: 'OPERAND1',
            operand1: '1234',
            operator: '',
            operand2: '',
            displayValue: '1234'
        });
    });

    test('Operand1 digit entry2', () => {
        let calcDigit = new Calculator();
        calcDigit.calculate('4');
        calcDigit.calculate('8');
        expect(calcDigit.calculate('0')).toEqual({
            stage: 'OPERAND1',
            operand1: '480',
            operator: '',
            operand2: '',
            displayValue: '480'
        });
    });

    test('Operand1 enter zero multiple times', () => {
        let calcDigit = new Calculator();
        calcDigit.calculate('0');
        calcDigit.calculate('0');
        expect(calcDigit.calculate('0')).toEqual({
            stage: 'OPERAND1',
            operand1: '0',
            operator: '',
            operand2: '',
            displayValue: '0'
        });
    });

    test('Operand2 digit entry', () => {
        let calcDigit = new Calculator();
        calcDigit.calculate('4');
        calcDigit.calculate('8');
        calcDigit.calculate('+');
        calcDigit.calculate('6');
        expect(calcDigit.calculate('0')).toEqual({
            stage: 'OPERAND2',
            operand1: '48',
            operator: '+',
            operand2: '60',
            displayValue: '60'
        });
    });

    test('Operand2 digit entry', () => {
        let calcDigit = new Calculator();
        calcDigit.calculate('7');
        calcDigit.calculate('4');
        calcDigit.calculate('+');
        calcDigit.calculate('2');
        expect(calcDigit.calculate('9')).toEqual({
            stage: 'OPERAND2',
            operand1: '74',
            operator: '+',
            operand2: '29',
            displayValue: '29'
        });
    });

    test('Operand2 enter zero multiple times', () => {
        let calcDigit = new Calculator();
        calcDigit.calculate('7');
        calcDigit.calculate('4');
        calcDigit.calculate('+');
        calcDigit.calculate('0');
        expect(calcDigit.calculate('0')).toEqual({
            stage: 'OPERAND2',
            operand1: '74',
            operator: '+',
            operand2: '0',
            displayValue: '0'
        });
    });
});