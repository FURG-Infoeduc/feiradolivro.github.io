/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
let cardtitle = document.createElement("h3");
cardtitle.innerText = 'E-mails';
CARD_CONTAINER.appendChild(cardtitle); 

var ref = firebase.database().ref('administracao').child('emails');
/**
 * Botão para cria um card no card-contaier
 */



/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    ref.orderByValue().on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key)
    });
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("p");
    header.innerText = informacao+';';
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    // ===================================

    // popula card
    card_body.appendChild(header);
    card.appendChild(document.createElement("br"));
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
    
}
function logout() {
    firebase.auth().signOut().then(() => {
    }).catch(err => alert(err));
}