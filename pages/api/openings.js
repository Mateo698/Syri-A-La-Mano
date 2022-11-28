import db from '../../util/database'
export default async (req, res) => {
  const { body, method } = req;
  const data = JSON.parse(body)
  if (method == "POST") {
    if (data.userData.type == "admin") {
      if(data.operation == "delete"){
        let query = db.query('DELETE FROM HORARIOS WHERE APERTURA_ID=$1',[data.id])
        query = db.query('DELETE FROM APERTURAS WHERE ID = $1',[data.id])
        res.status(200).json({ message:'success'})
      }else{
        let query = await db.query('SELECT * FROM APERTURAS')
        const openings = query.rows.map((item) => ({
          id: item.id,
          salon: item.salon,
          edificio: item.edificio,
          apertura: item.hora_inicio,
          cierre: item.hora_fin,
          dia:item.dia
        }))
        res.status(200).json({data: openings})
      }
    } else if(data.userData.type == "monit"){
      let query = await db.query('SELECT * FROM TURNO_MONITOR WHERE USERNAME = $1',[data.userData.username])
      if(query.rows.length != 0){
        let id = query.rows[0].id
        query = await db.query('SELECT * FROM TURNOS WHERE ID=$1',[id])
        let init = query.rows[0].hora_inicio;
        let end = query.rows[0].hora_fin;
        query = await db.query('SELECT * FROM HORARIOS WHERE HORA >= $1 AND HORA <= $2',[init,end])
        let openings = query.rows.map((item)=>({salon:item.salon,hora:item.hora,tipo:item.tipo,estado:item.estado}))
        res.status(200).json({data:openings})
      }else{
        res.status(200).json({ data: [] })
      }
    }else{
      res.status(200).json({ data: [] })
    }

  }
}