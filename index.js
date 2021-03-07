const express = require("express");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home")
const coursesRoutes = require("./routes/courses")
const addRoutes = require("./routes/add")

const app = express();


app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)



 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
