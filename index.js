const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
 res.send('Hello World!')
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
app.post('/login', (req, res) => {
    if(req.body.username != 'saya' || req.body.password != '123'){
        return res.status(400).send('Invalid User or Password')
    }
    res.send('login successfully')
})

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})
