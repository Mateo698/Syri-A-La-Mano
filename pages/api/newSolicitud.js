import db from '../../util/database'
export default async (req, res) => {
    const { body, method } = req;
    console.log(body.newSolicitud);
    const data = body.newSolicitud;
    let response = await db.query('SELECT * FROM SOLICITUDES WHERE edificio = $1 AND salon = $2 AND comentarios = $3'
    ,[data.edificio,data.salon,data.comentario])
    if(response.rows.length != 0){
        res.status(200).json({data:0})
    }else{
        let insert = await db.query("INSERT INTO SOLICITUDES VALUES($1,$2,$3,'NOW()',NULL,'Pendiente')",[data.salon,data.edificio,data.comentario])
        res.status(200).json({data:1})
    }
}