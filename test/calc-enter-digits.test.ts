import * as calc from '../src/index'
import Big from 'big.js';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Digit Functions', () => {
    test('Append string digit to Big', () => {
        let big = Big('1234');
        expect(calc.appendDigit('5', big)).toEqual(Big('12345'));
    });
    test('Enter digit', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = Big('1134');

        
        let resultState = R.clone(initialState)
        resultState.operands.currOperand = Big('11345');
        
        expect(calc.enterDigit('5', initialState)).toEqual(resultState);
    });
    test('Enter digit while already 0', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = Big('0');

        
        let resultState = R.clone(initialState)
        resultState.operands.currOperand = Big('0');
        
        expect(calc.enterDigit('0', initialState)).toEqual(resultState);        
    });
    test('Post-calc reset', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = Big('5236');
        initialState.isPostCalc = true;

        
        let resultState = R.clone(initialState)
        resultState.operands.currOperand = Big('4');
        resultState.isPostCalc = false;
        
        expect(calc.enterDigit('4', initialState)).toEqual(resultState);        
    });
});
