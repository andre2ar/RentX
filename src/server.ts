import express, {NextFunction, Request, Response} from 'express';
import "express-async-errors";
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import './database';

import "./shared/container";

import router from "./routes";
import swaggerFile from './swagger.json';
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(globalErrorHandler);

const port = process.env.PORT ?? 3333;
app.listen(port, () => console.log(`Server is running on port ${port}`));
