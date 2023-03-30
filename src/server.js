import express from "express";
import 'express-async-errors';
import routes from "./routes";
import notFound from "./middlewares/not-found";
import errorHandler from "./middlewares/error-handler";
import 'dotenv/config';
import cors from "cors";

const PORT = process.env.PORT || 1100;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello APi" });
});

app.use(routes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, err => {
  if (err) {
    console.log({ err });
    process.exit(1);
  }
  console.log(`Listening on port ${ PORT }`);
});