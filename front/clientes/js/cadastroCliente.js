document.addEventListener("DOMContentLoaded", function () {
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

     formData.append("dados", JSON.stringify(dados));

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(`${configAcessAPI.url}/cliente`, requestOptions)
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
            new bootstrap.Modal(document.getElementById("exampleModal")).show();
          }
        })
        .catch((error) => {
          console.log("Falha no cadastro!");
          console.error("Erro:", error);
        });
    });
});

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