import 'dotenv/config'
import express from 'express';
import indexRouter from './routes/index'

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`))