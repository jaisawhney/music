import 'dotenv/config';
import express from 'express';
import {engine} from 'express-handlebars';
import routes from './routes'


const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'))
app.use(routes)

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`))


