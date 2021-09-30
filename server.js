require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/user/:id/blog", blogRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
