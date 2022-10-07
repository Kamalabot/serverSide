
//when the url is triggered with the format http://127.0.0.1:3000/details?named=chec
function getName(request, response){
    var url = request.query; //select the 
    if(url.name){
        var reply = `Your detail is ${JSON.stringify(url)}`
    } else {
        var reply = `Your detail is missing.`
    }
    response.send(reply)
}

//when the url is triggered the
function getLocation(request, response){
    var data = request.params;
    var reply = '';
    if(data){
        reply += `latitude :${data.lat}, longitude:${data.long}`;
        reply += `You are ${Math.random()*10} mins from here.`
    }
    response.send(reply)
}
exports.getName = getName
exports.getLocation = getLocation