document.addEventListener("DOMContentLoaded", async function () {
  mostrarDados();

  document.getElementById("btn-salvar").addEventListener("click", function () {
    let dados;
    dados = {
      nome: getNome(),
      email: getEmail(),
      telefone: getTelefone(),
      descricao: getDescricao(),
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    };

    fetch(`${configAcessAPI.url}/perfil`, requestOptions)
      .then(async (response) => {
        const status = response.status;
        const data = await response.json();

        if (status >= 400) {
          let mensagemDeErro = "Falha na edição, corrija os erros:\n";
          data.forEach((erro) => {
            mensagemDeErro += `${erro.campo}: ${erro.erro}\n`;
          });
          alert(mensagemDeErro);
        } else {
          mostrarDados();
        }
      })
      .catch((error) => {
        console.log("Falha na edição!");
        console.error("Erro:", error);
      });
  });
});

async function getPerfil() {
  try {
    const resposta = await fetch(`${configAcessAPI.url}/perfil`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter perfil");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro:", erro.message);
    throw erro;
  }
}

async function mostrarDados() {
  try {
    const perfil = await getPerfil();
    setNome(perfil.nome);
    setEmail(perfil.email);
    setTelefone(perfil.telefone);
    setDescricao(perfil.descricao);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

function getNome() {
  return document.getElementById("input-nome").value;
}

function setNome(info) {
  document.getElementById("input-nome").value = info;
}

function getEmail() {
  return document.getElementById("input-email").value;
}

function setEmail(info) {
  document.getElementById("input-email").value = info;
}

function getTelefone() {
  return document.getElementById("input-telefone").value;
}

function setTelefone(info) {
  document.getElementById("input-telefone").value = info;
}

function getDescricao() {
  return document.getElementById("input-descricao").value;
}

function setDescricao(info) {
  document.getElementById("input-descricao").value = info;
}
