/**⬛⬜⬛ CODE SQUARE LAYOUT GENERATOR ⬛⬜⬛
 * This script takes an "input.txt" code file and tries to format it as a rectangle
 * where the sides are as close to another as possible. It may not succeed and the
 * formatted square code will not compile. Also, the input code can not contain any
 * comments. Because it will destroy the syntax in the square.
 * */

const fsLibrary = require('fs');
// Input: LineLengthScale
const LineLengthScale = 1;
// Input: Aspect ratio of char height to char length in current font (height = 1)
const CharacterAspectRatio = 0.52;
const lengthMultiplier = 1 / CharacterAspectRatio;
fsLibrary.readFile('input.txt', (error, txtString) => {
    if (error) throw error;
    /** Step 1: String Preprocessing
     *  First the string gets trimmed, and all whitespace is reduced to one character.
     *  We also determine the scaled desired squareEdgeLength
     * */
    let txt = txtString.toString();
    txt = txt.replace(/(\r\n|\n|\r)/gm, " ");
    txt = txt.replace(/ +(?= )/g, '');
    txt = txt.trim();
    let squareEdgeLength = Math.floor(Math.sqrt(txt.length) * lengthMultiplier * LineLengthScale);

    /** Step 2: Line Formulation
     *  Now we cut the string into lines. We cut at the first space after the squareEdgeLength.
     *  We also remember the length of the longest line for Step 3.
     * */
    let lines = [];
    let lineLength = -1;
    while (txt.length > squareEdgeLength) {
        let cutIndex = txt.indexOf(" ", squareEdgeLength);
        if (cutIndex > lineLength) lineLength = cutIndex;
        lines.push(txt.substr(0, cutIndex));
        txt = txt.substr(cutIndex + 1);
    }
    lines.push(txt);

    /** Step 3: Equalizing Line Length
     *  Now we take our lines of code and lengthen the white space of all lines
     *  that are shorter than the longest line. This is done by iterating over
     *  the string always adding one space to the white spaces until the line
     *  has the desired length.
     * */
    for (let i = 0; i < lines.length - 1; i++) {
        let line = lines[i];
        let curWhiteLength = 1;
        let whiteCount = 0;
        let j = 0;
        while (line.length < lineLength) {
            if (line[j] != ' ') {
                whiteCount = 0;
            } else {
                whiteCount++;
            }
            // Insert space if needed
            if (whiteCount == curWhiteLength) {
                whiteCount = 0;
                line = line.substr(0, j) + " " + line.substr(j);
                j++;
            }

            // Increment, Return to start and increase whiteLength if length is exceeded
            j++;
            if (j >= line.length) {
                j = 0;
                curWhiteLength++;
            }
        }
        lines[i] = line;
    }
    /** Step 4: Postprocess and save
     * Now all lines get joined together with line breaks and saved to the "output.txt"
     * */
    let result = lines.join("\n");
    fsLibrary.writeFile('output.txt', result, function (err) {
        console.log(err);
    });
    console.log(result);
})

