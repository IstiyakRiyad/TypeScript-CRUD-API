import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors'
import MessageResponse from './interfaces/MessageResponse';
import * as Middleware from './middlewares';

import apis from './api';

const app = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
    res.send({
        message: 'Hello World'
    });
});

app.use('/api/v1', apis);

app.use(Middleware.NotFound);
app.use(Middleware.ErrorMessage);

export default app;