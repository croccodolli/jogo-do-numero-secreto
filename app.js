let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo =  document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.4});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', `Jogo do número secreto`);
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}.`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', `O número secreto é ${numeroSecreto}!`);
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Você acertou com ${numeroTentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        deixarMonstrinhoFeliz();

    } else if (chute > numeroMaximo || chute < 1) {
        exibirTextoNaTela('h1', `Número inválido!`);
        exibirTextoNaTela('p', `Somente números entre 1 e ${numeroMaximo}.`);
        limparCampo();
        } else {
        exibirTextoNaTela('h1', `Você errou!`);
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor do que o seu chute.`);
        } else if (chute < numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é maior do que o seu chute.`);
        }
        numeroTentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    limparCampo();
    numeroTentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    deixarMonstrinhoTriste()
}

function deixarMonstrinhoFeliz() {
    let image = document.getElementById('imagem');
    image.src = "./img/monstrinho-feliz.png";
}

function deixarMonstrinhoTriste() {
    let image = document.getElementById('imagem');
    image.src = "./img/monstrinho.png";
}
