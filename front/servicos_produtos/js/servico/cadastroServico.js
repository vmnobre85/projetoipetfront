document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-cadastrar")
    .addEventListener("click", function () {
      let dados;
      let formData = new FormData();
      const imgInput = getImg();

      getAtendimento();

      if (imgInput && imgInput.files && imgInput.files.length > 0) {
        const imagem = imgInput.files[0];
        formData.append("file", imagem);
      }

      dados = {
        servico: getServico(),
        nome: getNome(),
        descricao: getDescricao(),
        sexo: getSexo(),
        registro: getRegistro(),
        valor: getValor(),
        promo: getPromo(),
        especialidade: getEspecialidade(),
        atendimento: getAtendimento(),
      };

      console.log(dados);

      formData.append("dados", JSON.stringify(dados));

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(`${configAcessAPI.url}/servico`, requestOptions)
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

function getServico() {
  return document.getElementById("input-servico").value;
}

function getNome() {
  return document.getElementById("input-nome").value;
}

function getDescricao() {
  return document.getElementById("input-descricao").value;
}

function getImg() {
  return document.getElementById("input-img");
}

function getSexo() {
  return document.getElementById("input-sexo").value;
}

function getRegistro() {
  return document.getElementById("input-registro").value;
}

function getValor() {
  return document.getElementById("input-valor").value;
}

function getPromo() {
  return document.getElementById("input-promo").value;
}

function getEspecialidade() {
  return document.getElementById("input-especialidade").value;
}

function getAtendimento() {
  const atendimento = {};

  if (document.getElementById("cb-domingo").checked) {
    atendimento.domingo = {};

    const entrada1 =
      document.getElementById("input-domingo-entrada1").value || null;
    if (entrada1 != null) atendimento.domingo.entrada1 = entrada1;

    const saida1 =
      document.getElementById("input-domingo-saida1").value || null;
    if (saida1 != null) atendimento.domingo.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-domingo-entrada2").value || null;
    if (entrada2 != null) atendimento.domingo.entrada2 = entrada2;

    const saida2 =
      document.getElementById("input-domingo-saida2").value || null;
    if (saida2 != null) atendimento.domingo.saida2 = saida2;
  }

  if (document.getElementById("cb-segunda").checked) {
    atendimento.segunda = {};

    const entrada1 =
      document.getElementById("input-segunda-entrada1").value || null;
    if (entrada1 != null) atendimento.segunda.entrada1 = entrada1;

    const saida1 =
      document.getElementById("input-segunda-saida1").value || null;
    if (saida1 != null) atendimento.segunda.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-segunda-entrada2").value || null;
    if (entrada2 != null) atendimento.segunda.entrada2 = entrada2;

    const saida2 =
      document.getElementById("input-segunda-saida2").value || null;
    if (saida2 != null) atendimento.segunda.saida2 = saida2;
  }

  if (document.getElementById("cb-terca").checked) {
    atendimento.terca = {};

    const entrada1 =
      document.getElementById("input-terca-entrada1").value || null;
    if (entrada1 != null) atendimento.terca.entrada1 = entrada1;

    const saida1 = document.getElementById("input-terca-saida1").value || null;
    if (saida1 != null) atendimento.terca.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-terca-entrada2").value || null;
    if (entrada2 != null) atendimento.terca.entrada2 = entrada2;

    const saida2 = document.getElementById("input-terca-saida2").value || null;
    if (saida2 != null) atendimento.terca.saida2 = saida2;
  }

  if (document.getElementById("cb-quarta").checked) {
    atendimento.quarta = {};
    const entrada1 =
      document.getElementById("input-quarta-entrada1").value || null;
    if (entrada1 != null) atendimento.quarta.entrada1 = entrada1;

    const saida1 = document.getElementById("input-quarta-saida1").value || null;
    if (saida1 != null) atendimento.quarta.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-quarta-entrada2").value || null;
    if (entrada2 != null) atendimento.quarta.entrada2 = entrada2;

    const saida2 = document.getElementById("input-quarta-saida2").value || null;
    if (saida2 != null) atendimento.quarta.saida2 = saida2;
  }

  if (document.getElementById("cb-quinta").checked) {
    atendimento.quinta = {};

    const entrada1 =
      document.getElementById("input-quinta-entrada1").value || null;
    if (entrada1 != null) atendimento.quinta.entrada1 = entrada1;

    const saida1 = document.getElementById("input-quinta-saida1").value || null;
    if (saida1 != null) atendimento.quinta.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-quinta-entrada2").value || null;
    if (entrada2 != null) atendimento.quinta.entrada2 = entrada2;

    const saida2 = document.getElementById("input-quinta-saida2").value || null;
    if (saida2 != null) atendimento.quinta.saida2 = saida2;
  }

  if (document.getElementById("cb-sexta").checked) {
    atendimento.sexta = {};

    const entrada1 =
      document.getElementById("input-sexta-entrada1").value || null;
    if (entrada1 != null) atendimento.sexta.entrada1 = entrada1;

    const saida1 = document.getElementById("input-sexta-saida1").value || null;
    if (saida1 != null) atendimento.sexta.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-sexta-entrada2").value || null;
    if (entrada2 != null) atendimento.sexta.entrada2 = entrada2;

    const saida2 = document.getElementById("input-sexta-saida2").value || null;
    if (saida2 != null) atendimento.sexta.saida2 = saida2;
  }

  if (document.getElementById("cb-sabado").checked) {
    atendimento.sabado = {};
    const entrada1 =
      document.getElementById("input-sabado-entrada1").value || null;
    if (entrada1 != null) atendimento.sabado.entrada1 = entrada1;

    const saida1 = document.getElementById("input-sabado-saida1").value || null;
    if (saida1 != null) atendimento.sabado.saida1 = saida1;

    const entrada2 =
      document.getElementById("input-sabado-entrada2").value || null;
    if (entrada2 != null) atendimento.sabado.entrada2 = entrada2;

    const saida2 = document.getElementById("input-sabado-saida2").value || null;
    if (saida2 != null) atendimento.sabado.saida2 = saida2;
  }

  return atendimento;
}
