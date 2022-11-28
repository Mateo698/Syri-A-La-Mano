import db from '../../util/database'
export default async (req, res) => {
  const { body, method } = req;
  const data = JSON.parse(body);
  
  if(data.shift != null){
    let shift = data.shift;
    let query = await db.query('SELECT * FROM TURNOS WHERE EDIFICIOS=$1 AND DIA=$2 AND HORA_INICIO=$3 AND HORA_FIN=$4',[shift.edificios,shift.dia,shift.hora_inicio,shift.hora_fin])
    if(query.rows.length != 0){
        res.status(200).json({data:4})
    }else{
        query = await db.query('UPDATE TURNOS SET EDIFICIOS = $1,DIA=$2,HORA_INICIO=$3,HORA_FIN=$4 WHERE ID=$5',[shift.edificios,shift.dia,shift.hora_inicio,shift.hora_fin,shift.id])
        res.status(200).json({data:1})
    }
    
  }else{
    let query = await db.query('SELECT * FROM TURNOS WHERE ID = $1',[data.id])
    let shift = {
        edificios: query.rows[0].edificios,
        dia: query.rows[0].dia,
        hora_inicio: query.rows[0].hora_inicio,
        hora_fin: query.rows[0].hora_fin,
        id: query.rows[0].id
    }
    
    res.status(200).json({data:shift})
  }
}