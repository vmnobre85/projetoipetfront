document.addEventListener("DOMContentLoaded", async function () {
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

function setImage(info) {
  document.getElementById("input-img").src = info;
}

function setEmail(info) {
  document.getElementById("input-email").value = info;
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

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;

  document.getElementById("input-nascimento").value = dataFormatada;
}
