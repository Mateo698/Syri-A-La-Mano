import db from '../../util/database'
export default async (req, res) => {
  const { body, method } = req;

  const aux = JSON.parse(body)
  const data = aux.userData;
  if (method == "POST") {
    if (data.type == "monit") {
      if (data.operation == "check") {
        let query = await db.query('SELECT * FROM TURNOS WHERE ID=$1', [data.turnoId])
        if (query.rows.length != 0) {
          query = await db.query('SELECT * FROM TURNO_MONITOR WHERE ID=$1', [data.turnoId])
          if (query.rows.length != 0) {
            res.status(200).json({ message: "unsuccesfull" })
          } else {
            query = await db.query('INSERT INTO TURNO_MONITOR VALUES($1,$2)', [data.username, data.turnoId])
            query = await db.query("UPDATE TURNOS SET ESTADO = 'Ocupado' WHERE ID=$1", [data.turnoId])
            res.status(200).json({ message: "succesfull" })
          }
        } else {
          res.status(200).json({ message: "notfound" })
        }

      } else if (data.operation == "out") {
        let query = await db.query('SELECT * FROM TURNO_MONITOR WHERE USERNAME = $1', [data.username])
        let turnoId = query.rows[0].id
        query = db.query('DELETE FROM TURNO_MONITOR WHERE USERNAME=$1', [data.username])
        query = await db.query("UPDATE TURNOS SET ESTADO = 'Libre' WHERE ID=$1", [turnoId])
        res.status(200).json({ data: "none" })
      } else {
        let query = await db.query('SELECT * FROM TURNO_MONITOR WHERE USERNAME = $1', [data.username])
        if (query.rows.length != 0) {
          const shift = query.rows[0].id
          query = await db.query('SELECT * FROM TURNOS WHERE ID=$1', [shift])
          let info = {
            id: query.rows[0].id,
            edificios: query.rows[0].edificios,
            inicio: query.rows[0].hora_inicio,
            fin: query.rows[0].hora_fin
          }
          res.status(200).json({ data: info })
        } else {
          res.status(200).json({ data: "none" })
        }
      }

    } else if (data.type == "admin") {
      let current = new Date()
      let hours = current.getHours()
      let minutes= current.getMinutes()
      if(current.getHours() < 10){
        hours = "0" + hours
      }
      if(current.getMinutes()<10){
        minutes = "0" + minutes
      }
      const timeNow = hours+":"+minutes;
      let dayOfWeekName = new Date().toLocaleString(
        'es-MX', {weekday: 'long'}
      );
      dayOfWeekName=  dayOfWeekName.charAt(0).toUpperCase() + dayOfWeekName.slice(1);
      let query = await db.query('SELECT * FROM TURNOS WHERE HORA_INICIO<=$1 AND HORA_FIN>=$1 AND DIA=$2',[timeNow,dayOfWeekName])
      let shifts = query.rows.map((item) => ({edificios:item.edificios,estado:item.estado,id:item.id}))
      res.status(200).json({ data: shifts })
    } else {
      let current = { turnoId: "4659", edificios: "F,C" }
      res.status(200).json({ data: current })
    }
  }
}