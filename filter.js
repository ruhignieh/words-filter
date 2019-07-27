"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by xiaochuanzhi on 2017/2/19.
 */
const fs = __importStar(require("fs"));
const hashmap_1 = __importDefault(require("hashmap"));
class Filter {
    constructor(path) {
        this._endTag = '\0';
        this._symbolReg = /[^(\w\u4e00-\u9fa5)]/;
        this._keywords = fs.readFileSync(path, { encoding: 'utf-8' }).toLowerCase().split(/\r?\n/);
        this._keywordMap = new hashmap_1.default();
        for (const datum of this._keywords) {
            const charArray = datum.split('');
            const len = charArray.length;
            if (len <= 0) {
                continue;
            }
            let subMap = this._keywordMap;
            for (const char of charArray) {
                if (subMap.has(char)) {
                    subMap = subMap.get(char);
                    continue;
                }
                const subMapTmp = new hashmap_1.default();
                subMap.set(char, subMapTmp);
                subMap = subMapTmp;
            }
            subMap.set(this._endTag, null);
        }
    }
    hasKeyword(text, rmSymbol = true) {
        if (!text) {
            return false;
        }
        if (rmSymbol) {
            text = text.replace(this._symbolReg, "");
        }
        text = text.toLowerCase();
        var charArr = text.split('');
        var len = charArr.length;
        for (var i = 0; i < len; i++) {
            var index = i;
            var sub = this._keywordMap.get(charArr[index]);
            while (sub != null) {
                if (sub.has(this._endTag)) {
                    return true;
                }
                index++;
                if (index >= len) {
                    return false;
                }
                sub = sub.get(charArr[index]);
            }
        }
        return false;
    }
    ;
    isKeyword(text, rmSymbol = true) {
        if (rmSymbol) {
            text = text.replace(this._symbolReg, "");
        }
        text = text.toLowerCase();
        return this._keywords.indexOf(text) >= 0;
    }
    ;
}
exports.default = Filter;
