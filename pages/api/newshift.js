import db from '../../util/database'
export default async (req, res) => {
    const { body, method } = req;
    console.log(body.newShift);
    const data = body.newShift
    let response = await db.query('SELECT * FROM TURNOS WHERE EDIFICIOS = $1 AND DIA = $2 AND HORA_INICIO = $3 AND HORA_FIN = $4'
    ,[data.edificios,data.dia,data.hora_inicio,data.hora_fin])
    if(response.rows.length != 0){
        res.status(200).json({data:0})
    }else{
        let insert = await db.query('INSERT INTO TURNOS VALUES($1,$2,$3)',[data.edificios])
        res.status(200).json({data:1})
    }
    INSERT INTO TURNOS VALUES('E','Lunes','13:00',)
}