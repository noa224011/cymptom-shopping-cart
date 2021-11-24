import express from "express";
import cors from "cors";
import morgan from "morgan";
import autocompleteRoutes from "./api/routes/autocomplete";
import productsRoutes from "./api/routes/products";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/autocomplete", autocompleteRoutes);
app.use("/api/getProduct", productsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});

app.use(
  (
    error: { status: any; message: any },
    req: any,
    res: {
      status: (arg0: any) => void;
      json: (arg0: { error: { message: any } }) => void;
    },
    next: any
  ) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  }
);

export default app;
