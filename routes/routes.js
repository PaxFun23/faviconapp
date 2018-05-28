const express = require('express')
const router = express.Router();
const jsonfile = require('jsonfile');
const file = 'icons.json';
const iconsFile = jsonfile.readFileSync(file);
const path = require('path');
const Jimp = require('jimp');

router.get('/:style/:letter',(req,res)=>{
    const style = req.params.style;
    const letter = req.params.letter;
    let iconURL;  

    if(style == "bg1"){
        if(findIcon(iconsFile.bg1,letter)){
            res.render('index',{iconURL:"bg1-"+letter+".png"});
        }
        else {
            generateIcon("bg1",letter);
        }
    }

    else if(style == "bg2"){
        if(findIcon(iconsFile.bg2,letter)){
            res.render('index',{iconURL:"bg1-"+letter+".png"});
        }
        else {
            generateIcon("bg2",letter);
        }
    }

    else if(style == "bg3"){
        if(findIcon(iconsFile.bg3,letter)){
            res.render('index',{iconURL:"bg1-"+letter+".png"});
        }
        else {
            generateIcon("bg3",letter);
        }
    }

    else if(style == "bg4"){
        if(findIcon(iconsFile.bg4,letter)){
            res.render('index',{iconURL:"bg1-"+letter+".png"});
        }
        else {
            generateIcon("bg4",letter);
        }
    }



    function findIcon(array,letter){

        if(array != undefined){
            for(let i = 0; i<array.length;i++){
                if(array[i] == letter){
                    return true;
                }
            }
        }
        return false;
    }

    

    function generateIcon(style,letter){
        Jimp.read("./backgrounds/"+style+".png").then(function (image) {
            // do stuff with the image
    
            Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(function (font) {
                let text=letter;
                let totalWidth = measureText(font, text)
                image.print(font, Math.floor(100 / 2 - totalWidth / 2), Math.floor(100/2 - 32 ), text).write(path.join(__dirname,"../public/icons/"+style+"-"+letter+".png"));
                iconURL = style+"-"+letter+".png";
                res.render('index',{iconURL:iconURL});
            });    
    
            }).catch(function (err) {
                // handle an exception
                console.log(err);
            });
    
    }



    function measureText(font, text) {
        var x = 0;
        for (var i = 0; i < text.length; i++) {
            if (font.chars[text[i]]) {
                x += font.chars[text[i]].xoffset
                    + (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0)
                    + (font.chars[text[i]].xadvance || 0);
            }
        }
        return x;
    };


});


module.exports = router;