import * as calc from '../src/index'
import Big from 'big.js';
import { describe, test, expect } from "@jest/globals"

//todo test overflows
describe('Append Digit', () => {
    test('Append string digit to Big', () => {
        let big = Big('1234');
        expect(calc.appendDigit('5', big)).toEqual(Big('12345'));
    });
    test('Enter digit', () => {
        let initialCalcState = {
            operands: {
                storedOperand: Big('0'),
                currOperand: Big('1134')
            },
            operator: '',
            displayStr: '0'
        };
        
        let resultCalcState = {
            operands: {
                storedOperand: Big('0'),
                currOperand: Big('11345')
            },
            operator: '',
            displayStr: '0'
        };
        
        expect(calc.enterCalcDigit('5', initialCalcState)).toEqual(resultCalcState);
    });
});
