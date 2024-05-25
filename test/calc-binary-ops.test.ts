import * as calc from '../src/app';
import { describe, test, expect } from "@jest/globals"
import * as R from 'ramda';

//todo test overflows
describe('binaryOps', () => {
    test('Binary Op: +', () => {
        expect(
            calc.binaryOps['+']('3245', '4250')
        )
        .toEqual('7495');
    });
    test('Binary Op: -', () => {
        expect(
            calc.binaryOps['-']('526', '610524')
        )
        .toEqual('-609998');
    });
    test('Binary Op: *', () => {
        expect(
            calc.binaryOps['*']('435', '6214')
        )
        .toEqual('2703090');
    });
    test('Binary Op: /', () => {
        expect(
            calc.binaryOps['/']('12', '0.5')
        )
        .toEqual('24');
    });
});

describe('Binary Operands', () => {
    test('Calculate: +', () => {
        let initialState = calc.initState();
        initialState.storedValue = '23';
        initialState.operator = '+';
        initialState.displayValue = '342';

        let resultState = R.clone(initialState);
        resultState.storedValue = '23';
        resultState.displayValue = '365';
        resultState.isPostCalc = true;

        expect(calc.calculate(initialState)).toEqual(resultState);
    });
    test('enterBinOp: +', () => {
        let initialState = calc.initState();
        initialState.storedValue = '52';
        initialState.operator = '+';
        initialState.displayValue = '3432';
    
        let resultState = R.clone(initialState);
        resultState.displayValue = '3484';
        resultState.operator = '-';
        resultState.storedValue = '3484';
        resultState.isPostCalc = true;
    
        expect(calc.enterBinOp('-')(initialState)).toEqual(resultState);
    });
    test('Divide by zero', () => {
        let initialState = calc.initState();
        initialState.storedValue = '-521';
        initialState.operator = '/';
        initialState.displayValue = '0';
    
        let resultState = R.clone(initialState);
        resultState.displayValue = '-Infinity';
        resultState.operator = '';
        resultState.storedValue = '-Infinity';
        resultState.isPostCalc = true;
    
        expect(calc.enterEquals('=')(initialState)).toEqual(resultState);
    });
});


describe('enterEquals', () => {
    test('enterEquals: +', () => {
        let initialState = calc.initState();
        initialState.storedValue = '253';
        initialState.operator = '+';
        initialState.displayValue = '67';
    
        let resultState = R.clone(initialState);
        resultState.displayValue = '320';
        resultState.operator = '';
        resultState.storedValue = '320';
        resultState.isPostCalc = true;
    
        expect(calc.enterEquals('=')(initialState)).toEqual(resultState);
    });
});