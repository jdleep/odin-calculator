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
exports.applyBinFun = exports.enterUnaryOp = exports.unaryOps = exports.binaryOps = exports.enterCalcDigit = exports.appendDigit = exports.initState = void 0;
const big_js_1 = __importDefault(require("big.js"));
const R = __importStar(require("ramda"));
;
;
// Initialize calc state
const initState = (calc) => ({
    operands: {
        storedOperand: (0, big_js_1.default)('0'),
        currOperand: (0, big_js_1.default)('0')
    },
    operator: '',
    displayStr: '0',
    postCalc: false
});
exports.initState = initState;
let calcState = initState();
const currOpLens = R.lensPath(['operands', 'currOperand']);
const storedOpLens = R.lensPath(['operands', 'storedOperand']);
const postCalcLens = R.lensPath(['postCalc']);
const opLens = R.lensPath(['operator']);
const dispLens = R.lensPath(['displayStr']);
// Functions for entering digits
const appendDigit = R.curry((digit, big) => {
    return (0, big_js_1.default)(R.concat(big.toString(), digit));
});
exports.appendDigit = appendDigit;
const postCalcReset = R.ifElse(R.whereEq({ postCalc: true }), R.pipe(R.set(postCalcLens, false), R.set(currOpLens, (0, big_js_1.default)('0'))), R.identity);
const enterCalcDigit = R.curry((digit, calcState) => {
    return R.pipe(postCalcReset, R.over(currOpLens, appendDigit(digit)))(calcState);
});
exports.enterCalcDigit = enterCalcDigit;
;
const binaryOps = {
    '+': R.curry((a, b) => a.plus(b)),
    '-': R.curry((a, b) => a.minus(b)),
    '*': R.curry((a, b) => a.times(b)),
    '/': R.curry((a, b) => a.div(b))
};
exports.binaryOps = binaryOps;
const calculate = (calcState) => {
    R.view(opLens, calcState) in binaryOps
        ? applyBinFun(binaryOps[R.view(opLens, calcState)], calcState)
        : calcState;
};
const applyBinFun = (fun, calcState) => {
    return R.set(currOpLens, fun(R.view(storedOpLens, calcState), R.view(currOpLens, calcState)), calcState);
};
exports.applyBinFun = applyBinFun;
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
//# sourceMappingURL=index.js.map