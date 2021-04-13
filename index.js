const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const varMiddleware = require('./middleware/variables')

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

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("6065455b07673c2bc8b022e0");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(varMiddleware)

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
    // console.log(process.env.MONGO_URI);

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "alex@gmail.com",
        name: "Alex",
        cart: { items: [] },
      });
      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
