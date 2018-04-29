const express = require('express')
const router = express.Router();
const jsonfile = require('jsonfile');
const file = 'icons.json';
const icons = jsonfile.readFileSync(file);

router.get('/:style/:letter',(req,res)=>{
    const style = req.params.style;
    const letter = req.params.letter;
    let iconURL;

    for(let i=0;i<icons.data.length;i++){
        if(icons.data[i].styleName == style){
            for(let j=0;j<icons.data[i].icons.length;j++){
                if(icons.data[i].icons[j].letter == letter){

                    iconURL = icons.data[i].icons[j].url;

                break;
                }
            }
            break;
        }
    }
    res.render('index',{iconURL:iconURL});
});


module.exports = router;