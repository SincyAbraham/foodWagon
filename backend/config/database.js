const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbPORT = process.env.DB_PORT;
const mongoURI = `mongodb+srv://master:RandomPassword123@cluster0.e4pjvee.mongodb.net/food?retryWrites=true&w=majority`;
//const mongoURI = `mongodb+srv://nisaridas:Reset123@newmongodb.a7bmivf.mongodb.net/`;

module.exports =  {
    'host': dbHost,
    'user': dbUser,
    'password':dbPassword,
    'port' : dbPORT,
    'database' : dbDatabase,
    'mongoUri' : mongoURI
};
