//
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//Routes
const productsRoutes = require("./routes/productsRoutes");
const shopsRoutes = require("./routes/shopsRoutes");
const usersRoutes = require("./routes/usersRoutes");

//Creat App Instence
const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes
app.use("/products", productsRoutes);
app.use("/shops", shopsRoutes);
app.use("/", usersRoutes);

app.use("/media", express.static("media"));

// Path not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost: ${PORT}`);
});
