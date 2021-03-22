const express = require("express");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();


dotenv.config({ path: "./.env" });

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true});
    // console.log(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
