const express = require("express");
const exphbs = require("express-handlebars");
const csrf = require("csurf")
const flash = require("connect-flash")
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session)
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const app = express();

dotenv.config({ path: "./.env" });

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");

 const store = new MongoStore({
   collection: 'sessions',
   uri: process.env.MONGO_URI

 })

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store
  })
);
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
   

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
