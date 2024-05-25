import * as calc from '../src/app'
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Digit Functions', () => {
    test('Enter digit', () => {
        let initialState = calc.initState();
        initialState.displayValue = '1134';

        
        let resultState = R.clone(initialState)
        resultState.displayValue = '11345';
        
        expect(calc.enterChar('5')(initialState)).toEqual(resultState);
    });
    test('Enter digit while already 0', () => {
        let initialState = calc.initState();
        initialState.displayValue = '0';

        
        let resultState = R.clone(initialState)
        resultState.displayValue = '0';
        
        expect(calc.enterChar('0')(initialState)).toEqual(resultState);        
    });
    
    test('Post-calc reset', () => {
        let initialState = calc.initState();
        initialState.displayValue = '5236';
        initialState.isPostCalc = true;

        
        let resultState = R.clone(initialState)
        resultState.displayValue = '4';
        resultState.isPostCalc = false;
        
        expect(calc.enterChar('4')(initialState)).toEqual(resultState);        
    });
});
