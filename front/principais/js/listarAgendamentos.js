async function obterComentariosDoEndpoint() {
    try {
      const result = await fetch(`${configAcessAPI.url}/comentario`);
  
      if (!result.ok) throw new Error("Erro ao obter comentarios");
  
      const dados = await result.json();
      return dados;
    } catch (erro) {
      console.error("Erro ao obter comentarios:", erro.message);
      return [];
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    adicionarAvaliacoesAoCampo();
  });
  
  async function adicionarAvaliacoesAoCampo() {
    const campoAvaliacao = document.querySelector(".campo-avaliacao");
  
    const listaDeAvaliacoes = await obterComentariosDoEndpoint();
    console.log(listaDeAvaliacoes);
  
    listaDeAvaliacoes.forEach(function (avaliacao) {
      const li = document.createElement("li");
      li.classList.add("input-group", "has-validation");
  
      const span = document.createElement("span");
      span.classList.add("input-group-text");
      span.innerHTML = '<div class="local-foto"></div>';
  
      const divAvaliadores = document.createElement("div");
      divAvaliadores.classList.add(
        "avaliadores",
        "campos-estilizado-avaliadores"
      );
  
      const h2NomesAvaliadores = document.createElement("h2");
      h2NomesAvaliadores.classList.add("nomes-avaliadores");
      h2NomesAvaliadores.textContent = avaliacao.nome;
  
      const pTextoAvaliadores = document.createElement("p");
      pTextoAvaliadores.classList.add("texto-avaliadores");
      pTextoAvaliadores.textContent = avaliacao.comentario;
  
      divAvaliadores.appendChild(h2NomesAvaliadores);
      divAvaliadores.appendChild(pTextoAvaliadores);
  
      li.appendChild(span);
      li.appendChild(divAvaliadores);
  
      campoAvaliacao.appendChild(li);
    });
  }