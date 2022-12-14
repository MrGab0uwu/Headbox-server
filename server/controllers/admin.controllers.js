import { User } from '../user.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';

export const login =
	('/login',
	(req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) throw err;
			if (!user) res.send('No User Exists');
			else {
				req.logIn(user, (err) => {
					if (err) throw err;
					res.send('Successfully Authenticated');
					console.log(req.user);
				});
			}
		})(req, res, next);
	});

export const register =
	('/register',
	(req, res) => {
		User.findOne({ username: req.body.username }, async (err, doc) => {
			if (err) throw err;
			if (doc) res.send('User Already Exists');
			if (!doc) {
				const hashedPassword = await bcrypt.hash(req.body.password, 10);

				const newUser = new User({
					username: req.body.username,
					password: hashedPassword,
				});
				await newUser.save();
				res.send('User Created');
			}
		});
	});

export const user =
	('/user',
	(req, res) => {
		res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
	});

export const logout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
	console.log('logout called');
};
