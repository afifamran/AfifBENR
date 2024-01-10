const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
app.use(express.json())

//Paste from MongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://b022210075:Afif3007@cluster0.bedmxdz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/register', (req, res) => {
  client.db("AfifBENR").collection("users").insertOne
    (
      {
        "username": req.body.username,
        "password": req.body.password
      }
    );
  res.send("HELLO WORLD")
})

app.get('/student', async (req, res) => {
  console.log(req.headers.authorization)
  const token = req.headers.authorization.split(' ')
  console.log(tokens)
  
  jwt.verify(token[1], 'very-strong-password', function (err, decode) {
    if(err){
      res.status(401).send('Invalid token')
    }

    if(decoded.role == 'student'){
      client.db('assign').collection("student").findOne({username: decoded.user})
    }

    if(decoded.role == 'lecturer'){
      client.db('assign').collection("student").find({})
    }
  });
  
  console.log(err)
  console.log(decode)
});

app.post('/login', async (req,res) => {
  const { username, password } = req.body

  const token = jwt.sign({
    user: username,
    role: 'student'
  }, 'very-strong-password', { expiresIn: '1H'});

  res.send(token)
})

/*app.post('/register', (req, res) => {
  client.db("AfifBENR").collection("users").find
    ({
      "username": { $eq: req.body.username }
    }).toArray().then((result) => {
      if (result.lenght > 0) {
        res.status(400).send('username already exists')
      } else {
        client.db("AfifBENR").collection("users").insertOne(
          {
            "username": req.body.username,
            "password": req.body.password
          });
        res.send('register successfully')
      }
    });
})*/

//Hash 1
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const hash = bcrypt.hashSync(password, 10);
  client.db('AfifBENR').collection('users')
  .insertOne({"username": username, "password":password});

  res.send('login successful')
  console.log(hash)
})

app.patch('/profile', (req, res) => {
  client.db("AfifBENR").collection("users").updateOne(
    {
      "username": { $eq: req.body.username }
    },{
      $set: {
        "email":req.body.email },
      }).then(result => {
        res.send('Update Successfully')
      })
})

/*app.post('/login', (req, res) => {
    console.log(req.body.username, req.body.password)
    
    //Check if username invalid
    if(req.body.username != 'saya'){
        return res.status(400).send('Invalid User')
    }

    if(req.body.password != '123'){
        return res.status(400).send('Invalid Password')
    }

    res.send('login successfully')
})*/

//Efficient way
/*app.post('/login', (req, res) => {
  if (req.body.username != 'saya' || req.body.password != '123') {
    return res.status(400).send('Invalid User or Password')
  }
  res.send('login successfully')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/

//Hash 2
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  client.db('AfifBENR').collection('users').findOne({"username": username}).then((user) => {
    console.log(user)

    if(bcrypt.compareSync(password, user.password) == true){
      res.send("login succes");
    } else {
      res.send("login failed")
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})