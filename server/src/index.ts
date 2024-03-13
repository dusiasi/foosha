import express from 'express';
const app = express();
import config from './config';
import router from './router';
import cors from 'cors';

// this will allow cors
app.use(cors());

app.use(express.json());

app.use(router);

app.listen(config.port, () =>
  console.log(`Servers listening on port ${config.port}`)
);

export default app;
