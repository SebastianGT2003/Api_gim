var express = require('express')
var cors = require('cors')
var mysql=require('mysql')
var app = express()
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(cors())
/* app.use(express.json()) */



const credential={
    host:'b11hrk9buwkq5yhpiaad-mysql.services.clever-cloud.com',
    database: 'b11hrk9buwkq5yhpiaad',
    user:'utyagzo1xjpx9bmo',
    password:'YK0MpPIanHnyoo1AZE0g',
    port:'3306'
  /*   host:'127.0.0.1',
    database: 'gimnasio',
    user:'root',
    password:'' */
}

app.get('/', (req, res)=>{
    res.send('Hola desde tu primera ruta de la Api')
})

app.get('/usuarios',(req, res)=>{
    var connection= mysql.createConnection(credential)
    connection.query('SELECT * FROM usuarios',(error,rows)=>{
        if (error){
            res.status(500).send(error)

        }else{
            res.status(200).send(rows)
        }
    })
})

app.post('/api/eliminar', (req, res) => {
	const { correo } = req.body
	var connection = mysql.createConnection(credential)
	connection.query('DELETE FROM usuarios WHERE correo = ?',correo, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}
	})
	connection.end()
})

app.post('/login', (req, res)=>{
    const{username,password}=req.body
    const values=[username, password]
    var connection= mysql.createConnection(credential)
    connection.query('SELECT * FROM usuarios WHERE correo=? and contraseña=? ',values,(err,result)=>{
        if (err){
            res.status(500).send(err)

        }else{
            if (result.length>0){

                res.status(200).send({
                    "nombre": result[0].nombre,
					"tipo_documento": result[0].tipo_documento,
					"tipo_usuario": result[0].tipo_usuario,
                    "liga": result[0].liga,
                    "correo": result[0].correo

                })
                return true
            }else{
                res.status(400).send('El usuario no existe')
                return false
                

            }
        }


    })
    connection.end()

})
app.post('/registroapi', (req, res)=>{
    const{documento,nombre, tipo_documento,liga,tipo_usuario,correo,contraseña}=req.body
    var connection= mysql.createConnection(credential)
    
    connection.query("INSERT INTO usuarios (`documento`,`nombre`,`tipo_documento`,`liga`,`tipo_usuario`,`correo`,`contraseña`) VALUES (" + documento + ",'" + nombre + "','" + tipo_documento + "','" + liga + "','" + tipo_usuario + "','" + correo + "','" + contraseña + "')",(err,result)=>{
        if (err){
            res.status(500).send(err)

        }else{
            res.status(200).send(result)

        }


    })
    connection.end()

})
app.post('/editar', (req, res)=>{
    const{nombre,liga,tipo_usuario,correo}=req.body
    const values=[nombre, liga, tipo_usuario,correo]
    var connection= mysql.createConnection(credential)
    connection.query('UPDATE usuarios set nombre= ?, liga= ?, tipo_usuario= ? Where correo=?',values,(err,result)=>{
        if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}


    })
    connection.end()

})
app.post('/registro/reserva', (req, res)=>{
    const{nombre,correo,tipo_usuario,hora}=req.body
    var connection= mysql.createConnection(credential)
    
    connection.query("INSERT INTO Reservas (`hora`,`nombre`,`tipo_usuario`,`correo`) VALUES ('" + hora + "','" + nombre + "','" + tipo_usuario + "','" + correo + "')",(err,result)=>{
        if (err){
            res.status(500).send(err)

        }else{
            res.status(200).send(result)

        }


    })
    connection.end()

})

app.post('/reservaactual', (req, res) => {
	const { correo } = req.body
	var connection = mysql.createConnection(credential)
	connection.query('SELECT * FROM Reservas Where correo=?',correo, (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
	connection.end()
})

app.post('/api/eliminar/reserva', (req, res) => {
	const { correo } = req.body
	var connection = mysql.createConnection(credential)
	connection.query('DELETE FROM Reservas WHERE correo = ?',correo, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}
	})
	connection.end()
})
app.get('/reservas_administrador',(req, res)=>{
    var connection= mysql.createConnection(credential)
    connection.query('SELECT * FROM Reservas',(error,rows)=>{
        if (error){
            res.status(500).send(error)

        }else{
            res.status(200).send(rows)
        }
    })
})

app.post('/login_admin', (req, res)=>{
    const{username,password}=req.body
    const values=[username, password]
    var connection= mysql.createConnection(credential)
    connection.query('SELECT * FROM admin WHERE Correo=? and Contraseña=? ',values,(err,result)=>{
        if (err){
            res.status(500).send(err)

        }else{
            if (result.length>0){

                res.status(200).send({
                    "nombre": result[0].nombre,
                    "correo": result[0].correo

                })
                return true
            }else{
                res.status(400).send('El usuario no existe')
                return false
                

            }
        }


    })
    connection.end()

})

app.listen(4000, ()=>console.log('Hola soy el servidor'))