document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-cadastrar")
    .addEventListener("click", function () {
      let dados;
      let formData = new FormData(); 
      const imgInput = getImg();
  
      if (imgInput && imgInput.files && imgInput.files.length > 0) {
        const imagem = imgInput.files[0];
        formData.append("file", imagem);
      }

      dados = {
        marca: getMarca(),
        nome: getNome(),
        quantidade: getQuantidade(),
        validade: getValidade(),
        descricao: getDescricao(),
        tipo: getTipo(),
      };
  
      formData.append("dados", JSON.stringify(dados));

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(`${configAcessAPI.url}/produto`, requestOptions)
        .then(async (response) => {
          const status = response.status;
          const data = await response.json();

          if (status >= 400) {
            let mensagemDeErro = "Falha no cadastro, corrija os erros:\n";
            data.forEach((erro) => {
              mensagemDeErro += `${erro.campo}: ${erro.erro}\n`;
            });
            alert(mensagemDeErro);
          } else {
            alert("Cadastro realizado com sucesso!");
            new bootstrap.Modal(document.getElementById("exampleModal")).show();
          }
        })
        .catch((error) => {
          alert("Falha no cadastro!");
          console.error("Erro:", error);
        });
    });
});

function getMarca() {
  return document.getElementById("input-marca").value;
}

function getNome() {
  return document.getElementById("input-nome").value;
}

function getQuantidade() {
  return document.getElementById("input-quantidade").value;
}

function getValidade() {
  return document.getElementById("input-validade").value;
}

function getDescricao() {
  return document.getElementById("input-descricao").value;
}

function getTipo() {
  return document.getElementById("input-tipo").value;
}

function getImg() {
  return document.getElementById("input-img");
}
