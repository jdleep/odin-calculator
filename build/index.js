"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = exports.enterClear = exports.enterEquals = exports.getEnterFun = exports.updDispStr = exports.enterBinOp = exports.calculate = exports.applyBinFun = exports.enterUnaryOp = exports.unaryOps = exports.binaryOps = exports.enterDigit = exports.appendDigit = exports.initState = void 0;
const big_js_1 = __importDefault(require("big.js"));
const R = __importStar(require("ramda"));
const RE = __importStar(require("remeda"));
;
;
const initState = (calc) => ({
    operands: {
        storedOperand: (0, big_js_1.default)('0'),
        currOperand: (0, big_js_1.default)('0')
    },
    operator: '',
    displayStr: '0',
    isPostCalc: false
});
exports.initState = initState;
let globalState = initState();
const updateState = (globalState, calcState) => Object.assign(globalState, calcState);
exports.updateState = updateState;
const currOpLens = R.lensPath(['operands', 'currOperand']);
const storedOpLens = R.lensPath(['operands', 'storedOperand']);
const isPostCalcLens = R.lensPath(['isPostCalc']);
const opLens = R.lensPath(['operator']);
const dispLens = R.lensPath(['displayStr']);
// Digits
const appendDigit = R.curry((digit, big) => {
    return (0, big_js_1.default)(R.concat(big.toString(), digit));
});
exports.appendDigit = appendDigit;
const isPostCalcReset = R.ifElse(R.whereEq({ isPostCalc: true }), R.pipe(R.set(isPostCalcLens, false), R.set(currOpLens, (0, big_js_1.default)('0'))), R.identity);
const enterDigit = R.curry((digit, calcState) => {
    return R.pipe(isPostCalcReset, R.over(currOpLens, appendDigit(digit)))(calcState);
});
exports.enterDigit = enterDigit;
;
const binaryOps = {
    '+': R.curry((a, b) => a.plus(b)),
    '-': R.curry((a, b) => a.minus(b)),
    '*': R.curry((a, b) => a.times(b)),
    '/': R.curry((a, b) => a.div(b))
};
exports.binaryOps = binaryOps;
const applyBinFun = R.curry((fun, calcState) => {
    return R.set(currOpLens, fun(R.view(storedOpLens, calcState), R.view(currOpLens, calcState)), calcState);
});
exports.applyBinFun = applyBinFun;
const copyToStoredOp = (calcState) => {
    return R.set(storedOpLens, R.view(currOpLens, calcState), calcState);
};
const calculate = (calcState) => {
    return R.view(opLens, calcState) in binaryOps
        // Ramda pipe wasn't working with typescript so
        // went with Remeda
        ? RE.piped(R.set(isPostCalcLens, true), applyBinFun(binaryOps[R.view(opLens, calcState)]), copyToStoredOp)(calcState)
        : calcState;
};
exports.calculate = calculate;
const enterBinOp = R.curry((binOp, calcState) => {
    return R.pipe(calculate, R.set(opLens, binOp))(calcState);
});
exports.enterBinOp = enterBinOp;
;
const unaryOps = {
    '+/-': (a) => a.neg(),
    '%': (a) => a.div(100),
};
exports.unaryOps = unaryOps;
const enterUnaryOp = R.curry((op, calcState) => {
    return op in unaryOps
        ? R.set(currOpLens, unaryOps[op](R.view(currOpLens, calcState)), calcState)
        : calcState;
});
exports.enterUnaryOp = enterUnaryOp;
// Misc
const enterClear = R.curry((clear, calcState) => initState());
exports.enterClear = enterClear;
const enterEquals = R.curry((eq, calcState) => calculate(calcState));
exports.enterEquals = enterEquals;
// UI
const updDispStr = (calcState) => R.set(dispLens, R.view(currOpLens, calcState).toString(), calcState);
exports.updDispStr = updDispStr;
// Todo: Look into using Cond instead of switch
const getEnterFun = (str) => {
    let fun;
    switch (true) {
        case str in binaryOps:
            fun = enterBinOp(str);
            break;
        case str in unaryOps:
            fun = enterUnaryOp(str);
            break;
        case /^\d$/.test(str):
            fun = enterDigit(str);
            break;
        case str === '=':
            fun = enterEquals(str);
            break;
        case str === 'A/C':
            fun = enterClear(str);
            break;
        default:
            // Just return identity function if input string
            // is not digit, operator, equals, or clear
            fun = (calcState) => calcState;
    }
    ;
    return fun;
};
exports.getEnterFun = getEnterFun;
const updateUiCalcVal = R.curry((el, calcState) => {
    let calculatedValue = el.querySelector('.calculated-value');
    if (calculatedValue && calculatedValue instanceof HTMLElement) {
        calculatedValue.innerText = R.view(dispLens, calcState);
    }
    return calcState;
});
let el = document.querySelector('.calculator');
if (el && el instanceof HTMLElement) {
    el.addEventListener('click', (e) => {
        if (e.target
            && e.target instanceof HTMLElement
            && e.target.tagName === 'BUTTON')
            R.pipe(getEnterFun(e.target.innerText), updDispStr, updateUiCalcVal(el))(globalState);
    });
}
;
console.log('test');
//# sourceMappingURL=index.js.map