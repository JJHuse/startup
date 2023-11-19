const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('vision');
const personCollection = db.collection('person');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addPerson(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  const result = await personCollection.insertOne(user);
  return user;
}

async function getPerson(id) {
  console.log('getPerson');
  const query = { username: id};
  const person = await personCollection.find(query).next();
  console.log('person: ', person);
  return person;
}

async function addAttribute(id, attribute, value) {
  const query = { id: id};
  const update = { $set: { [attribute]: value } };
  const options = { upsert: true };
  await personCollection.updateOne(query, update, options);
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

module.exports = { addPerson, getPerson, addAttribute, getUserByToken };
