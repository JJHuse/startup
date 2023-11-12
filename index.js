const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Internal endpoints go here
apiRouter.post('/person', (req, res) => {
  const id = req.body.id;
  console.log(`POST /api/person/${id}`);
  add_person(id);
  const person = get_person(id);
  res.send(person);
});
apiRouter.get('/person/:id', (req, res) => {
  const id = req.params.id;
  console.log(`GET /api/person/${id}`);
  const person = get_person(id);
  res.send(person);
});
apiRouter.post('/person/:id/attribute', (req, res) => {
  const id = req.params.id;
  const attribute = req.body.attribute;
  const value = req.body.value;
  console.log(`POST /api/person/${id}/attribute/${attribute}`);
  add_attribute(id, attribute, value);
  const person = get_person(id);
  res.send(person);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let people = {}
function get_person(id){
    return people[id]
}
function add_person(id){
    people[id] = {}
}
function add_attribute(id, attribute, value){
    people[id][attribute] = value
}