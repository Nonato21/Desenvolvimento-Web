async function carregartabela() {
  const corpotabela = document.querySelector("#corpotabela");

  corpotabela.innerHTML = "";

  if (corpotabela) {
    const res = await fetch("../../php/listar_pessoa.php");

    const dados = await res.json();

    dados.forEach((obj) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${obj.id}</td>
      <td>${obj.nome}</td>
      <td>${obj.tipo_pessoa}</td>
      <td>${obj.cpf_cnpj}</td>       
      `;

      corpotabela.appendChild(tr);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  carregartabela();
  const nome = document.getElementById("nome");
  const form = document.getElementById("f");
  const pessoafisica = document.getElementById("pfisica");
  const pessoajuridica = document.getElementById("pjuridica");
  const divnome = document.getElementById("divnome");
  const divradio = document.getElementById("divradio");
  const cpf_cnpj = document.getElementById("cpf_cnpj");
  const mensagemcpfcnpj = document.getElementById("mensagemcpfcnpj");

  form.addEventListener("submit", async (e) => {
    
    if (nome.value === "") {
      divnome.innerText = "O nome não pode estar vazio";
      nome.focus();
      e.preventDefault();
    }

    if (!pessoafisica.checked && !pessoajuridica.checked) {
      divradio.innerText = "Selecione pelo menos um tipo de pessoa";
      e.preventDefault();
    }

    function valida_cpf(cpf) {
      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11) return false;
      for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }

      if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) return false;
        return true;
      } else return false;
    }

    function valida_cnpj(cnpj) {
      var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
      digitos_iguais = 1;
      if (cnpj.length < 14 && cnpj.length < 15) return false;
      for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
          digitos_iguais = 0;
          break;
        }
      if (!digitos_iguais) {
        tamanho = cnpj.length - 2;
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) return false;
        return true;
      } else return false;
    }

    if (pessoafisica.checked) {
      if (!valida_cpf(cpf_cnpj.value)) {
        mensagemcpfcnpj.innerText = "O CPF é inválido";
        cpf_cnpj.focus();
        e.preventDefault();
      }
    } else if (pessoajuridica.checked) {
      if (!valida_cnpj(cpf_cnpj.value)) {
        mensagemcpfcnpj.innerText = "O CNPJ é inválido";
        cpf_cnpj.focus();
        e.preventDefault();
      }
    }

    const dados = new FormData(e.target);

    const res = await fetch("../../php/insere_pessoa.php", {
      method: "POST",
      body: dados,
    });

    const ret = await res.json();
    alert(ret.mensagem);

    if (ret.status === "ok") {
      e.target.reset();
    }

    carregartabela();

  });
});
