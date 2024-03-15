async function obterClientesDoEndpoint() {
  try {
    const result = await fetch(`${configAcessAPI.url}/cliente`);

    if (!result.ok) throw new Error("Erro ao obter clientes");

    const dados = await result.json();
    return dados;
  } catch (erro) {
    console.error("Erro ao obter clientes:", erro.message);
    return [];
  }
}

async function adicionarClientesATabela() {
  const tabelaBody = document.getElementById("tabelaClientesBody");

  tabelaBody.innerHTML = "";
  const listaDeClientes = await obterClientesDoEndpoint();

  listaDeClientes.forEach(function (cliente) {
    const novaLinha = document.createElement("tr");

    const colunaNome = document.createElement("td");
    colunaNome.className = "listagem-clientes";
    colunaNome.textContent = cliente.nome;

    const colunaIcons = document.createElement("td");
    colunaIcons.className = "listagem-icones";

    const linkVisualizar = criarLink(
      "visualizar_cliente.html",
      "bi-eye",
      null,
      cliente._id
    );
    const linkEditar = criarLink(
      "editar_cliente.html",
      "bi-pen-fill",
      null,
      cliente._id
    );
    const linkExcluir = criarLink("#", "bi-trash", "modal", cliente._id);

    colunaIcons.appendChild(linkVisualizar);
    colunaIcons.appendChild(linkEditar);
    colunaIcons.appendChild(linkExcluir);

    novaLinha.appendChild(colunaNome);
    novaLinha.appendChild(colunaIcons);

    tabelaBody.appendChild(novaLinha);
  });
}

function criarLink(href, iconName, dataToggle, clienteId) {
  const link = document.createElement("a");
  link.className = "visualize";
  link.href = href + "?clienteId=" + clienteId;

  const icon = document.createElement("i");
  icon.className = "bi " + iconName + " icones";
  link.appendChild(icon);

  if (dataToggle) {
    link.setAttribute("data-bs-toggle", dataToggle);
    link.setAttribute("data-bs-target", "#excluirModal");
  }

  if (dataToggle === "modal") {
    link.onclick = function () {
      localStorage.setItem("clienteIdExcluir", clienteId);
    };
  }

  return link;
}

adicionarClientesATabela();
