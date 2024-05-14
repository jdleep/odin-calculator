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
exports.enterCalcDigit = exports.appendDigit = void 0;
const big_js_1 = __importDefault(require("big.js"));
const R = __importStar(require("ramda"));
;
let calcState = {
    operators: {
        storedOperand: (0, big_js_1.default)('0'),
        currOperand: (0, big_js_1.default)('0')
    },
    operator: '',
    displayStr: '0'
};
// Functions for entering digits
const appendDigit = R.curry((digit, big) => {
    return (0, big_js_1.default)(R.concat(big.toString(), digit));
});
exports.appendDigit = appendDigit;
const currOpLens = R.lensPath(['operators', 'currOperand']);
const enterCalcDigit = R.curry((digit, calcState) => R.over(currOpLens, appendDigit(digit), calcState));
exports.enterCalcDigit = enterCalcDigit;
// Reset calculator
const calcReset = () => ({
    storedOperand: (0, big_js_1.default)('0'),
    operator: '',
    displayOperand: (0, big_js_1.default)('0'),
    displayStr: '0'
});
//# sourceMappingURL=index.js.map