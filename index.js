/**
 * Created by xiaochuanzhi on 2017/2/19.
 */

var Filter=require('./Filter');


var fm=new Filter('./config/keyword.json');

var result=fm.hasKeyword('你妈逼',true);

console.log(result);
