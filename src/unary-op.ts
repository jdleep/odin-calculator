import * as R from 'ramda';
import {CalcState, dispValLens} from './state';

interface UnaryOps {
    [i: string]: (a: string) => string;
};

const unaryOps: UnaryOps = {
    '+/-': (a: string) => String(-a),
    '%': (a: string) => String(+a / 100),
};

const enterUnaryOp = (op: string) => (calcState: CalcState) => {
    return op in unaryOps 
    ? R.set(dispValLens,        
        unaryOps[op](R.view(dispValLens, calcState)),
        calcState
    )
    : calcState;
};

export {unaryOps, enterUnaryOp};