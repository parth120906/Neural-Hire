import mongoose  from "mongoose";

const ConnectDB=async()=>{
    try{
let conn = await mongoose.connect(process.env.MONGO_URI)

console.log(`server connected Succesfully : ${conn.connection.name}`)
    } catch(error){
        console.log(`DB conneection Failed${error.message}`)

    }
}

export default ConnectDB