import * as calc from '../src/app'
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('Decimal', () => {
    test('Enter decimal (curr op is integer)', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = 6125;

        let resultState = R.clone(initialState);
        resultState.decimalBuffer = '.';

        expect(calc.enterDecimal('.')(initialState)).toEqual(resultState);
    });
    test('Enter decimal (curr op is not integer)', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = 5.6;

        let resultState = R.clone(initialState);

        expect(calc.enterUnaryOp('.')(initialState)).toEqual(resultState);
    });
    test('Append decimal buffer (has buffer)', () => {
        let state = calc.initState();
        state.decimalBuffer = '.';

        expect(calc.getDecBuffer(state)).toEqual('.');
    });
    test('Append decimal buffer (no buffer)', () => {
        let state = calc.initState();
        state.decimalBuffer = '';

        expect(calc.getDecBuffer(state)).toEqual('');
    });
    test('hasDecBuffer (contains buffer)', () => {
        let state = calc.initState();
        state.decimalBuffer = '.';

        expect(calc.hasDecBuffer(state)).toEqual(true);
    });
    test('hasDecBuffer (no buffer)', () => {
        let state = calc.initState();
        state.decimalBuffer = '';
        
        expect(calc.hasDecBuffer(state)).toEqual(false);
    });
    test('resetDecBuffer (curr opeprator is not integer)', () => {
        let state = calc.initState();
        state.decimalBuffer = '.';
        state.operands.currOperand = 115.2;

        let resultState = R.clone(state);
        resultState.decimalBuffer = '';

        expect(calc.resetDecBuffer(state)).toEqual(resultState);
    });
    test('resetDecBuffer (curr operator is integer)', () => {
        let state = calc.initState();
        state.decimalBuffer = '.';
        state.operands.currOperand = 1152;

        expect(calc.resetDecBuffer(state)).toEqual(state);
    });
});