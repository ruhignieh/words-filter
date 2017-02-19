/**
 * Created by xiaochuanzhi on 2017/2/19.
 */
var fs = require('fs');
var HashMap = require('hashmap').HashMap;
var path = require('path');

var Filter = function (filepath) {
    this.data = fs.readFileSync(path.join(__dirname,'../../'+filepath), {encoding: 'utf-8'}).split(/\r?\n/);
    // this.data = fs.readFileSync('sensitive.txt', {encoding: 'utf-8'}).split(/\r?\n/);
    this.keywordMap = this.buildMap();
};
Filter.prototype.endTag='\0';

Filter.prototype.buildMap = function () {
    var keywordMap = new HashMap();

    if (!this.data) {
        return null;
    }
    for (var i = 0; i < this.data.length; i++) {
        var charArr = this.data[i].split('');
        var len = charArr.length;
        if (len > 0) {
            var subMap = keywordMap;
            for (var k = 0; k < len - 1; k++) {
                if (obj = subMap.get(charArr[k])) {
                    subMap = obj;
                    continue;
                }
                var subMapTmp = new HashMap();
                subMap.set(charArr[k], subMapTmp);
                subMap = subMapTmp;
            }

            var obj = subMap.get(charArr[len - 1]);
            if (obj) {
                obj.set(this.endTag, null);
            }
            var subMapTmp = new HashMap();
            subMapTmp.set(this.endTag, null);
            subMap.set(charArr[len - 1], subMapTmp);
        }
    }
    return keywordMap;
};

Filter.prototype.hasKeyword=function (text,rmSymbol) {
    if (text == null || text == undefined){
        return false;
    }

    if (rmSymbol){
        text=text.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5)]|[/(/)]/g,"");
    }
    text=text.toLowerCase();
    var charArr = text.split('');
    var len = charArr.length;
    for (var i = 0; i < len; i++) {
        var index = i;
        var sub = this.keywordMap.get(charArr[index]);
        while (sub != null) {
            if (sub.has(this.endTag)) {
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
};

Filter.prototype.isKeyword=function (text,rmSymbol) {
    if (rmSymbol){
        text=text.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5)]|[/(/)]/g,"");
    }
    text=text.toLowerCase();
    if (this.data.indexOf(text)>=0){
        return true;
    }
    return false;
};


module.exports = Filter;