import { unaryOps, enterUnaryOp} from '../src/unary-op';
import { initState } from '../src/state';
import { describe, test, expect } from "@jest/globals";
import * as R from 'ramda';

//todo test overflows
describe('Unary Operands', () => {
    test('Negate', () => {
        expect(unaryOps['+/-']('-5250')).toEqual('5250');
    });
    test('Percentage', () => {
        expect(unaryOps['%']('523461')).toEqual('5234.61');
    });
    test('Enter existing negation unary op', () => {
        let initialState = initState();
        initialState.displayValue = '6125';

        let resultState = R.clone(initialState);
        resultState.displayValue = '-6125';

        expect(enterUnaryOp('+/-')(initialState)).toEqual(resultState);
    })
});
