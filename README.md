# words-filter



words-filter for nodejs



## Install

    npm install words-filter -save
    

## Example

把敏感词保存在txt文件，每个敏感词一行。 e.g. sensitive.txt

项目目录

    your-project
    | ____ node_modules
    | ____ config
    |      |____sensitive.txt
    | ____ package.json
    |
    *.*
    
***
    
    var Filter=require('words-filter');
    
    var wf=new Filter();
    
    fm.hasKeyword('fuck-u',true);//return true
    
    fm.isKeyword('fuck-u',true);//return false
    
