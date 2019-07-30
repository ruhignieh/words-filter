/**
 * Created by xiaochuanzhi on 2017/2/19.
 */
import * as fs from "fs";
import * as path from "path";
import HashMap from "hashmap";


export class Filter {
    _keywordMap: HashMap<string, any>;
    _keywords: string[];
    _endTag: string = '\0';
    _symbolReg: RegExp = /[^(\w\u4e00-\u9fa5)]/;

    constructor(pathLike: fs.PathLike = '') {
        if (!pathLike) {
            pathLike = path.join(__dirname, '../resource/sensitive.txt');
        }

        this._keywords = fs.readFileSync(pathLike, {encoding: 'utf-8'}).toLowerCase().split(/\r?\n/);
        this._keywordMap = new HashMap();

        for (const datum of  this._keywords) {
            const charArray = datum.split('');
            const len = charArray.length;
            if (len <= 0) {
                continue
            }
            let subMap: HashMap<string, any> = this._keywordMap;
            for (const char of charArray) {
                if (subMap.has(char)) {
                    subMap = subMap.get(char);
                    continue;
                }
                const subMapTmp: HashMap<string, any> = new HashMap();
                subMap.set(char, subMapTmp);
                subMap = subMapTmp;
            }
            subMap.set(this._endTag, null);
        }

    }


    hasKeyword(text: string, rmSymbol: boolean = true) {
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

    isKeyword(text: string, rmSymbol: boolean = true) {
        if (rmSymbol) {
            text = text.replace(this._symbolReg, "");
        }
        text = text.toLowerCase();
        return this._keywords.indexOf(text) >= 0;

    }

}
