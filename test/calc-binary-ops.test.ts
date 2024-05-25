import * as calc from '../src/app';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('binaryOps', () => {
    test('Binary Op: +', () => {
        expect(
            calc.binaryOps['+'](3245, 4250)
        )
        .toEqual(7495);
    });
    test('Binary Op: -', () => {
        expect(
            calc.binaryOps['-'](526, 610524)
        )
        .toEqual(-609998);
    });
    test('Binary Op: *', () => {
        expect(
            calc.binaryOps['*'](435, 6214)
        )
        .toEqual(2703090);
    });
    test('Binary Op: /', () => {
        expect(
            calc.binaryOps['/'](12, 0.5)
        )
        .toEqual(24);
    });
});

describe('Binary Operands', () => {
    test('Calculate: +', () => {
        let initialState = calc.initState();
        initialState.operands.storedOperand = 23;
        initialState.operator = '+';
        initialState.operands.currOperand = 342;

        let resultState = R.clone(initialState);
        resultState.operands.storedOperand = 23;
        resultState.operands.currOperand = 365;
        resultState.isPostCalc = true;

        expect(calc.calculate(initialState)).toEqual(resultState);
    });
    test('enterBinOp: +', () => {
        let initialState = calc.initState();
        initialState.operands.storedOperand = 52;
        initialState.operator = '+';
        initialState.operands.currOperand = 3432;
    
        let resultState = R.clone(initialState);
        resultState.operands.currOperand = 3484;
        resultState.operator = '-';
        resultState.operands.storedOperand = 3484;
        resultState.isPostCalc = true;
    
        expect(calc.enterBinOp('-')(initialState)).toEqual(resultState);
    });
    test('Divide by zero', () => {
        let initialState = calc.initState();
        initialState.operands.storedOperand = -521;
        initialState.operator = '/';
        initialState.operands.currOperand = 0;
    
        let resultState = R.clone(initialState);
        resultState.operands.currOperand = -Infinity;
        resultState.operator = '';
        resultState.operands.storedOperand = -Infinity;
        resultState.isPostCalc = true;
    
        expect(calc.enterEquals('=')(initialState)).toEqual(resultState);
    });
});


describe('enterEquals', () => {
    test('enterEquals: +', () => {
        let initialState = calc.initState();
        initialState.operands.storedOperand = 253;
        initialState.operator = '+';
        initialState.operands.currOperand = 67;
    
        let resultState = R.clone(initialState);
        resultState.operands.currOperand = 320;
        resultState.operator = '';
        resultState.operands.storedOperand = 320;
        resultState.isPostCalc = true;
    
        expect(calc.enterEquals('=')(initialState)).toEqual(resultState);
    });
});