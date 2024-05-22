import * as calc from '../src/app'
import Big from 'big.js';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('State functions', () => {
    test('initState', () => {
        const resultState = {
            operands: {
                storedOperand: 0,
                currOperand: 0
            },
            operator: '',
            displayStr: '0',
            isPostCalc: false
        };
        expect(calc.initState()).toEqual(resultState);
    });
    test('updateState - object is modified', () => {
        let fakeGlobalState = calc.initState();
        let copyState = calc.initState();
        copyState.operands.storedOperand = 23;
        copyState.operator = '+';
        copyState.operands.currOperand = 342;
        copyState.displayStr = '342';

        calc.updateState(fakeGlobalState)(copyState);

        expect(fakeGlobalState).toBe(fakeGlobalState);
        expect(fakeGlobalState).toEqual(copyState);
    });
});
