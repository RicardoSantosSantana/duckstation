var fs = require('fs');
var path = require('path');
const  data = require('./data.js')

const renameFiles = {
    pathROM:"",    
    pathImage:"",
    removeSpaces: function(text){ return text.replaceAll(' ','').replaceAll("-","")  },    
    to:function(originPath,filename){ return path.join(originPath,this.removeSpaces(filename)) },    
    from:function (originPath,filename) { return path.join(originPath,filename) },         
    info:function(){
       return data.map(el=>{        
        return {
            "fromROM":this.from(this.pathROM,el.path),
            "toROM":this.to(this.pathROM,el.path),
            "fromImage":this.from(this.pathImage,el.image),
            "toImage": this.to(this.pathImage,el.image) 
        }             
        }) 
    },
    removeSpaceROMandImage:function(){       
        this.info().map(el=>{   
            if(el){
                fs.renameSync( el.fromROM, el.toROM);
                fs.renameSync( el.fromImage, el.toImage);          
            }
        }) 
        console.log("All files have been changed!")
    }
}
 
module.exports = renameFiles; 