const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const dbConnection = require("./Db/conectedDb");
const authRoute = require("./Routes/autRoute");
const userRoute = require("./Routes/userRoute");
const categoryRoute = require("./Routes/categoryRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");
const app = express();
// concted to db
dbConnection();
const cors = require("cors");
app.use(cors());

const compression = require("compression");
app.use(compression());

app.use(express.json());

//mount route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT} ...`);
});
