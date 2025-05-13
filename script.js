function calcularMod(valor) {
    return Math.floor((valor - 10) / 2);
  }
  
  function atualizarMod(campoId) {
    const campo = document.getElementById(campoId);
    const valor = parseInt(campo.value) || 0;
    const mod = calcularMod(valor);
    const modElemento = document.getElementById('mod-' + campoId);
    if (modElemento) {
      modElemento.textContent = `Mod: ${mod >= 0 ? '+' : ''}${mod}`;
    }
  }
  
  function validarFicha() {
    const nome = document.querySelector('input[name="nome"]').value.trim();
    const classe = document.querySelector('input[name="classe"]').value.trim();
    const raca = document.querySelector('input[name="raca"]').value.trim();
    const nivel = document.querySelector('input[name="nivel"]').value.trim();
  
    let mensagem = '';
    if (!nome || !classe || !raca || !nivel) {
      mensagem = '⚠️ Preencha todos os campos obrigatórios.';
    } else if (isNaN(parseInt(nivel)) || parseInt(nivel) <= 0) {
      mensagem = '⚠️ Nível precisa ser um número positivo.';
    } else {
      mensagem = '✅ Ficha válida!';
    }
  
    const msgEl = document.getElementById('mensagem-validacao');
    msgEl.textContent = mensagem;
    msgEl.style.color = mensagem.includes('✅') ? 'green' : 'red';
  }
  
  function salvarFicha() {
    const campos = document.querySelectorAll('input, textarea');
    const dados = {};
    campos.forEach(campo => {
      dados[campo.name] = campo.value;
    });
    localStorage.setItem('fichaRPG', JSON.stringify(dados));
    document.getElementById('mensagem-salvar').textContent = '💾 Ficha salva!';
  }
  
  function carregarFicha() {
    const dados = JSON.parse(localStorage.getItem('fichaRPG'));
    if (!dados) {
      document.getElementById('mensagem-salvar').textContent = '⚠️ Nenhuma ficha salva.';
      return;
    }
  
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach(campo => {
      if (dados[campo.name] !== undefined) {
        campo.value = dados[campo.name];
        atualizarMod(campo.name);
      }
    });
  
    document.getElementById('mensagem-salvar').textContent = '📥 Ficha carregada!';
  }
  
  function rolarDadoComMod(lados) {
    const seletor = document.getElementById("atributo-select");
    const atributoSelecionado = seletor.value;
  
    const valorDado = Math.floor(Math.random() * lados) + 1;
    let mod = 0;
    let textoMod = '';
  
    if (atributoSelecionado) {
      const inputAtributo = document.getElementById(atributoSelecionado);
      const valorAtributo = parseInt(inputAtributo.value) || 0;
      mod = calcularMod(valorAtributo);
      textoMod = ` + (${mod >= 0 ? '+' : ''}${mod} de ${atributoSelecionado})`;
    }
  
    const total = valorDado + mod;
    document.getElementById("resultado-dado").textContent =
      `Resultado: ${total} (d${lados} rolou ${valorDado}${textoMod})`;
  }
  
  function mostrarAba(id) {
    document.querySelectorAll('.aba').forEach(div => div.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
  }
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('✅ Service Worker registrado!'))
      .catch(err => console.error('Erro ao registrar SW:', err));
  }
  