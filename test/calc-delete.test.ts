import { initState } from '../src/state';
import { enterDelete } from '../src/misc';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Delete', () => {
    test('Delete where displayValue has length > 1', () => {
        let initialState = initState();
        initialState.displayValue = '6125';

        let resultState = R.clone(initialState);
        resultState.displayValue = '612';

        expect(enterDelete('delete')(initialState)).toEqual(resultState);
    });
    test('Delete where displayValue has length = 1', () => {
        let initialState = initState();
        initialState.displayValue = '5';

        let resultState = R.clone(initialState);
        resultState.displayValue = '0';

        expect(enterDelete('delete')(initialState)).toEqual(resultState);
    });
});