import express from 'express'
import fs from 'fs' 
import { mysqldb } from '../server.js'
import { spawn } from 'child_process'
import {PythonShell} from 'python-shell'
import {auth} from '../utils/verifytoken.js'

const allMoviesRouter = express.Router()

allMoviesRouter.post('/getUser' , auth , async(req,res) => {
    mysqldb.query("SELECT * FROM users WHERE uId = ?" , req.user.id , (err,data) => {
        if(err) return res.status(500).send({err})
        res.status(200).json(data)
    })
})

allMoviesRouter.post('/recommend' , async(req,res) => {
    const {movie , id } = req.body
    mysqldb.query("UPDATE users SET lastMovie = ? WHERE uId = ?" , [movie , id] , (err,data) => {
        if(err) return res.send({err}).statusCode(400)
    })
    let options = {
        mode : 'text' , 
        pythonOptions : ['-u'] , 
        args : [movie]
    }
    PythonShell.run('./recommender.py' , options ,  (err,data) => {
        if(err) console.log('This is in recommend : ' ,  err)
        mysqldb.query("UPDATE users SET recommendations = ? WHERE uId = ?" , [data[0] , id] , (err,sql) => {
            if(err) return res.status(500).send({err})
            return res.send(data[0])
        })
    })
})

export default allMoviesRouter