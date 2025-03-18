let participantes = [];


function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    
    if (nome === '') {
        alert('Por favor, digite um nome válido!');
        return;
    }

    
    if (participantes.includes(nome)) {
        alert('Este nome já está na lista!');
        return;
    }

    
    participantes.push(nome);
    input.value = '';
    atualizarListaAmigos();
}


function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; 
    
    participantes.forEach(amigo => {
        const item = document.createElement('li');
        item.textContent = amigo;
        lista.appendChild(item);
    });
}


function sortearAmigo() {
   
    if (participantes.length < 2) {
        alert('Adicione pelo menos 2 participantes!');
        return;
    }

    let sorteio;
    let tentativas = 0;
    const maxTentativas = 1000;

    do {
        sorteio = embaralhar([...participantes]);
        tentativas++;
    } while (!validarSorteio(sorteio) && tentativas < maxTentativas);

    if (tentativas >= maxTentativas) {
        alert('Não foi possível realizar um sorteio válido. Tente novamente!');
        return;
    }

    exibirResultado(sorteio);
}


function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function validarSorteio(sorteio) {
    return sorteio.every((nome, indice) => nome !== participantes[indice]);
}


function exibirResultado(sorteio) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    participantes.forEach((nome, indice) => {
        const item = document.createElement('li');
        item.textContent = `${nome} tirou: ${sorteio[indice]}`;
        resultado.appendChild(item);
    });
}