document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("btn-editar").addEventListener("click", function () {
    let dados;
    dados = {
      marca: getMarca(),
      nome: getNome(),
      quantidade: getQuantidade(),
      validade: getValidade(),
      descricao: getDescricao(),
      tipo: getTipo(),
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    };

    fetch(`${configAcessAPI.url}/produto/` + getIdDoProduto(), requestOptions)
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
          window.location.href = "servicos.html";
        }
      })
      .catch((error) => {
        console.log("Falha na edição!");
        console.error("Erro:", error);
      });
  });

  try {
    const idProduto = getIdDoProduto();

    if (idProduto) {
      const produto = await getProduto(idProduto);
      setMarca(produto.marca);
      setNome(produto.nome);
      setQuantidade(produto.quantidade);
      setValidade(produto.validade);
      setDescricao(produto.descricao);
      setTipo(produto.tipo);
      setImg(storageUrl + produto.src);
    } else {
      alert("ID do Produto não encontrado");
      window.location.href = "servicos.html";
    }
  } catch (erro) {
    console.error("Erro:", erro.message);
  }
});

function getIdDoProduto() {
  const urlParams = new URLSearchParams(window.location.search);
  const idProduto = urlParams.get("servicoId");
  return idProduto;
}

async function getProduto(id) {
  try {
    const resposta = await fetch(`${configAcessAPI.url}/produto/${id}`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter produto");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro:", erro.message);
    throw erro;
  }
}

function getMarca() {
  return document.getElementById("input-marca").value;
}

function setMarca(info) {
  document.getElementById("input-marca").value = info;
}

function getNome() {
  return document.getElementById("input-nome").value;
}

function setNome(info) {
  document.getElementById("input-nome").value = info;
}

function getQuantidade() {
  return document.getElementById("input-quantidade").value;
}

function setQuantidade(info) {
  document.getElementById("input-quantidade").value = info;
}

function getValidade() {
  return document.getElementById("input-validade").value;
}

function setValidade(info) {
  const data = new Date(info);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  const dataFormatada = `${ano}-${mes}-${dia}`;

  document.getElementById("input-validade").value = dataFormatada;
}

function getDescricao() {
  return document.getElementById("input-descricao").value;
}

function setDescricao(info) {
  document.getElementById("input-descricao").value = info;
}

function getTipo() {
  return document.getElementById("input-tipo").value;
}

function setTipo(info) {
  document.getElementById("input-tipo").value = info;
}

function getImg() {
  return document.getElementById("input-img");
}

function setImg(info) {
  document.getElementById("input-img").src = info;
}
