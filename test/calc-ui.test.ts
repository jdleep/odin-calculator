import * as calc from '../src/app';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

describe('UI Methods', () => {
    test('updDispStr', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = 3425;

        let resultState = R.clone(initialState);
        resultState.displayStr = '3425';

        expect(calc.updDispStr(initialState)).toEqual(resultState);
    });
    test('updDispStr with decimal buffer', () => {
        let initialState = calc.initState();
        initialState.operands.currOperand = 3425;
        initialState.decimalBuffer = '.';

        let resultState = R.clone(initialState);
        resultState.displayStr = '3425.';

        expect(calc.updDispStr(initialState)).toEqual(resultState);
    });
    test('getEnterFun - binary operator', () => {
        expect(JSON.stringify(calc.getEnterFun('+')))
        .toStrictEqual(JSON.stringify(calc.enterBinOp('+')));
    });
    test('getEnterFun - unary operator', () => {
        expect(JSON.stringify(calc.getEnterFun('%')))
        .toEqual(JSON.stringify(calc.enterUnaryOp('%')));
    });
    test('getEnterFun - digit', () => {
        expect(JSON.stringify(calc.getEnterFun('3')))
        .toEqual(JSON.stringify(calc.enterDigit('3')));
    });
    test('getEnterFun - equals', () => {
        expect(JSON.stringify(calc.getEnterFun('=')))
        .toEqual(JSON.stringify(calc.enterEquals('=')));
    });
    test('getEnterFun - clear', () => {
        expect(JSON.stringify(calc.getEnterFun('A/C')))
        .toEqual(JSON.stringify(calc.enterClear('A/C')));
    });
});
