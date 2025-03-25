const urlBase = "https://back-end-tf-web-mu.vercel.app";

const tabelaCorpo = document.getElementById("tabela-cursos");

try {
  const endpoint = '/imgs';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal);

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';

  data.forEach(imagem => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
                <th>${imagem.code_img}</th>
                <td>
                    <img src="${imagem.atalho}" />
                </td>
                <td>${imagem.atalho}</td>
              `;
    tabelaCorpo.appendChild(linha);
  });
} catch (error) {
  console.error("Erro:", error);
}