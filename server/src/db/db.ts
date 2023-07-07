import mongoose from "mongoose"


const connectDb=()=>{
    const dbUrl = 'mongodb://127.0.0.1:27017/etedb';
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
    db.once('open', function() {
      console.log('MongoDB veritabanına bağlandı.');
    });
}


export {connectDb}