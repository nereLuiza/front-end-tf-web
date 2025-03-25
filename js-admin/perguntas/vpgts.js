const urlBase = "https://back-end-tf-web-mu.vercel.app";

const tabelaCorpo = document.getElementById("tabela-perguntas");
const tabelaInner = document.getElementById("tabela-inner");

try {
  const endpoint = '/pgts';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal);

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';
  tabelaInner.innerHTML = '';

  data.forEach(pergunta => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
                <th>${pergunta.num_pgt}</th>
                <td>${pergunta.conteudo}</td>
              `;
    tabelaCorpo.appendChild(linha);
    const linha_inner = document.createElement("tr");
    linha_inner.innerHTML = `
        <th>${pergunta.alternativas[pergunta].valor}</th>
        <td>${pergunta.alternativas[pergunta].conteudo}</td>
    `;
    tabelaInner.appendChild(linha_inner);
  });
} catch (error) {
  console.error("Erro:", error);
}