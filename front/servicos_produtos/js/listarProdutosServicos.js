async function obterProdutosServicosDoEndpoint() {
  try {
    const produtosResult = await fetch(`${configAcessAPI.url}/produto`);
    const servicosResult = await fetch(`${configAcessAPI.url}/servico`);

    if (!produtosResult.ok || !servicosResult.ok)
      throw new Error("Erro ao obter dados");

    const produtos = await produtosResult.json();
    const servicos = await servicosResult.json();

    const data = [...produtos, ...servicos];

    data.sort((a, b) => (a._id > b._id ? 1 : -1));

    return data;
  } catch (erro) {
    console.error("Erro ao obter dados:", erro.message);
    return [];
  }
}

async function adicionarProdutosServicosATabela() {
  const tabelaBody = document.getElementById("tabelaProdutosServicosBody");

  tabelaBody.innerHTML = "";
  const listaDeProdutosServicos = await obterProdutosServicosDoEndpoint();

  listaDeProdutosServicos.forEach(function (servico) {
    const novaLinha = document.createElement("tr");

    const colunaNome = document.createElement("td");
    colunaNome.className = "tabela-listagem";
    colunaNome.textContent = servico.nome;

    const colunaIcons = document.createElement("td");
    colunaIcons.className = "tabela-icones";

    let linkVisualizar;
    let linkEditar;
    let linkExcluir;

    if (servico.servico) {
      linkVisualizar = criarLink(
        "visualizar_servico.html",
        "bi-eye",
        null,
        servico._id
      );
      linkExcluir = criarLink("#", "bi-trash", "modal", servico._id);
    } else {
      linkVisualizar = criarLink(
        "visualizar_produto.html",
        "bi-eye",
        null,
        servico._id
      );
      linkEditar = criarLink(
        "editar_produto.html",
        "bi-pen-fill",
        null,
        servico._id
      );
      linkExcluir = criarLink("#", "bi-trash", "modal", servico._id);
    }

    colunaIcons.appendChild(linkVisualizar);

    if(!servico.servico){
      colunaIcons.appendChild(linkEditar);
      colunaIcons.appendChild(linkExcluir);
    }
    
    novaLinha.appendChild(colunaNome);
    novaLinha.appendChild(colunaIcons);

    tabelaBody.appendChild(novaLinha);
  });
}

function criarLink(href, iconName, dataToggle, servicoId) {
  const link = document.createElement("a");
  link.className = "visualize";
  link.href = href + "?servicoId=" + servicoId;

  const icon = document.createElement("i");
  icon.className = "bi " + iconName + " icones";
  link.appendChild(icon);

  if (dataToggle) {
    link.setAttribute("data-bs-toggle", dataToggle);
    link.setAttribute("data-bs-target", "#excluirModal");
  }

  if (dataToggle === "modal") {
    link.onclick = function () {
      localStorage.setItem("servicoIdExcluir", servicoId);
    };
  }

  return link;
}

adicionarProdutosServicosATabela();
