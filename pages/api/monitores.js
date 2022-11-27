import db from '../../util/database'
export default async (req,res) => {
    const {body,method} = req,
    operation =  (body);
    console.log(body);
    if(method == "GET"){
        let query = await db.query("SELECT * FROM users WHERE type='monit'");
        const monitores = query.rows.map((item) => ({username: item.username, email:item.email,type:item.type,name:item.name}))
        res.status(200).json({data: monitores});
    }else{
        if(operation=='delete'){
          let query = await db.query("DELETE * FROM users WHERE username='{body.username}'");
          const monitores = query.rows.map((item) => ({username: item.username, email:item.email,type:item.type,name:item.name}))
          res.status(200).json({data: monitores});
        }
    }
    res.status(200).json({data: []})
}