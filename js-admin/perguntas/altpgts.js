const urlBase = "https://back-end-tf-web-mu.vercel.app";

// Verifica autenticação
const token = localStorage.getItem("jwt");
if (!token) {
    alert("Faça login para acessar esta página.");
    window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const numPerguntaInput = document.getElementById("num_pgt");
    const perguntaInput = document.getElementById("nova");
    const alternativaAInput = document.getElementById("nova-a");
    const alternativaBInput = document.getElementById("nova-b");
    const alternativaCInput = document.getElementById("nova-c");
    const form = document.querySelector("form");

    numPerguntaInput.addEventListener("blur", async () => {
        const numPergunta = numPerguntaInput.value.trim();
        if (!numPergunta) return;

        try {
            const response = await fetch(`${urlBase}/pgt/${numPergunta}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Pergunta não encontrada.");

            const data = await response.json();

            perguntaInput.value = data.pergunta.conteudo || "";
            alternativaAInput.value = data.alternativas.find(a => a.valor === "miin")?.conteudo || "";
            alternativaBInput.value = data.alternativas.find(a => a.valor === "miai")?.conteudo || "";
            alternativaCInput.value = data.alternativas.find(a => a.valor === "miap")?.conteudo || "";
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao buscar pergunta.");
        }
    });

    // Envia as alterações
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const numPergunta = numPerguntaInput.value.trim();
        const novaPergunta = perguntaInput.value.trim();
        const alternativaA = alternativaAInput.value.trim();
        const alternativaB = alternativaBInput.value.trim();
        const alternativaC = alternativaCInput.value.trim();

        if (!numPergunta || !novaPergunta || !alternativaA || !alternativaB || !alternativaC) {
            alert("Preencha todos os campos.");
            return;
        }

        const dadosAtualizados = {
            pergunta: {
                num_pgt: Number(numPergunta),
                conteudo: novaPergunta
            },
            alternativas: [
                { valor: "miin", conteudo: alternativaA },
                { valor: "miai", conteudo: alternativaB },
                { valor: "miap", conteudo: alternativaC }
            ]
        };

        try {
            const response = await fetch(`${urlBase}/perguntas/${numPergunta}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) throw new Error("Erro ao atualizar a pergunta.");

            alert("Pergunta atualizada com sucesso!");
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao atualizar a pergunta.");
        }
    });
});
