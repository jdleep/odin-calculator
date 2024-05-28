import * as R from 'ramda';
import { dispValLens } from './state';
;
const unaryOps = {
    '+/-': (a) => String(-a),
    '%': (a) => String(+a / 100),
};
const enterUnaryOp = (op) => (calcState) => {
    return op in unaryOps
        ? R.set(dispValLens, unaryOps[op](R.view(dispValLens, calcState)), calcState)
        : calcState;
};
export { unaryOps, enterUnaryOp };
//# sourceMappingURL=unary-op.js.map