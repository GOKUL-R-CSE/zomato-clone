import mongoose from 'mongoose';

export default async () =>
{
    return mongoose.connect( process.env.MONGO_URI, )
};


// {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreatedIndex: true,
//         useFindAndModify: false,
// }