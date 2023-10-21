import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import TasksDAO from './dao/tasksDAO.js';

dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongoUsername = process.env['MONGO_USERNAME'];
const mongoPassword = process.env['MONGO_PASSWORD'];
const uri = ''; // MongoDB connection uri using mongoUsername and mongoPassword
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    await TasksDAO.injectDB(client);
    
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
});