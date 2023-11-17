const { MongoClient } = require('mongodb');
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

async function addPerson(person) {
  const result = await personCollection.insertOne(person);
  return result;
}

function getPerson(id) {
  const query = { id: id};
  return personCollection.find(query);
}

async function addAttribute(id, attribute, value) {
  const query = { id: id};
  const update = { $set: { [attribute]: value } };
  const options = { upsert: true };
  await personCollection.updateOne(query, update, options);
}

module.exports = { addPerson, getPerson, addAttribute };
