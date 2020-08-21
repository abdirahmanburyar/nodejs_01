module.exports = async (mongoose) => {
    return await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 
    }, err => {
        if(!err){
            console.log(`mongodb is connected as :) ${mongoose.connection.host}`)
        }else {
            throw new Error(err)
        }
    })
}