import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express();
app.use(cors());
app.use(express.json());

//Coloca tu base de datos 
const db = mysql.createConnection({
    host: "database-1.c4hagwzmruqp.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "carlos99",
    database: "pc3"
})

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './archivos'
}));


app.get('/', (req, res) => {
    const sql = "SELECT * FROM contactos";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.post('/contactos', (req, res) => {
    const sql = "INSERT INTO contactos (`nombre`,`apellidos`,`correo`,`fecha_nac`) VALUES (?)";
    const values = [
        req.body.nombre,
        req.body.apellidos,
        req.body.correo,
        req.body.fecha_nac
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })
})

app.put('/create_foto/:id', (req, res) => {
    const sql = "UPDATE contactos SET `foto`=? WHERE id=?";
    const id = req.params.id;

    db.query(sql, [req.body.fecha_nac, id],  (err, result) => {
        if(err) return res.json({Message: "Error insite server"});
        return res.json(result);
    })

    console.log(req.files)
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
    const sql = "UPDATE contactos SET `nombre`=?, `apellidos`=?, `correo`=?, `fecha_nac`=? WHERE id=?";
    const id = req.params.id;

    db.query(sql,[req.body.nombre, req.body.apellidos, req.body.correo, req.body.fecha_nac, id], (err, result) => {
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