document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-valor');
    const gridValores = document.getElementById('grid-valores');

    // Carrega os valores existentes no banco de dados
    carregarValores();

    // Enviar de formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const valor = document.getElementById('valor').value;

        // Enviar o valor para o servidor
        fetch('salvar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `valor=${encodeURIComponent(valor)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                carregarValores();  // Recarrega os valores após salvar
            } else {
                alert('Erro ao salvar o valor.');
            }
        });

        form.reset();  // Reseta o formulário após enviar
    });

    // Função para carregar valores e mostrar no grid
    function carregarValores() {
        fetch('salvar.php?listar=1')
        .then(response => response.json())
        .then(data => {
            gridValores.innerHTML = '';  // Limpar grid
            data.forEach(item => {
                const divValor = document.createElement('div');
                divValor.className = 'item-valor';
                divValor.textContent = item.valor;

                const botaoDeletar = document.createElement('button');
                botaoDeletar.className = 'botao-deletar';
                botaoDeletar.textContent = 'DELETE';
                botaoDeletar.addEventListener('click', function() {
                    deletarValor(item.id);
                });

                gridValores.appendChild(divValor);
                gridValores.appendChild(botaoDeletar);
            });
        });
    }

    // Função para deletar um valor
    function deletarValor(id) {
        fetch('deletar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${encodeURIComponent(id)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                carregarValores();  // Recarrega os valores após deletar
            } else {
                alert('Erro ao deletar o valor.');
            }
        });
    }
});
