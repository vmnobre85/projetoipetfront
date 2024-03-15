document.addEventListener("DOMContentLoaded", async function () {
  mostrarDados();

  document.getElementById("btn-salvar").addEventListener("click", function () {
    let dados;
    dados = {
      empresa: getEmpresa(),
      bairro: getBairro(),
      cnpj: getCnpj(),
      endereco: getEndereco(),
      cep: getCep(),
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

    fetch(`${configAcessAPI.url}/configuracao`, requestOptions)
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

async function getConfigs() {
  try {
    const resposta = await fetch(`${configAcessAPI.url}/configuracao`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter configuração");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro:", erro.message);
    throw erro;
  }
}

async function mostrarDados() {
  try {
    const configs = await getConfigs();
    setEmpresa(configs.empresa);
    setBairro(configs.bairro);
    setCnpj(configs.cnpj);
    setEndereco(configs.endereco);
    setCep(configs.cep);
    setEmail(configs.email);
    setTelefone(configs.telefone);
    setDescricao(configs.descricao);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

function getEmpresa() {
  return document.getElementById("input-empresa").value;
}
function setEmpresa(info) {
  document.getElementById("input-empresa").value = info;
}
function getBairro() {
  return document.getElementById("input-bairro").value;
}
function setBairro(info) {
  document.getElementById("input-bairro").value = info;
}
function getCnpj() {
  return document.getElementById("input-cnpj").value;
}
function setCnpj(info) {
  document.getElementById("input-cnpj").value = info;
}
function getEndereco() {
  return document.getElementById("input-endereco").value;
}
function setEndereco(info) {
  document.getElementById("input-endereco").value = info;
}
function getCep() {
  return document.getElementById("input-cep").value;
}
function setCep(info) {
  document.getElementById("input-cep").value = info;
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
