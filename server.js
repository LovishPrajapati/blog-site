require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const morgon = require("morgan");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgon("tiny"));

const PORT = process.env.PORT || 5000;

app.use("/api", authRoutes);
app.use("/api/user", blogRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("blog-site-frontend/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "blog-site-frontend", "build", "index.html")
    );
  });
}
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
