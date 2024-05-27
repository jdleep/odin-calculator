import { getEnterFun } from '../src/ui';
import { enterChar } from '../src/enter-char';
import { enterBinOp } from '../src/binary-op';
import { enterUnaryOp } from '../src/unary-op';
import { enterEquals, enterClear } from '../src/misc';
import { describe, test, expect } from "@jest/globals"


describe('UI Methods', () => {
    test('getEnterFun - binary operator', () => {
        expect(JSON.stringify(getEnterFun('+')))
        .toStrictEqual(JSON.stringify(enterBinOp('+')));
    });
    test('getEnterFun - unary operator', () => {
        expect(JSON.stringify(getEnterFun('%')))
        .toEqual(JSON.stringify(enterUnaryOp('%')));
    });
    test('getEnterFun - digit', () => {
        expect(JSON.stringify(getEnterFun('3')))
        .toEqual(JSON.stringify(enterChar('3')));
    });
    test('getEnterFun - equals', () => {
        expect(JSON.stringify(getEnterFun('=')))
        .toEqual(JSON.stringify(enterEquals('=')));
    });
    test('getEnterFun - clear', () => {
        expect(JSON.stringify(getEnterFun('A/C')))
        .toEqual(JSON.stringify(enterClear('A/C')));
    });
});
