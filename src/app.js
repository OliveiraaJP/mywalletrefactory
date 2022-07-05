import cors from "cors";
import express from "express";
import handleError from "./middlewares/handleErrorMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router)
app.use(handleError)

export default app;
