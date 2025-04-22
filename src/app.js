const express = require("express");
const connectDB = require("./configs/database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const apiLogger = require("./utils/apiLogger");
const globalErrorHandler = require("./utils/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();
const { PORT, BASE_URL } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(apiLogger);

// static path for images
app.use("/api/public", express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(globalErrorHandler);

connectDB()
  .then(() => {
    console.log("Database connected!!");
    app.listen(PORT, () =>
      console.log(
        `JamaatTimingApp backend server is listening on ::: ${BASE_URL}`
      )
    );
  })
  .catch((err) => {
    console.error("Database connection failed!!");
    console.error(err.message);
  });
