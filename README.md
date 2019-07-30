# words-filter



words-filter for nodejs



## Install

    npm install words-filter -save
    

## Example
    
***
    
    const Filter=require('words-filter').Filter;
    
    const filter=new Filter();
    
    filter.hasKeyword('fuck u',true);//return true
    
    filter.isKeyword('fuck u',true);//return false
    
