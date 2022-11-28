import db from '../../util/database'
export default async (req, res) => {
    const { body, method } = req;
    const data = body.newOp
    let response = await db.query('SELECT * FROM APERTURAS WHERE EDIFICIO = $1 AND SALON = $2 AND HORA_INICIO = $3 AND HORA_FIN = $4'
    ,[data.edificio,data.salon,data.hora_inicio,data.hora_fin])
    if(response.rows.length != 0){
        res.status(200).json({data:0})
    }else{
        let insert = await db.query('INSERT INTO APERTURAS VALUES($1,$2,$3,$4)',[data.edificio,data.salon,data.hora_inicio,data.hora_fin])
        let idQuery = await db.query('SELECT ID FROM APERTURAS WHERE EDIFICIO = $1 AND SALON = $2 AND HORA_INICIO = $3 AND HORA_FIN = $4',[data.edificio,data.salon,data.hora_inicio,data.hora_fin])
        console.log(idQuery.rows)
        insert = await db.query('INSERT INTO HORARIOS VALUES($1,$2,$3,$4,$5,$6)',[data.salon,data.hora_inicio,'Apertura',data.edificio,'Pendiente',idQuery.rows[0].id])
        insert = await db.query('INSERT INTO HORARIOS VALUES($1,$2,$3,$4,$5,$6)',[data.salon,data.hora_fin,'Cierre',data.edificio,'Pendiente',idQuery.rows[0].id])
        res.status(200).json({data:1})
    }
}