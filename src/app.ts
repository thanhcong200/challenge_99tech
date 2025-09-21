import express from "express";
import productRoutes from "./routes/product.route";
import { HttpError } from "./common/http-error";
import { Request, Response, NextFunction } from "express";


const app = express();
const apiRouter = express.Router();

app.use(express.json());


apiRouter.use("/products", productRoutes);
app.use('/api', apiRouter);


// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
});


export default app;
