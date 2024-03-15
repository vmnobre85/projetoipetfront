document.addEventListener("DOMContentLoaded", function () {
  const botaoCancelarExclusao = document.getElementById(
    "botaoCancelarExclusao"
  );
  if (botaoCancelarExclusao) {
    botaoCancelarExclusao.addEventListener("click", function () {
      localStorage.removeItem("servicoIdExcluir");
    });
  }

  const botaoConfirmarExclusao = document.getElementById(
    "botaoConfirmarExclusao"
  );
  if (botaoConfirmarExclusao) {
    botaoConfirmarExclusao.addEventListener("click", async function () {
      const servicoIdExcluir = localStorage.getItem("servicoIdExcluir");

      if (servicoIdExcluir) {
        try {
          const resposta = await fetch(
            `${configAcessAPI.url}/produto/${servicoIdExcluir}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!resposta.ok) {
            throw new Error("Erro ao excluir o produto");
          }

          location.reload();
        } catch (erro) {
          console.error("Erro ao excluir o produto:", erro.message);
        }
        localStorage.removeItem("servicoIdExcluir");
      } else {
        console.error("ID do produto não encontrado no localStorage.");
      }
    });
  }
});
