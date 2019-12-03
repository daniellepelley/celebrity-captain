import * as mongoose from 'mongoose';
import config from "../config";

const init = () => {
    mongoose.connect(config.mongoDbConnection, {useNewUrlParser: true});
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export default { init }