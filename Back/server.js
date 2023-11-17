import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "database-1.c4hagwzmruqp.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "carlos99",
    database: "pc3"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM contactos";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.post('/contactos', (req, res) => {
    const sql = "INSERT INTO contactos (`nombre`,`apellidos`,`correo`,`fecha_nac`,`foto`) VALUES (?)";
    const values = [
        req.body.nombre,
        req.body.apellidos,
        req.body.correo,
        req.body.fecha_nac,
        req.body.foto
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM contactos WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE contactos SET `nombre`=?, `apellidos`=?, `correo`=?, `fecha_nac`=?, `foto`=? WHERE id=?";
    const id = req.params.id;

    db.query(sql, [req.body.nombre, req.body.apellidos, req.body.correo, req.body.fecha_nac, req.body.foto], (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM contactos WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("Listening");    
})