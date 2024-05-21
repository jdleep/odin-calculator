import * as calc from '../src/app';
import Big from 'big.js';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('binaryOps', () => {
    test('Binary Op: +', () => {
        expect(
            calc.binaryOps['+'](Big('3245'), Big('4250'))
        )
        .toEqual(Big('7495'));
    });
    test('Binary Op: -', () => {
        expect(
            calc.binaryOps['-'](Big('526'), Big('610524'))
        )
        .toEqual(Big('-609998'));
    });
    test('Binary Op: *', () => {
        expect(
            calc.binaryOps['*'](Big('435'), Big('6214'))
        )
        .toEqual(Big('2703090'));
    });
    test('Binary Op: /', () => {
        expect(
            calc.binaryOps['/'](Big('12'), Big('0.5'))
        )
        .toEqual(Big('24'));
    });
});

describe('Binary Operands', () => {
    test('Calculate: +', () => {
        let initialState = calc.initState();
        initialState.operands.storedOperand = Big('23');
        initialState.operator = '+';
        initialState.operands.currOperand = Big('342');

        let resultState = R.clone(initialState);
        resultState.operands.currOperand = Big('365');
        resultState.operands.storedOperand = Big('365');
        resultState.isPostCalc = true;

        expect(calc.calculate(initialState)).toEqual(resultState);
    });
});

describe('enterBinOp: +', () => {
    let initialState = calc.initState();
    initialState.operands.storedOperand = Big('52');
    initialState.operator = '+';
    initialState.operands.currOperand = Big('3432');

    let resultState = R.clone(initialState);
    resultState.operands.currOperand = Big('3484');
    resultState.operator = '-';
    resultState.operands.storedOperand = Big('3484');
    resultState.isPostCalc = true;

    expect(calc.enterBinOp('-', initialState)).toEqual(resultState);
});