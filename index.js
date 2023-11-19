const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

//TODO: check for duplicate username

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

app.use(cookieParser());
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Internal endpoints go here
apiRouter.post('/create', async (req, res) => {
  const username = req.body.username;
  const passwordHash = req.body.password;
  console.log(`POST /api/create/${username}`);
  if (await DB.getPerson(username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else{
    const person = add_person(username, passwordHash);

    setAuthCookie(res, person.token);

    res.send({
      id: person._id,
    });
  }
});

apiRouter.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`GET /api/login/${username}`);
  const person = await get_person(username);
  if (person){
    if (await bcrypt.compare(password, person.password)) {
      setAuthCookie(res, person.token);
      res.send(person);
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });

});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.post('/person/:id/attribute', async (req, res) => {
  const id = req.params.id;
  const attribute = req.body.attribute;
  const value = req.body.value;
  console.log(`POST /api/person/${id}/attribute/${attribute}`);
  add_attribute(id, attribute, value);
  const person = await get_person(id);
  res.send(person);
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function get_person(id){
  console.log('get_person');
  // Should there be an await in here?
  const person = DB.getPerson(id);
  return person;
}
function add_person(username, password){
  return DB.addPerson(username, password);
  // people[id] = {}
}
function add_attribute(id, attribute, value){
  DB.addAttribute(id, attribute, value);
}