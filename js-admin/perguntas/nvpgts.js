const urlBase = "https://back-end-tf-web-mu.vercel.app";

const token = localStorage.getItem("jwt");
if (!token) {
    alert("Faça login para acessar esta página.");
    window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const perguntaInput = document.getElementById("nv");
    const alternativaAInput = document.getElementById("nv-a");
    const alternativaBInput = document.getElementById("nv-b");
    const alternativaCInput = document.getElementById("nv-c");
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const novaPergunta = perguntaInput.value.trim();
        const alternativaA = alternativaAInput.value.trim();
        const alternativaB = alternativaBInput.value.trim();
        const alternativaC = alternativaCInput.value.trim();

        if (!novaPergunta || !alternativaA || !alternativaB || !alternativaC) {
            alert("Preencha todos os campos.");
            return;
        }

        const dadosParaEnvio = {
            pergunta: {
                conteudo: novaPergunta
            },
            alternativas: [
                { valor: "miin", conteudo: alternativaA },
                { valor: "miai", conteudo: alternativaB },
                { valor: "miap", conteudo: alternativaC }
            ]
        };

        try {
            const response = await fetch(`${urlBase}/pgt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dadosParaEnvio)
            });

            if (!response.ok) throw new Error("Erro ao salvar a pergunta.");

            alert("Pergunta adicionada com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao adicionar a pergunta.");
        }
    });
});
