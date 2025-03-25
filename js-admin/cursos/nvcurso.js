const botaoSalvar = document.getElementById('submit');
botaoSalvar.addEventListener('click', inserirCurso);

const url = `https://back-end-tf-web-mu.vercel.app/curso`;
const token = localStorage.getItem('jwt');

async function inserirCurso(e) {
  e.preventDefault();
  try {
    const dados = {
      code_curso: document.getElementById('code_curso').value,
      nome_curso: document.getElementById('nome_curso').value,
      mcc: document.getElementById('mcc').value,
      ppc: document.getElementById('ppc').value
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const data = await response.json();
    console.log(data);
    alert("Curso inserido com sucesso!");

  } catch (error) {
    console.error("Erro:", error);
    alert("Curso não inserido");
  }
}