import * as mongoose from "mongoose";

export default new mongoose.Schema({
    name: String,
    vessel: String,
    datetime: String,
    port: String,
    captain: String
});
