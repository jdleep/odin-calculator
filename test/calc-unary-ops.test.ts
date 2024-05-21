import * as calc from '../src/app'
import Big from 'big.js';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Unary Operands', () => {
    test('Negate', () => {
        expect(calc.unaryOps['+/-'](Big('-5250'))).toEqual(Big('5250'));
    });
    test('Percentage', () => {
        expect(calc.unaryOps['%'](Big('523461'))).toEqual(Big('5234.61'));
    });
    test('Enter existing negation unary op', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = Big('6125');

        let resultState = R.clone(initialState);
        resultState.operands.currOperand = Big('-6125')

        expect(calc.enterUnaryOp('+/-', initialState)).toEqual(resultState);
    })
});
