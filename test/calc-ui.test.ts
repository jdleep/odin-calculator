import * as calc from '../src/index';
import Big from 'big.js';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

describe('UI Methods', () => {
    test('updDispStr', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = Big('3425');

        let resultState = R.clone(initialState);
        resultState.displayStr = '3425';

        expect(calc.updDispStr(initialState)).toEqual(resultState);
    });
    test('getEnterFun - binary operator', () => {
        expect(calc.getEnterFun('+')).toEqual(calc.enterBinOp);
    })
});