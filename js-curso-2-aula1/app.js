let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exibirTextoNaTela("h1","Jogo do Número Secreto");
exibirTextoNaTela("p","Escolha um número entre 1 e 10");

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        exibirTextoNaTela("h1", "Parabéns! Você acertou!");

        let palavraTetativas = tentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativas = `Você acertou o número em ${tentativas} ${palavraTetativas}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {

        exibirTextoNaTela("h1", "Você errou! Tente novamente.");
        if(chute < numeroSecreto){
            exibirTextoNaTela("p", "O número secreto é maior que " + chute);
        } else {
            exibirTextoNaTela("p", "O número secreto é menor que " + chute);
        }
        tentativas = tentativas + 1;
        tentativas++;
        limparCampo()
    }
}

function gerarNumeroAleatorio(){
    
    let numeroEscolhido = parseInt(Math.floor(Math.random() * numeroLimite) + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    let campo = document.querySelector("input");
    campo.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirTextoNaTela("h1","Jogo do Número Secreto");
    exibirTextoNaTela("p","Escolha um número entre 1 e 10");
    limparCampo();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}