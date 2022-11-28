import db from '../../util/database'
export default async (req, res) => {
  const { body, method } = req;

  const data = JSON.parse(body)
  console.log(data.userData);
  if (method == "POST") {
    if (data.userData.type == "admin") {
      if(data.operation == "delete"){
        console.log(data.id + "IDDDDDDDD")
        let query = db.query('DELETE FROM HORARIOS WHERE APERTURA_ID=$1',[data.id])
        query = db.query('DELETE FROM APERTURAS WHERE ID = $1',[data.id])
        res.status(200).json({ message:'success'})
      }else{
        let query = await db.query('SELECT * FROM APERTURAS')
        const openings = query.rows.map((item) => ({
          id: item.id,
          salon: item.salon,
          edificio: item.edificio,
          apertura: item.hora_inicio
          , cierre: item.hora_fin
        }))
        res.status(200).json({data: openings})
      }
    } else {
      //AQUI VA EL SISTEMA DEL APERTURAS PARA EL MONITOR
      res.status(200).json({ data: [] })
    }

  }
}