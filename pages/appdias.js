/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
let cardtitle = document.createElement("h3");
cardtitle.innerText = 'Dias';
CARD_CONTAINER.appendChild(cardtitle); 

var ref = firebase.database().ref('conteudo').child('dias');
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
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);
    //.remove(): remove o nó em que o metodo é utilizado, remove também os nós dentro desse nó removido
    ref.child(id).remove().then(() => {
        card.remove()
    }).catch(err => alert(err));
};
/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h3");
    header.innerText = informacao.dia;
    // ===================================
    let inner = document.createElement("div");
    inner.classList.add('row')
     // Botão de excluir
     let button_del = document.createElement("button");
     button_del.classList.add('del');
     button_del.setAttribute('onclick', "deletar('" + id + "')");
     button_del.innerText = 'Remover';
     inner.appendChild(button_del);
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
    card_body.appendChild(inner);
    card.appendChild(document.createElement("br"));
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}
function logout() {
    firebase.auth().signOut().then(() => {
    }).catch(err => alert(err));
}