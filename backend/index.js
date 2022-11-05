import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"databasepassword132"
})

app.get("/", (req, res) => {
    res.json("Hello, this is the backend")
})

app.use(express.json())
app.use(cors())

app.get("/books", (req, res) => {
    const q = "SELECT * FROM nba.players"
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err)
        }
        
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO nba.players(`name`, `surname`, `team`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.surname,
        req.body.team,
    ]

    db.query(q, [values], (err, data) => {
        if(err) {
            return res.json(err)
        }

        return res.json("Book has been created sucessfully.")
    })
})

app.delete("/books/:id", (req, res) => {
    const playerId = req.params.id
    const q = "DELETE FROM nba.players WHERE id = ?"

    db.query(q, [playerId], (err, data) => {
        if (err) {
            return res.json(err);
        } 

        return res.json("Player has been deleted sucessfully.")
    })
})

app.put("/books/:id", (req, res) => {
    const playerId = req.params.id
    const q = "UPDATE nba.players SET `name` = ?, `surname` = ?, `team` = ? WHERE id = ?"

    const values = [
        req.body.name,
        req.body.surname,
        req.body.team,
    ]

    db.query(q, [...values, playerId], (err, data) => {
        if (err) {
            return res.json(err);
        } 

        return res.json("Player has been updated sucessfully.")
    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
})