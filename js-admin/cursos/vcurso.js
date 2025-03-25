const urlBase = "https://back-end-tf-web-mu.vercel.app";

const tabelaCorpo = document.getElementById("tabela-cursos");

try {
  const endpoint = '/cursos';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal);

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';

  data.forEach(curso => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
                <th>${curso.nome_curso}</th>
                <td>${curso.code_curso}</td>
                <td>${curso.desc_curso}</td>
                <td>${curso.mcc}</td>
                <td>${curso.ppc}</td>
              `;
    tabelaCorpo.appendChild(linha);
  });
} catch (error) {
  console.error("Erro:", error);
}