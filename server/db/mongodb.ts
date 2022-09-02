import {MongoClient} from 'mongodb'

const {
    MONGODB_URL = 'mongodb://root:example@localhost:27016',
    DATABASE_NAME = 'todos'
} = process.env;

export const client = new MongoClient(MONGODB_URL);

export const db = client.db(DATABASE_NAME);
