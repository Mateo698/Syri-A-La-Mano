import db from '../../util/database'
export default async (req, res) => {
  const { body, method } = req;
  const data = JSON.parse(body);
  
  if(data.opening != null){

    let opening = data.opening;
    let query = await db.query('SELECT * FROM APERTURAS WHERE EDIFICIO=$1 AND SALON=$2 AND HORA_INICIO=$3 AND HORA_FIN=$4 AND DIA =$5',[opening.edificio,opening.salon,opening.hora_inicio,opening.hora_fin,opening.dia])
    if(query.rows.length != 0){
        res.status(200).json({data:4})
    }else{
        query = await db.query('UPDATE APERTURAS SET EDIFICIO = $1,SALON = $2,HORA_INICIO=$3,HORA_FIN=$4,DIA=$5 WHERE ID=$6',[opening.edificio,opening.salon,opening.hora_inicio,opening.hora_fin,opening.dia,opening.id])
        query = await db.query("UPDATE HORARIOS SET SALON = $1,HORA=$2,EDIFICIO=$3,DIA=$4 WHERE APERTURA_ID=$5 AND TIPO='Apertura'",[opening.salon,opening.hora_inicio,opening.edificio,opening.dia,opening.id])
        query = await db.query("UPDATE HORARIOS SET SALON = $1,HORA=$2,EDIFICIO=$3,DIA=$4 WHERE APERTURA_ID=$5 AND TIPO='Cierre'",[opening.salon,opening.hora_fin,opening.edificio,opening.dia,opening.id])
        res.status(200).json({data:1})
    }
    
  }else{
    let query = await db.query('SELECT * FROM APERTURAS WHERE ID = $1',[data.id])
    let apertura = {
        edificio: query.rows[0].edificio,
        salon: query.rows[0].salon,
        dia: query.rows[0].dia,
        apertura: query.rows[0].hora_inicio,
        cierre: query.rows[0].hora_fin,
        id: query.rows[0].id
    }
    
    res.status(200).json({data:apertura})
  }
}