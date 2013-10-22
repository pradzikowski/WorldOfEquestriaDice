//// poligon testowy dla nowych technologii
//userObject = new Object(){
//    json: null,
//    
//    
//    
//    getAtribute : function(atributeName){
//        var atrr = atributeName;
//        // get atrr
//        return atrr;
//    },
//};
//
//user1 = new userObject();
//
//



//Prototype WoEDiceLoader

HtmlWoEDiceElement = function(){
    this.element = null,
    this.debug = 3; //0 = setAs, 1 = with atr , 2 = only Element, 3 = null
    this.childLib = new Array();
    
    this.construct = function(tagName, attributeArray){
        this.element = document.createElement(tagName);
        this.debug = 2;
        this.changeAttributes(attributeArray);
        
    },
    
    this.addChild = function(elObj,idName){
        this.element.insertBefore(elObj, this.element.firstChild); // TODO do zmiany :< bo jquery
        this.childLib[idName] = elObj;
    },
            
    this.createChild = function(tagName,idName,attributeArray){
        obj = new HtmlWoEDiceElement();
        obj.construct(tagName,attributeArray);
        this.addChild(obj.get(),idName);
    }
    
    this.set = function(elId) {this.element = document.getElementById(elId);},
    
    this.setAs = function(tagName, number) {this.debug = 0, this.element = document.getElementsByTagName(tagName)[number]},
    this.get = function(){return this.element;},
    this.getChild = function(id){return this.element.getChild(id);}
    this.getChildFromLib = function(id){return this.childLib[id];}     
    this.changeAttributes = function(atributeArray){
        for(i = 0;i<atributeArray.length;i++){
            this.debug = 1;
            this.element.setAttribute(atributeArray[i].atrName, atributeArray[i].atrVal);   
        }
    },
    
    this.destroy = function(){ }// TODO}
};

HtmlWoEDiceForm = function(id){
    this.element = new HtmlWoEDiceElement();
    this.element.construct("form",[{atrName: "id", atrVal: id}]);
    
    this.get = function(){return this.element.get();};
    
    this.createNewInput = function(idName,attributeArray){
        this.element.createChild("input", idName,attributeArray);
    }
    this.inputLib = new Array();
    this.addToInputLib = function(idName){}; //TODO
    this.getValue = function(id){};
    this.getAllValues = function(){};
};


