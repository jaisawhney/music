import 'dotenv/config';
import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import activePage from './middleware/activePage'

const app = express();
app.engine('handlebars', engine({
    helpers: {
        ifeq: (a: string, b: string, options: any) => {
            if (a === b) return options.fn(this);
            return options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(__dirname + '/public'));
app.use('/music', express.static(__dirname + '/music'));
app.use(activePage)
app.use(routes);

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));