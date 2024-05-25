import * as calc from '../src/app'
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Unary Operands', () => {
    test('Negate', () => {
        expect(calc.unaryOps['+/-'](-5250)).toEqual(5250);
    });
    test('Percentage', () => {
        expect(calc.unaryOps['%'](523461)).toEqual(5234.61);
    });
    test('Enter existing negation unary op', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = 6125;

        let resultState = R.clone(initialState);
        resultState.operands.currOperand = -6125;

        expect(calc.enterUnaryOp('+/-')(initialState)).toEqual(resultState);
    })
});
