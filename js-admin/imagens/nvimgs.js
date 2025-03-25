document.getElementById("nvImg").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("formNovaImagem").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("nvImg").files[0];
    const msg = document.getElementById("msg");

    if (!fileInput) {
        msg.style.color = "red";
        msg.innerText = "Por favor, selecione uma imagem.";
        return;
    }

    const formData = new FormData();
    formData.append("imagem", fileInput);

    const url = "https://back-end-tf-web-mu.vercel.app/img"; // Ajuste conforme necessário

    try {
        msg.style.color = "black";
        msg.innerText = "Enviando imagem...";

        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar a imagem! Código: " + response.status);
        }

        msg.style.color = "green";
        msg.innerText = "Imagem enviada com sucesso!";

    } catch (error) {
        msg.style.color = "red";
        msg.innerText = error.message;
    }
});
