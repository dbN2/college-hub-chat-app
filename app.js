const express = require('express');
const app = express();
const port = 3000;
const middleware = require('./middleware');
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('./database')
const session = require('express-session');


const server = app.listen(port, ()=>{
    console.log("Server listening on port " + port);
})

app.set("view engine", "pug");      // template engine
app.set("views", "views");          // use folder called views for views

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public"))); // full path to directory name -> uses the public folder for static css files

// hashes a session using this secret
app.use(session({
    secret: "roti canai",
    resave: true,
    saveUninitialized: false
}));


// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logoutRoutes');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');
const uploadRoute = require('./routes/uploadRoutes');
const searchRoute = require('./routes/searchRoutes');
const messagesRoute = require('./routes/messagesRoutes');

// API Routes
const postApiRoute = require('./routes/api/posts');
const usersApiRoute = require('./routes/api/users');
const chatsApiRoute = require('./routes/api/chats');


app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/posts", middleware.requireLogin, postRoute);
app.use("/profile", middleware.requireLogin, profileRoute);
app.use("/uploads", uploadRoute);
app.use("/search", middleware.requireLogin, searchRoute);
app.use("/messages", middleware.requireLogin, messagesRoute);

app.use("/api/posts", postApiRoute);
app.use("/api/users", usersApiRoute);
app.use("/api/chats", chatsApiRoute);


// when the root of the site is accessed, first check if user is logged in
app.get("/", middleware.requireLogin, (req, res, next)=>{

    // create some payload
    var payload = {
        pageTitle: "Home: College Hub",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    res.status(200).render("home", payload); // render home.pug as view passing payload

})