const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('vision');
let personCollection

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  personCollection = db.collection('person');
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addPerson(username, password) {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      username: username,
      password: passwordHash,
      token: uuid.v4(),
    };
    const result = await personCollection.insertOne(user);
    return user;
  } catch (ex) {
    console.log(ex);
  }
  
}

async function getPerson(id) {
  console.log('getPerson');
  const query = { username: id};
  const person = await personCollection.find(query).next();
  if (person){
    console.log('person: ', person.username);
  }
  return person;
}

async function addAttribute(id, attribute, value) {
  const query = { username: id};
  const update = { $set: { [attribute]: value } };
  const options = { upsert: true };
  await personCollection.updateOne(query, update, options);
}

async function getUserByToken(token) {
  user = await personCollection.findOne({ token: token });
  return user;
}

module.exports = { addPerson, getPerson, addAttribute, getUserByToken };
