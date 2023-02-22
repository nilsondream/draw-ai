import mongoose from 'mongoose'

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
        .then(() => console.log('Conectado a mongo'))
        .catch((err) => {
            console.error('No se pudo conectar con mongo')
            console.error(err);
        });
};

export default connectDB;