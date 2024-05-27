import { initState, updateState } from "../src/state";
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('State functions', () => {
    test('initState', () => {
        const resultState = {
            storedValue: '0',
            displayValue: '0',
            operator: '',
            isPostCalc: false
        };
        expect(initState()).toEqual(resultState);
    });
    test('updateState - object is modified', () => {
        let fakeGlobalState = initState();
        let copyState = initState();
        copyState.storedValue = '23';
        copyState.operator = '+';
        copyState.displayValue = '342';

        updateState(fakeGlobalState)(copyState);

        expect(fakeGlobalState).toBe(fakeGlobalState);
        expect(fakeGlobalState).toEqual(copyState);
    });
});
