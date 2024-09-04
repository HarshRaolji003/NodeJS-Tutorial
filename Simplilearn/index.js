const express  = require('express')
const app = express()
const port = 3000

// parse JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let movies =[
    {
        id:"1",
        title:"Inception",
        director: "Christopher Nolan",
    },
    {
        id:'2',
        title: "The Irishman",
        director: "Martin Scorsese"
    },

];

// get all the movie list in the form of JSON
app.get('/movies',(req,res)=>{
    res.json(movies)

});

// add movie to the list
app.post('/movies',(req,res)=>{
    const movie = req.body;

    console.log(movie);
    movies.push(movie);
    res.send('Movie is added to the list!');
});

// search for movie
app.get('/movies/:id',(req,res)=>{
    const id=req.params.id;

    for(let movie of movies){
        if(movie.id === id){
            res.json(movie)
            return
        }
    }

    res.status(404).send("Movies not Found!")
});

// remove the movie from the list
app.delete('/movies/:id',(req,res)=>{
    const id=req.params.id;

    movies=movies.filter(movie=>{
        if(movie.id !==id){
            return true
        }
        return false
    })

    res.send('Movie is deleted')
})

// set server to listen at port
app.listen(port,()=> console.log(`Server listening at ${port}`));