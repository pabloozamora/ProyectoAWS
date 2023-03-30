const express = require('express');
const Connection = require('./connection');
const app = express();

app.use(express.static(__dirname + '/public')); //Todos tus archivos html, css, js deben estar en una carpeta public
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); //Renderiza el archivo html (Si es index.html no es necesario)
});

app.post('/post', (req, res) => {
    //Recibe los parametros del body
    const { rol, nombre, materia, contenido, fecha } = req.body;
    Connection.query(
        'INSERT INTO message (rol, nombre, materia, contenido, fecha) VALUES (?, ?, ?, ?, ?)',
        [rol, nombre, materia, contenido, fecha],
        (err, result) => {
            console.log(err, result);
            if (err) return res.sendStatus(500);
            if (result?.affectedRows === 1) return res.sendStatus(200);
            else return res.sendStatus(500);
        }
    )
});

//Conexion y consulta a la BD
app.get('/getPosts', async (req, res) => {
    Connection.query('SELECT * FROM message', (err, result) => {
        console.log(err, result);
        if (err) return res.sendStatus(500);
        res.status(200).send(result);
    })
});

const port = 80;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}.`));
