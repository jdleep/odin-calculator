import { enterChar } from "../src/enter-char";
import { initState } from "../src/state";
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Digit Functions', () => {
    test('Enter digit', () => {
        let initialState = initState();
        initialState.displayValue = '1134';

        
        let resultState = R.clone(initialState);
        resultState.displayValue = '11345';
        
        expect(enterChar('5')(initialState)).toEqual(resultState);
    });
    test('Enter digit while already 0', () => {
        let initialState = initState();
        initialState.displayValue = '0';

        
        let resultState = R.clone(initialState);
        resultState.displayValue = '0';
        
        expect(enterChar('0')(initialState)).toEqual(resultState);        
    });
    
    test('Post-calc reset', () => {
        let initialState = initState();
        initialState.displayValue = '5236';
        initialState.isPostCalc = true;

        
        let resultState = R.clone(initialState)
        resultState.displayValue = '4';
        resultState.isPostCalc = false;
        
        expect(enterChar('4')(initialState)).toEqual(resultState);        
    });

    test('Limit string length to 20 chars', () => {
        let initialState = initState();
        initialState.displayValue = '12345678901234567890';

        let resultState = R.clone(initialState);
        expect(enterChar('9')(initialState)).toEqual(resultState);
    })
});
