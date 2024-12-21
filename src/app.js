const express = require("express");
const connectDB = require("./configs/database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const apiLogger = require("./utils/apiLogger");
const globalErrorHandler = require("./utils/globalErrorHandler");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8888;

app.use(express.json());
app.use(cookieParser());
app.use(apiLogger);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(globalErrorHandler);

connectDB()
  .then(() => {
    console.log("Database connected!!");
    app.listen(port, () =>
      console.log(
        `JamaatTimingApp backend server is listening on ::: http://localhost:${port}`
      )
    );
  })
  .catch((err) => {
    console.error("Database connection failed!!");
    console.error(err.message);
  });
