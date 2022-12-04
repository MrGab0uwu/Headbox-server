import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { passportConf } from './passportConfig.js';

import indexRoutes from './routes/index.routes.js';
// Auth Route
import adminRoutes from './routes/admin.routes.js';

// School Routes
import studentsRoutes from './routes/students.routes.js';
import teachersRoutes from './routes/teachers.routes.js';
import careersRoutes from './routes/careers.routes.js';
import subjectsRoutes from './routes/subjects.routes.js';

const app = express();

// app.use(cors());
app.use(express.json());

mongoose.connect(
	'mongodb+srv://master:YHy8au@adminsdb.lprm0fk.mongodb.net/?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Mongoose Is Connected');
	}
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: 'https://headbox.netlify.app', // URL de donde nos conectaremos con react
		credentials: true,
	})
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
	})
);
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(passport.initialize());
app.use(passport.session());
passportConf(passport);

app.use(adminRoutes);

app.use(indexRoutes);
app.use(studentsRoutes);
app.use(teachersRoutes);
app.use(careersRoutes);
app.use(subjectsRoutes);

app.listen(PORT);
console.log(`Server on port ${PORT}`);
