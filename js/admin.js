async function autenticar(e) {
    e.preventDefault();
    
    const areaMensagem = document.getElementById('msg');
    areaMensagem.innerText = "Autenticando...";
    areaMensagem.style.color = "black";

    try {
        const response = await fetch('https://back-end-tf-web-mu.vercel.app/login', {
            method: 'POST',
            mode: 'cors', // Ativa explicitamente o CORS
            credentials: 'include', // Permite cookies/tokens
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email_admin: document.getElementById('email').value,
                senha_admin: document.getElementById('senha').value
            })
        });

        // Tratamento especial para erros CORS
        if (response.type === 'opaque') {
            throw new Error("Erro de CORS: Verifique a conexão com o servidor");
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Credenciais inválidas");
        }

        const data = await response.json();
        localStorage.setItem('jwt', data.token);
        window.location.href = '/admin/indexA.html';

    } catch (error) {
        console.error("Erro detalhado:", error);
        areaMensagem.style.color = "red";
        areaMensagem.innerText = error.message.includes('Failed to fetch') 
            ? "Erro de conexão com o servidor" 
            : error.message;
    }
}