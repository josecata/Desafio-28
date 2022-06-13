import mongoose from 'mongoose'
import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import passport from 'passport'
import passportLocal from 'passport-local'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bcrypt from 'bcryptjs'
import User from './User'
import dotenv from 'dotenv'
import { DatabaseUserInterface, UserInterface } from './Interfaces/UserInterface'
import { authentication } from './Routes/Authentication'

const LocalStrategy = passportLocal.Strategy

dotenv.config()

mongoose.connect(`${process.env.PART1STRING}${process.env.USERNAME}:${process.env.PASSWORD}${process.env.PART2STRING}${process.env.DB}${process.env.PART3STRING}`, (err) => {
	if (err) throw err
	console.log('Connected to Mongo')
})

// Middleware
const app = express()
app.use(express.json())
app.use(cors({ origin: `${process.env.FRONTEND}`, credentials: true }))
app.use(session({ secret: 'secretcode', resave: true, saveUninitialized: true }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// Passport
passport.use(
	new LocalStrategy(async (username: string, password: string, done) => {
		await User.findOne({ username: username })
			.catch((err) => {
				if (err) throw err
			})
			.then((user: DatabaseUserInterface) => {
				if (!user) return done(null, false)
				bcrypt
					.compare(password, user.password)
					.catch((err) => {
						if (err) throw err
					})
					.then((result: boolean) => {
						if (result === true) {
							return done(null, user)
						} else {
							return done(null, false)
						}
					})
			})
	})
)

passport.serializeUser((user: DatabaseUserInterface, cb) => {
	cb(null, user._id)
})

passport.deserializeUser(async (id: string, cb) => {
	await User.findOne({ _id: id })
		.catch((err) => {
			throw err
		})
		.then((user: DatabaseUserInterface) => {
			const userInformation: UserInterface = {
				username: user.username,
				isAdmin: user.isAdmin,
				id: user._id,
			}
			cb(null, userInformation)
		})
})

// Routes
app.use(authentication)

app.listen(process.env.PORT, () => {
	console.log('Server started')
})
