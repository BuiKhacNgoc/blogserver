const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const BlogPosts = require('./BlogPosts');

app.get('/', function(red, res){
    res.send("Server is working!");
})
app.get('/posts', function (req, res){
    res.send(JSON.stringify(BlogPosts.BlogPosts));
})

app.listen(8080, function(){
    console.log("Server is running on 8080!");
});