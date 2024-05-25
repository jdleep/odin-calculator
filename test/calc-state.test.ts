import * as calc from '../src/app'
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('State functions', () => {
    test('initState', () => {
        const resultState = {
            storedValue = '0',
            displayValue = '0',
            operator: '',
            isPostCalc: false,
        };
        expect(calc.initState()).toEqual(resultState);
    });
    test('updateState - object is modified', () => {
        let fakeGlobalState = calc.initState();
        let copyState = calc.initState();
        copyState.storedValue = '23';
        copyState.operator = '+';
        copyState.displayValue = '342';

        calc.updateState(fakeGlobalState)(copyState);

        expect(fakeGlobalState).toBe(fakeGlobalState);
        expect(fakeGlobalState).toEqual(copyState);
    });
});
