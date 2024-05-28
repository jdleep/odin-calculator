import * as R from 'ramda';
import {CalcState, dispValLens, initState} from './state';
import {binaryOps, enterBinOp} from './binary-op';
import {enterChar} from './enter-char';
import {unaryOps, enterUnaryOp} from './unary-op';
import {enterEquals, enterClear, enterDecimal, enterDelete, enterExp}
    from './misc';

const handleError = (calcState: CalcState) => {
    return R.view(dispValLens, calcState) === 'Infinity' ||
    R.view(dispValLens, calcState) === '-Infinity' ||
    R.view(dispValLens, calcState) === 'NaN'
    ? R.pipe(
        initState,
        R.set(dispValLens, 'Error')
    )(calcState)
    : calcState
}

const hasError = (calcState: CalcState) => 
    R.view(dispValLens, calcState) === 'Error';

export { handleError, hasError };