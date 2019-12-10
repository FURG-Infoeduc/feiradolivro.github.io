/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
/**
     * firebase: objeto global
     * database(): metodo para acesso ao realtime database
     * ref(): url em string para referencia do caminho do banco
     * set(): metodo que cria dados na url passada
     */
var ref = firebase.database().ref('administracao/perguntas/');
var ref1 = firebase.database().ref('conteudo/eventos/');

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    ref.orderByKey().on('child_added', snapshot => {
        var titulo = ''; 
        ref1.equalTo(snapshot.key).once(snapshot => {
            titulo = snapshot.val().titulo;
        })
        adicionaCardATela(snapshot.val(), titulo);
    })
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} titulo UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, titulo) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = titulo;
    header.classList.add('card-title');
    // ===================================

     /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    card_body.appendChild(header);

    informacao.forEach(element => {
        /**
     * CONTENT DO CARD
     */
    let nome = document.createElement("h4");
    nome.innerText = 'Email';
    let tipo = document.createElement("p");
    tipo.classList.add('card-text');
    tipo.innerText = element.email;
    let pergunta = document.createElement("h4");
    pergunta.innerText = 'Pergunta';
    let mensagem = document.createElement("p");
    mensagem.classList.add('card-text');
    mensagem.innerText = element.pergunta;
    
    // ===================================

    // popula card
    card_body.appendChild(nome);
    card_body.appendChild(tipo);
    card_body.appendChild(pergunta);
    card_body.appendChild(mensagem);

    });
    
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}

function logout() {
    firebase.auth().signOut().then(() => {
    });
}