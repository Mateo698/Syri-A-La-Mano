import db from '../../util/database'
export default async (req,res) => {
    const { body, method } = req;
    
    const data = JSON.parse(body)
    if(method == "POST"){
        if(){
            
        }
        let query = await db.query('SELECT * FROM TURNOS')
        const shifts = query.rows.map((item) => ({id: item.id, edificio:item.edificios,dia:item.dia,hora_inicio:item.hora_inicio,hora_fin:item.hora_fin}))
        res.status(200).json({data : shifts})
    }
    res.status(200).json({data : []})
}