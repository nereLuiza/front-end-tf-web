const teste = document.forms;
const cursos = ["Técnico em Informática", "Técnico em Agropecuária", "Técnico em Agroindústria"];
const tamanho = teste.length;
let i, result;
let miin = 0;
let miai = 0;
let miap = 0;

for(i=0; i >= tamanho; i++) {
    if(teste.element[i].value == 'miin')
        miin += 1;
    else if(teste.element[i].value == 'miai')
        miai += 1;
    else if(teste.element[i].value == 'miap')
        miap += 1;
}

export async function resultado() {
    if(miin > miai && miin > miap) 
        result = cursos[0];
    else if(miai > miin && miai > miap)
        result = cursos[2];
    else if (miap > miai && miap > miin)
        result = cursos[1];
    return result;
}