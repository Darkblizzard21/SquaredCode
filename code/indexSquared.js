const  fsLibrary  =  require('fs');  const LineLengthScale = 1; const CharacterAspectRatio
= 0.52; const lengthMultiplier = 1 / CharacterAspectRatio; fsLibrary.readFile('input.txt',
(error,  txtString)  =>  {  if  (error)  throw  error;  let  txt  =  txtString.toString();
txt    =    txt.replace(/(\r\n|\n|\r)/gm,   " ");    txt    =    txt.replace(/   +(?= )/g,
'');   txt   =   txt.trim();   let   squareEdgeLength  =  Math.floor(Math.sqrt(txt.length)
*    lengthMultiplier    *    LineLengthScale);   let   lines   =   [];   let   lineLength
= -1;  while   (txt.length   >   squareEdgeLength)   {  let  cutIndex  =  txt.indexOf(" ",
squareEdgeLength);     if    (cutIndex    >    lineLength)    lineLength    =    cutIndex;
lines.push(txt.substr(0,     cutIndex));     txt     =     txt.substr(cutIndex    +    1);
}   lines.push(txt);   for   (let  i  =  0;  i  <  lines.length  -  1;  i++)  {  let  line
=   lines[i];   let   curWhiteLength   =  1;  let  whiteCount  =  0;  let  j  =  0;  while
(line.length   <   lineLength)   {   if   (line[j]   !=   ' ')   {  whiteCount  =   0;   }
else    {    whiteCount++;    }   if   (whiteCount   ==   curWhiteLength)   {   whiteCount
=   0;   line   =   line.substr(0,   j)   +   " "  +  line.substr(j);  j++;  }   j++;   if
(j   >=   line.length)   {   j   =   0;   curWhiteLength++;   }   }  lines[i]  =  line;  }
let     result     =     lines.join("\n");    fsLibrary.writeFile('output.txt',    result,
function (err) { console.log(err); }); console.log(result); })