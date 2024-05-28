import * as R from 'ramda';
import {CalcState, initState} from './state';
import {binaryOps, enterBinOp} from './binary-op';
import {enterChar} from './enter-char';
import {unaryOps, enterUnaryOp} from './unary-op';
import {enterEquals, enterClear, enterDecimal, enterDelete, enterExp}
    from './misc';



export { handleError };