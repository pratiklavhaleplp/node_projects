const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0";

let client = new MongoClient(uri);

// const Run = new Promise((resolve, reject) => {
//     try {
//         const database = client.db('movieData');
//         const movies = database.collection('movies');
//         const movie = movies.findOne();
//         resolve(movie);
//     } catch (err) {
//         reject(err);
//         client.close();
//     }
// });

// Run.then(res => {console.log(res); client.close()}).catch(err => { console.log(err) });

function findDocument(dbName, collectionName, query = {}) {
    return new Promise((resolve, reject) => {
        try {
            client = new MongoClient(uri);
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            const data = collection.findOne(query);
            resolve(data);
        } catch (err) {
            reject(err);
            client.close();
        }
    });
}

function findDocumentsPaginated(dbName, collectionName, query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            client = new MongoClient(uri);
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            const cursor = collection.find(query).skip(0).limit(10);
            const data = []
            for await (const doc of cursor) {
                data.push(doc);
            }
            resolve(data);
        } catch (err) {
            reject(err);
            client.close();
        }
    });
}

function insertOneDocument(dbName, collectionName, query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            client = new MongoClient(uri);
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            const data = collection.insertOne(query);
            resolve(data);
        } catch (err) {
            reject(err);
            client.close();
        }
    });
}

function updateOneDocument(dbName, collectionName, filter ,query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            client = new MongoClient(uri);
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            const data = collection.updateOne(filter, query);
            resolve(data);
        } catch (err) {
            reject(err);
            client.close();
        }
    });
}

function deleteOneDocument(dbName, collectionName ,query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            client = new MongoClient(uri);
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            const data = collection.deleteOne(query);
            resolve(data);
        } catch (err) {
            reject(err);
            client.close();
        }
    });
}


module.exports = {
    connection: client,
    findDocument,
    findDocumentsPaginated,
    insertOneDocument,
    updateOneDocument,
    deleteOneDocument
}
