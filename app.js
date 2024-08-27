const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const uri = "mongodb+srv://khacngocptit:khacngocptit@blogserver.zwacg.mongodb.net/?retryWrites=true&w=majority&appName=blogserver"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(uri,   
    {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then(() => console.log('Connected to MongoDB Atlas'))
   .catch(err => console.error(err)); 
   
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);   
    

app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    
    const user = new User({ name, email, age });
    await user.save();
    res.json(user);
});

// Get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);   
    res.json(user);
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
    const { name, email, age } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
    res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

app.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});