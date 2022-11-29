import db from '../../util/database'
export default async (req, res) => {
    const { body, method } = req;
    const data = JSON.parse(body)
    console.log(data)
    if (data.userData.type == "monit") {
        
        let query = await db.query('SELECT * FROM TURNO_MONITOR WHERE USERNAME = $1', [data.userData.username])
        if (query.rows.length != 0) {
            
            let id = query.rows[0].id
            query = await db.query('SELECT * FROM TURNOS WHERE ID = $1', [id])
            let edificios = query.rows[0].edificios
            if (edificios.length != 1) {
                let solit = []
                let solicitudes;
                switch (edificios) {
                    case '1y2D':
                        query = await db.query("SELECT * FROM SOLICITUDES WHERE EDIFICIO = $1 AND ESTADO='Pendiente'", ['D'])
                        solicitudes = query.rows.map((item) => ({
                            salon: item.salon,
                            edificio : item.edificio,
                            comentarios : item.comentarios,
                            id : item.id
                        }))
                        solit = solicitudes.filter((item) => item.salon.charAt(0) == '1' || item.salon.charAt(0) == '2')
                        break;

                    case 'F,C':
                        query = await db.query("SELECT * FROM SOLICITUDES WHERE EDIFICIO = $1 AND ESTADO='Pendiente'", ['F'])
                        solicitudes = query.rows.map((item) => ({
                            salon: item.salon,
                            edificio : item.edificio,
                            comentarios : item.comentarios,
                            id : item.id
                        }))
                        solit = solicitudes
                        query = await db.query("SELECT * FROM SOLICITUDES WHERE EDIFICIO = $1 AND ESTADO='Pendiente'", ['C'])
                        solicitudes = query.rows.map((item) => ({
                            salon: item.salon,
                            edificio : item.edificio,
                            comentarios : item.comentarios,
                            id : item.id
                        }))
                        solit = solit.concat(solicitudes)
                        break;

                    case '3y4D':
                        query = await db.query("SELECT * FROM SOLICITUDES WHERE EDIFICIO = $1 AND ESTADO='Pendiente'", ['D'])
                        solicitudes = query.rows.map((item) => ({
                            salon: item.salon,
                            edificio : item.edificio,
                            comentarios : item.comentarios,
                            id : item.id
                        }))
                        solit = solicitudes.filter((item) => item.salon.charAt(0) == '3' || item.salon.charAt(0) == '4')
                        break;
                }
                res.status(200).json({data:solit})
            } else {
                query = await db.query("SELECT * FROM SOLICITUDES WHERE EDIFICIO = $1 AND ESTADO='Pendiente'", [edificios])
                let solicitudes = query.rows.map((item) => ({
                    salon: item.salon,
                    edificio : item.edificio,
                    comentarios : item.comentarios,
                    id : item.id
                }))
                res.status(200).json({data:solicitudes})
            }

        } else {
            
            res.status(200).json({ data: "notinshift" })
        }
    }
}