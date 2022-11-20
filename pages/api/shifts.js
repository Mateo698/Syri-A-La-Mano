export default async (req,res) => {
    const { body, method } = req;
    
    const data = JSON.parse(body)
    if(method == "POST"){
        let shifts = [{
            id : '1',
            edificio: 'F,C',
            dia : 'Lunes',
            hora_inicio: '17:30',
            hora_fin: '20:00'
        },{
            id : '2',
            edificio: '1 y 2D',
            dia : 'Lunes',
            hora_inicio: '17:30',
            hora_fin: '20:00'
        }]
        res.status(200).json({data : shifts})
    }else{
        res.status(200).json({data : []})
    }
}