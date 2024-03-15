document.addEventListener("DOMContentLoaded", async function () {
  try {
    const idServico = getIdDoServico();

    if (idServico) {
      const servico = await getServico(idServico);
      setServico(servico.servico);
      setNome(servico.nome);
      setDescricao(servico.descricao);
      setSexo(servico.sexo);
      setRegistro(servico.registro);
      setValor(servico.valor);
      setPromo(servico.promo);
      setEspecialidade(servico.especialidade);
      setAtendimento(servico.atendimento);
      setImg(storageUrl + servico.src);
    } else {
      alert("ID do Servico não encontrado");
      window.location.href = "servicos.html";
    }
  } catch (erro) {
    console.error("Erro:", erro.message);
  }
});

function getIdDoServico() {
  const urlParams = new URLSearchParams(window.location.search);
  const idServico = urlParams.get("servicoId");
  return idServico;
}

async function getServico(id) {
  try {
    const resposta = await fetch(`${configAcessAPI.url}/servico/${id}`);
    if (!resposta.ok) {
      throw new Error("Erro ao obter serviço");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro:", erro.message);
    throw erro;
  }
}

function setImg(info) {
  document.getElementById("input-img").src = info;
}

function setServico(info) {
  return (document.getElementById("input-servico").value = info);
}

function setNome(info) {
  return (document.getElementById("input-nome").value = info);
}

function setDescricao(info) {
  return (document.getElementById("input-descricao").value = info);
}

function setSexo(info) {
  return (document.getElementById("input-sexo").value = info);
}

function setRegistro(info) {
  return (document.getElementById("input-registro").value = info);
}

function setValor(info) {
  return (document.getElementById("input-valor").value = info);
}

function setPromo(info) {
  return (document.getElementById("input-promo").value = info);
}

function setEspecialidade(info) {
  return (document.getElementById("input-especialidade").value = info);
}

function setAtendimento(atendimento) {
  console.log(atendimento);
  if (atendimento.domingo != null) {
    document.getElementById("cb-domingo").checked = true;
    document.getElementById("input-domingo-entrada1").value =
      atendimento.domingo.entrada1;
    document.getElementById("input-domingo-saida1").value =
      atendimento.domingo.saida1;
    document.getElementById("input-domingo-entrada2").value =
      atendimento.domingo.entrada2;
    document.getElementById("input-domingo-saida2").value =
      atendimento.domingo.saida2;
  }

  if (atendimento.segunda != null) {
    document.getElementById("cb-segunda").checked = true;
    document.getElementById("input-segunda-entrada1").value =
      atendimento.segunda.entrada1;
    document.getElementById("input-segunda-saida1").value =
      atendimento.segunda.saida1;
    document.getElementById("input-segunda-entrada2").value =
      atendimento.segunda.entrada2;
    document.getElementById("input-segunda-saida2").value =
      atendimento.segunda.saida2;
  }

  if (atendimento.terca != null) {
    document.getElementById("cb-terca").checked = true;
    document.getElementById("input-terca-entrada1").value =
      atendimento.terca.entrada1;
    document.getElementById("input-terca-saida1").value =
      atendimento.terca.saida1;
    document.getElementById("input-terca-entrada2").value =
      atendimento.terca.entrada2;
    document.getElementById("input-terca-saida2").value =
      atendimento.terca.saida2;
  }

  if (atendimento.quarta != null) {
    document.getElementById("cb-quarta").checked = true;
    document.getElementById("input-quarta-entrada1").value =
      atendimento.quarta.entrada1;
    document.getElementById("input-quarta-saida1").value =
      atendimento.quarta.saida1;
    document.getElementById("input-quarta-entrada2").value =
      atendimento.quarta.entrada2;
    document.getElementById("input-quarta-saida2").value =
      atendimento.quarta.saida2;
  }

  if (atendimento.quinta != null) {
    document.getElementById("cb-quinta").checked = true;
    document.getElementById("input-quinta-entrada1").value =
      atendimento.quinta.entrada1;
    document.getElementById("input-quinta-saida1").value =
      atendimento.quinta.saida1;
    document.getElementById("input-quinta-entrada2").value =
      atendimento.quinta.entrada2;
    document.getElementById("input-quinta-saida2").value =
      atendimento.quinta.saida2;
  }

  if (atendimento.sexta != null) {
    document.getElementById("cb-sexta").checked = true;
    document.getElementById("input-sexta-entrada1").value =
      atendimento.sexta.entrada1;
    document.getElementById("input-sexta-saida1").value =
      atendimento.sexta.saida1;
    document.getElementById("input-sexta-entrada2").value =
      atendimento.sexta.entrada2;
    document.getElementById("input-sexta-saida2").value =
      atendimento.sexta.saida2;
  }

  if (atendimento.sabado != null) {
    document.getElementById("cb-sabado").checked = true;
    document.getElementById("input-sabado-entrada1").value =
      atendimento.sabado.entrada1;
    document.getElementById("input-sabado-saida1").value =
      atendimento.sabado.saida1;
    document.getElementById("input-sabado-entrada2").value =
      atendimento.sabado.entrada2;
    document.getElementById("input-sabado-saida2").value =
      atendimento.sabado.saida2;
  }
}
