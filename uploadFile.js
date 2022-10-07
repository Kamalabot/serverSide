const fs = require('fs')

function uploadFile (req, res, next){
    console.log(req.file)
    const upDb= fs.readFileSync('uploadDatabase.json')
    
    if(upDb.length == 0){
        var upDbObj = new Object()
        if(!upDbObj.hasOwnProperty(req.file.originalname)){
            upDbObj[req.file.originalname] = `./uploads/${req.file.filename}`;
        }
            
        const newUpDb = JSON.stringify(upDbObj,null,2);
        
        fs.writeFileSync('uploadDatabase.json',newUpDb,()=>{
            console.log('Done Writing')
        })
    } else {
        const upDbObj = JSON.parse(upDb)
        
        if(!upDbObj.hasOwnProperty(req.file.originalname)){
            upDbObj[req.file.originalname] = `./uploads/${req.file.filename}`;
        }
        
        const newUpDb = JSON.stringify(upDbObj,null,2);
        
        fs.writeFileSync('uploadDatabase.json',newUpDb,()=>{
            console.log('Done Writing')
        })
    }
}

function listFile(req,res){
    const upDb= fs.readFileSync('uploadDatabase.json')
    const upDbString = JSON.parse(upDb)
    //console.log(upDbString)
    res.send(upDbString)
}

function filePath(req,res){
    var data = req.params;
    console.log(data)
    const textD= fs.readFile(`./uploads/${data.filePath}`,(err,data)=>{
        // const text = data.toString()
        var data = {
            text : data.toString()
        }
        res.send(data)
    })   
}

exports.uploadFile = uploadFile
exports.listFile = listFile
exports.filePath = filePath