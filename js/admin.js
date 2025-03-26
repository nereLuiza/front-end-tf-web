const botaoLogin = document.querySelector('#bt-entrar');
botaoLogin.addEventListener('click', autenticar);

const areaMensagem = document.getElementById('msg');

async function autenticar(e) {
    e.preventDefault(); 
  
    areaMensagem.innerText = "Aguarde...";
    areaMensagem.style.color = "black";

    const dados = {
        email_admin: document.getElementById('email').value,
        senha_admin: document.getElementById('senha').value
    };
  
    const url = "https://back-end-tf-web-mu.vercel.app/login";
  
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }
  
        const data = await response.json();

        if (data.token) {
            localStorage.setItem('jwt', data.token);
            
            sessionStorage.setItem('temp_token', data.token);
            
            window.location.href = '/admin/indexA.html';
        } else {
            throw new Error("Token não recebido na resposta.");
        }
  
    } catch (error) {
        console.error("Erro no login:", error);
        areaMensagem.style.color = "red";
        
        if (error.message.includes("Failed to fetch")) {
            areaMensagem.innerText = "Erro de conexão com o servidor.";
        } else if (error.message.includes("401")) {
            areaMensagem.innerText = "Email/Senha incorretos!";
        } else {
            areaMensagem.innerText = error.message || "Erro durante o login.";
        }
    }
}