document.addEventListener("DOMContentLoaded", async function () {
  const inputIdade = document.getElementById("input-idadePet");
  document
    .getElementById("input-nascimento")
    .addEventListener("change", function () {
      const dataNascimento = new Date(getNascimento());
      if (!isNaN(dataNascimento.getTime())) {
        const idade = new Date().getFullYear() - dataNascimento.getFullYear();
        inputIdade.value = idade + " anos";
      } else {
        inputIdade.value = "Data inválida";
      }
    });

  document.getElementById("btn-editar").addEventListener("click", function () {
    let dados;
    dados = {
      nome: getNome(),
      nomePet: getNomePet(),
      cpf: getCpf(),
      endereco: getEndereco(),
      racaPet: getRacaPet(),
      bairro: getBairro(),
      telefone: getTelefone(),
      email: getEmail(),
      nascimento: getNascimento(),
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    };

    fetch(`${configAcessAPI.url}/cliente/` + getIdDoCliente(), requestOptions)
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
          window.location.href = "clientes.html";
        }
      })
      .catch((error) => {
        console.log("Falha na edição!");
        console.error("Erro:", error);
      });
  });

  try {
    const idCliente = getIdDoCliente();

    if (idCliente) {
      const cliente = await getCliente(idCliente);
      setNome(cliente.nome);
      setNomePet(cliente.nomePet);
      setCpf(cliente.cpf);
      setEndereco(cliente.endereco);
      setRacaPet(cliente.racaPet);
      setBairro(cliente.bairro);
      setTelefone(cliente.telefone);
      setEmail(cliente.email);
      setIdade(cliente.nascimento);
      setNascimento(cliente.nascimento);
      setImage(storageUrl + cliente.src);
    } else {
      alert("ID do Cliente não encontrado");
      window.location.href = "clientes.html";
    }
  } catch (erro) {
    console.error("Erro:", erro.message);
  }
});

function getIdDoCliente() {
  const urlParams = new URLSearchParams(window.location.search);
  const idCliente = urlParams.get("clienteId");
  return idCliente;
}

async function getCliente(id) {
  try {
    const resposta = await fetch(`${configAcessAPI.url}/cliente/${id}`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter cliente");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro:", erro.message);
    throw erro;
  }
}

function setNome(info) {
  document.getElementById("input-nome").value = info;
}

function setNomePet(info) {
  document.getElementById("input-nomePet").value = info;
}

function setCpf(info) {
  document.getElementById("input-cpf").value = info;
}

function setEndereco(info) {
  document.getElementById("input-endereco").value = info;
}

function setRacaPet(info) {
  document.getElementById("input-racaPet").value = info;
}

function setBairro(info) {
  document.getElementById("input-bairro").value = info;
}

function setTelefone(info) {
  document.getElementById("input-telefone").value = info;
}

function setEmail(info) {
  document.getElementById("input-email").value = info;
}

function setImage(info) {
  document.getElementById("input-img").src = info;
}

function setIdade(info) {
  const dataNascimentoObj = new Date(info);
  const agora = new Date();

  let idade = agora.getFullYear() - dataNascimentoObj.getFullYear();

  if (
    agora.getMonth() < dataNascimentoObj.getMonth() ||
    (agora.getMonth() === dataNascimentoObj.getMonth() &&
      agora.getDate() < dataNascimentoObj.getDate())
  ) {
    idade--;
  }

  document.getElementById("input-idadePet").value = idade + " anos";
}

function setNascimento(info) {
  const data = new Date(info);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  const dataFormatada = `${ano}-${mes}-${dia}`;

  document.getElementById("input-nascimento").value = dataFormatada;
}

function getNome() {
  return document.getElementById("input-nome").value;
}

function getNomePet() {
  return document.getElementById("input-nomePet").value;
}

function getCpf() {
  return document.getElementById("input-cpf").value;
}

function getEndereco() {
  return document.getElementById("input-endereco").value;
}

function getRacaPet() {
  return document.getElementById("input-racaPet").value;
}

function getBairro() {
  return document.getElementById("input-bairro").value;
}

function getTelefone() {
  return document.getElementById("input-telefone").value;
}

function getEmail() {
  return document.getElementById("input-email").value;
}

function getNascimento() {
  return document.getElementById("input-nascimento").value;
}

function getImg() {
  return document.getElementById("input-img");
}
