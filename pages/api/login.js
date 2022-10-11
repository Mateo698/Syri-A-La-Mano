import { writeFile } from 'node:fs';
import { readFileSync } from 'node:fs';

export default function handler(req, res) {
    const {body, method} = req;
    if(method == 'PUT'){


        const data = new Uint8Array(Buffer.from(JSON.stringify(body.data)));
        writeFile('message.json', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');});
        res.status(200).json({route:"/"})
    }else if(method=='GET'){
        var data = JSON.parse(readFileSync('message.json', {encoding:'utf8', flag:'r'},(err, data) => {
            if (err) throw err;
            return data;}))
        console.log(data);
        res.status(200).json({data})
    }
    
    //session : true,name : "Admin"
    

  }
  