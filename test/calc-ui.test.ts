import * as calc from '../src/app';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

describe('UI Methods', () => {
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
        .toEqual(JSON.stringify(calc.enterChar('3')));
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
