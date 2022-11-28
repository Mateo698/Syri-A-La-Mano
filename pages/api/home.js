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
            res.status(200).json({ message: "succesfull" })
          }
        } else {
          res.status(200).json({ message: "notfound" })
        }

      } else if (data.operation == "out") {
        let query = db.query('DELETE FROM TURNO_MONITOR WHERE USERNAME=$1',[data.username])
        res.status(200).json({data:"none"})
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

    } else {
      let current = { turnoId: "4659", edificios: "F,C" }
      res.status(200).json({ data: current })
    }
  }
}