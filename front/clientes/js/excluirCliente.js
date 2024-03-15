document.addEventListener("DOMContentLoaded", function () {
  const botaoCancelarExclusao = document.getElementById(
    "botaoCancelarExclusao"
  );
  if (botaoCancelarExclusao) {
    botaoCancelarExclusao.addEventListener("click", function () {
      localStorage.removeItem("clienteIdExcluir");
    });
  }

  const botaoConfirmarExclusao = document.getElementById(
    "botaoConfirmarExclusao"
  );
  if (botaoConfirmarExclusao) {
    botaoConfirmarExclusao.addEventListener("click", async function () {
      const clienteIdExcluir = localStorage.getItem("clienteIdExcluir");

      if (clienteIdExcluir) {
        try {
          const resposta = await fetch(
            `${configAcessAPI.url}/cliente/${clienteIdExcluir}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!resposta.ok) {
            throw new Error("Erro ao excluir o cliente");
          }

          location.reload();
        } catch (erro) {
          console.error("Erro ao excluir o cliente:", erro.message);
        }
        localStorage.removeItem("clienteIdExcluir");
      } else {
        console.error("ID do cliente não encontrado no localStorage.");
      }
    });
  }
});
