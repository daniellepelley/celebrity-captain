if (!process.env.dbconnection) {
    throw "You will need to set a mongo db connection in environment settings for 'dbconnection', eg dbconnection=<MONGODB UTL>"
}

export default {
    mongoDbConnection: process.env.dbconnection
}