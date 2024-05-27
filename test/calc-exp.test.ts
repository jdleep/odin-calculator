import { initState } from '../src/state';
import { enterExp } from '../src/misc';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Exponent', () => {
    test('Enter exponent where not present', () => {
        let initialState = initState();
        initialState.displayValue = '6125';

        let resultState = R.clone(initialState);
        resultState.displayValue = '6125e';

        expect(enterExp('e')(initialState)).toEqual(resultState);
    });
    test('Enter exponent where already present', () => {
        let initialState = initState();
        initialState.displayValue = '5e6';

        let resultState = R.clone(initialState);

        expect(enterExp('e')(initialState)).toEqual(resultState);
    });
});