const cursos = ["Técnico em Informática", "Técnico em Agropecuária", "Técnico em Agroindústria"];

document.getElementById("teste").addEventListener("submit", function(event) {
    event.preventDefault();

    const cursoSugerido = resultado(); // Obtém o curso recomendado
    const resultadoEncoded = encodeURIComponent(cursoSugerido); // Codifica o resultado para a URL

    window.location.href = `/resultado.html?curso=${resultadoEncoded}`; // Redireciona com o parâmetro na URL
});

async function resultado() {
    let miin = 0, miai = 0, miap = 0;

    const inputs = document.querySelectorAll("input[type='radio']:checked");

    inputs.forEach(input => {
        if (input.value === 'miin') miin++;
        else if (input.value === 'miai') miai++;
        else if (input.value === 'miap') miap++;
    });

    let result;
    if (miin > miai && miin > miap) {
        result = cursos[0];
    } else if (miai > miin && miai > miap) {
        result = cursos[2];
    } else if (miap > miai && miap > miin) {
        result = cursos[1];
    } else {
        result = "Empate! Tente responder novamente.";
    }

    return result;
}
