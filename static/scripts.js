
function changeScale() {
    const selectedNote = document.getElementById("note").value;
    const selectedScale = document.getElementById("scale").value;

    const notes = ["A","A#/Bb","B","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab"];
    const tonalities = ["I","II","III","IV","V","VI","VII"];

    const scales = [[1,1,0,1,1,1,0],  //  Jonico: 0
                    [1,0,1,1,1,0,1],  //  Dorico: 1
                    [0,1,1,1,0,1,1],  //  Frigio: 2
                    [1,1,1,0,1,1,0],  //  Lidio: 3
                    [1,1,0,1,1,0,1],  //  Mixolidio: 4
                    [1,0,1,1,0,1,1],  //  Eolico: 5
                    [0,1,1,0,1,1,1]]; // Locrio: 6
    
    let scale = [];
    let chords = new Map();

    // Definir la escala
    scale.push(parseInt(selectedNote));
    for (let i = parseInt(selectedNote), j = 0; j < 6;  j++)
    {   
        i += scales[parseInt(selectedScale)][j]
        i = (i >= 12) ? 1 : i + 1;
        scale.push(i);
    }          
    
    // Definir acordes
    const scaleAux = scale.slice();
    scaleAux.sort((a, b) => a - b);
    for (let i = 0; i < scaleAux.length; i++)
    {
        const dis = (scaleAux[i] - (scaleAux[(i + 2) - ((i < 5)? 0 : 7)] + ((i < 5)? 0 : 12)))*-1;
        const dis2 = (scaleAux[i] - (scaleAux[(i + 4) - ((i < 3)? 0 : 7)] + ((i < 3)? 0 : 12)))*-1;

        if (dis == 4)
        {
            chords.set(scaleAux[i], notes[scaleAux[i]-1]);
        }
        else if (dis == 2)
        {
            chords.set(scaleAux[i], notes[scaleAux[i]-1] + "sus2*");
        }
        else if (dis == 5)
        {
            chords.set(scaleAux[i], notes[scaleAux[i]-1] + "sus4*");
        }
        else if (dis == 3)
        {
            if (dis2 == 6)
            {
                chords.set(scaleAux[i], notes[scaleAux[i]-1] + "dim");
                continue;
            }
            chords.set(scaleAux[i], notes[scaleAux[i]-1] + "m");
        }
        
    }

    // Actualizar las figuras y los textos
    for (let i = 1; i <= 12; i++)
    {
        const square = document.getElementById(`sq${i}`);
        const textAbove = document.getElementById(`text-above-${i}`);
        const textBelow = document.getElementById(`text-below-${i}`);

        for (let j = 0; j <= scale.length; j++)
        {

            if (i == scale[j])
            {
                // Cambiar color de la figura
                square.style.backgroundColor = "#ffffff";
                square.classList.add("highlighted")

                // Cambiar textos
                textAbove.textContent = `${tonalities[j]}`;
                textAbove.classList.add("highlighted");
                textBelow.textContent = chords.get(i);
                textBelow.classList.add("highlighted");

                break;
            }

            // Cambiar color de la figura
            square.style.backgroundColor = "#858585";
            square.classList.remove("highlighted");

            // Cambiar textos
            textAbove.textContent = "‎";
            textAbove.classList.remove("highlighted");
            textBelow.textContent = "‎";
            textBelow.classList.remove("highlighted");

        }
    }

}

function changeColor()
{
    const selectedScale = document.getElementById("scale").value;
    const circle = document.querySelector(".circle");

    const gradientMap = {
        "0": "linear-gradient(to right, #7e1f03, #7a0505)",
        "1": "linear-gradient(to right, #051d50, #525007)",
        "2": "linear-gradient(to right, #051d50, #1d0858)",
        "3": "linear-gradient(to right, #7e1f03, #525007)",
        "4": "linear-gradient(to right, #7e1f03, #095858)",
        "5": "linear-gradient(to right, #051d50, #095858)",
        "6": "linear-gradient(to right, #000000, #555555)",
    };                  

    const newGradient = gradientMap[selectedScale];
    
    circle.style.background = newGradient;
    circle.classList.add('active');

    setTimeout(function() {
        circle.classList.remove('active');
        document.body.style.background = newGradient;
    }, 300);

}
