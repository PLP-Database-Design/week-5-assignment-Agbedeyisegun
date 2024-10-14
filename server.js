const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const server = express();
const cors = require("cors");
const { type } = require("os");
// const db = require('./database');
server.use(cors());
// server.use(express.json());
dotenv.config()



const db = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    database: process.env.DB_Name,
    password: process.env.DB_Password,
    port: process.env.Port
});

db.connect((error) => {
    if(error) {
        return console.log('error connecting to database', error.stack);
    }
    console.log('Connected Successfully:', db.threadId)
});

server.get("/", (req,res) => {
        res.setHeader('Content-Type', 'text/plain')
        res.status(200).send('You are Connected to home page')
        
});

server.get("/login", (req,res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('This is the login page')
});



//This throw error if not in the right path

server.use((error, req, res, next) =>{
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).json({
        message:'Error Loading Website',
        error: error.stack
    })
});



// Question 1 goes here







server.get("/patients_info", (req,res) => {
    const sql = `
        SELECT patient_id, first_name, last_name, date_of_birth  
        FROM patients`
     db.query(sql, (error, data) => {
        if(error){
            console.log('error retrieving data', error)
            return res.status(500).send('error retrieving data')
        }
        console.log('data retrieved successfully')
        res.status(200).send({
            message: ('Data Retrieved Successfully!'),
            data: data
        })
     })
})











server.get("/patients", (req,res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS patients(
        id INT PRIMARY KEY AUTO_INCREMENT, 
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL, 
        date_of_birth DATE NOT NULL);`
     db.query(sql, (error, data) => {
        if(error){
            console.log('error Creating patients data', error)
            return res.status(500).send('Error Creating patients table')
        }
        console.log('data created successfully')
        res.status(200).json('Providers Table Created Successfully!')
     })
})









// Question 2 goes here





server.get("/providers_info", (req,res) => {
    const sql = `
        SELECT first_name, last_name, provider_specialty  
        FROM providers`
     db.query(sql, (error, data) => {
        if(error){
            console.log('error retrieving data', error)
            return res.status(500).send('error retrieving data')
        }
        console.log('data retrieved successfully')
        res.status(200).json({
            message: ('Data Retrieved Successfully!'),
            data: data
        })
     })
})






// block of code retrieve the providers info from the database to the browser


server.get("/providers", (req,res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS providers( 
        first_name VARCHAR(255) NOT NULL, 
        last_name VARCHAR(255) NOT NULL,
        providers_specialty VARCHAR(255) NOT NULL);`
     db.query(sql, (error, results) => {
        if(error){
            console.log('Error Creating providers data', error.stack)
            return res.status(500).send('error creating providers table')
        }
        console.log('providers table created successfully:', db.threadId)
        res.status(200).send('Providers Table Created Successfully!')
     })
})


// Question 3 goes here


// This block of code retrieve the patients table order by first name



server.get("/patientsFirstName", (req,res) => {
    const sql =
        `SELECT * FROM providers
        ORDER BY first_name;`
     db.query(sql, (error, results) => {
        if(error){
            console.log('Error retrieving Patients First Name column', error.stack)
            return res.status(500).send('Error retrieving Patients First Name column')
        }
        console.log('Patients First Name column retrieve successfully:')
        res.status(200).json({
            message:'Patients First Name column retrieve successfully:',
            result: results
        })
     })
})



// Question 4 goes here

// This block of code retrieve data from the providers table order by providers specialty

server.get("/providers_specialty", (req,res) => {
    const sql =
        `SELECT * 
        FROM providers
        ORDER BY provider_specialty;`
     db.query(sql, (error, results) => {
        if(error){
            console.log('Error retrieving provider_specialty column', error.stack)
            return res.status(500).send('Error retrieving provider_specialty column')
        }
        console.log('provider_specialty column retrieve successfully:')
        res.status(200).json({
            message:'provider_specialty column retrieve successfully:',
            results: results
        })
     })
})



// This connect the server on port 3000 

const Port = 3000
server.listen(Port, (error) => {
  if (error) {
    return console.log(`Error Connecting to https://localhost on ${Port}`);
  }
  console.log(`connected to https://localhost on ${Port}`);
});
