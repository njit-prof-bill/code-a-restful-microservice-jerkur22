const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let usersDB = [];
let userindex = 0;

app.post('/users',(req,res) => {
    if(!req.body){
        return res.status(400).json({"Error":"No body given, incorrect request"})
    }
    if(!req.body.name){
        return res.status(400).json({"Error": "No name given in request body"})
    }
    if(!req.body.email){
        return res.status(400).json({"Error": "No email given in request body"})
    }
    const name  = req.body.name;
    const email = req.body.email;
    
    let newuser = {
        id: userindex,
        name,
        email
    };
    userindex = userindex + 1;
    usersDB.push(newuser);
    return res.status(201).json(newuser)
})

app.get('/users/:id',(req,res) => {
    if(!usersDB.find(user => user.id == req.params.id)){
        return res.status(404).json({"Error":"ID not found"})
    }
    const userfound = usersDB.find(user => user.id == req.params.id)
    res.send(userfound)
})

app.put('/users/:id', (req, res) => {
    if(!usersDB.find(user => user.id == req.params.id)){
        return res.status(404).json({"Error":"ID not found"})
    }
    const userfound = usersDB.find(user => user.id == req.params.id)
    if(!req.body){
        return res.status(400).json({"Error":"No body given, incorrect request"})
    }
    if(!req.body.name){
        return res.status(400).json({"Error": "No name given in request body"})
    }
    if(!req.body.email){
        return res.status(400).json({"Error": "No email given in request body"})
    }
    userfound.name = req.body.name;
    userfound.email = req.body.email;
    res.send(userfound)
});

app.delete('/users/:id', (req, res) => {
    const userind = usersDB.findIndex(user => user.id == req.params.id);
    if(userind == -1){
        return res.status(404).json({"Error":"No user with that id found"})
    }
    usersDB.splice(userind,1);
    res.status(204).send()
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing