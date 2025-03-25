const botaoLogin = document.querySelector('#bt-entrar');
botaoLogin.addEventListener('click', autenticar);

const areaMensagem = document.getElementById('msg');

async function autenticar(e) {
    e.preventDefault(); 
  
    areaMensagem.innerText = "Aguarde... ";
    areaMensagem.style.color = "black";

    const dados = {
        email_admin: document.getElementById('email').value,
        senha_admin: document.getElementById('senha').value
    };
  
    const url = "https://back-end-tf-web-mu.vercel.app/login";
  
    try {
        const response = await fetch("https://back-end-tf-web-mu.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error("Email/Senha incorretos! - " + response.status);
        }
  
        const data = await response.json();

        if (data.token) {
            localStorage.setItem('jwt', data.token);
            window.location.href = '/admin/indexA.html';
        } else {
            throw new Error("Token não recebido.");
        }
  
    } catch (error) {
        areaMensagem.style.color = "red";
        areaMensagem.innerText = error.message;
    }
}
