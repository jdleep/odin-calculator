import { handleError } from "../src/handle-error";
import { initState } from "../src/state";
import { describe, test, expect } from "@jest/globals"

describe('Error handling', () => {
    test('displayValue is Infinity', () => {
        let initialState = initState();
        initialState.displayValue = 'Infinity';

        
        let resultState = initState();
        resultState.displayValue = 'Error';
        
        expect(handleError(initialState)).toEqual(resultState);
    });
    test('displayValue is -Infinity', () => {
        let initialState = initState();
        initialState.displayValue = '-Infinity';

        
        let resultState = initState();
        resultState.displayValue = 'Error';
        
        expect(handleError(initialState)).toEqual(resultState);
    });
    test('displayValue is NaN', () => {
        let initialState = initState();
        initialState.displayValue = 'NaN';

        
        let resultState = initState();
        resultState.displayValue = 'Error';
        
        expect(handleError(initialState)).toEqual(resultState);
    });
});
