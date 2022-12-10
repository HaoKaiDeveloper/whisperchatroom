const mongoose = require('mongoose')

const connect = function(url){
    mongoose.connect(url).then(()=>console.log('ConnectDB')).catch((err)=>console.log(err))
}

module.exports=connect