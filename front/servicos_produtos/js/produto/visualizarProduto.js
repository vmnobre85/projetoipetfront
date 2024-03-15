document.addEventListener("DOMContentLoaded", async function () {
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
      window.location.href = "produtos.html";
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

function setMarca(info) {
  document.getElementById("input-marca").value = info;
}

function setNome(info) {
  document.getElementById("input-nome").value = info;
}

function setQuantidade(info) {
  document.getElementById("input-quantidade").value = info;
}

function setValidade(info) {
  const data = new Date(info);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  const dataFormatada = `${ano}-${mes}-${dia}`;

  document.getElementById("input-validade").value = dataFormatada;
}

function setDescricao(info) {
  document.getElementById("input-descricao").value = info;
}

function setTipo(info) {
  document.getElementById("input-tipo").value = info;
}

function setImg(info) {
  document.getElementById("input-img").src = info;
}
