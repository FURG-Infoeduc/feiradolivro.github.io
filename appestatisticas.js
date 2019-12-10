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
var ref = firebase.database().ref('administracao/favoritos/');
var ref1 = firebase.database().ref('conteudo/eventos/');

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    var e = {};
    ref.on('child_added', snapshot => {
        snapshot.forEach((snapshot) => {
            var c = snapshot.val().toString();
            if (snapshot in e) {
                e[c]['qtd'] += 1;
            } else {
                e[c] = { 'qtd': 1, 'titulo': '' };
            }
        }
        );
        intermediario(e);
    });
});

function intermediario(e) {
    ref1.on("child_added", snapshot => {
        if (snapshot.key in e) {
            e[snapshot.key]['titulo'] = snapshot.val().titulo;
            adicionaCardATela(e[snapshot.key]['titulo'], e[snapshot.key]['qtd'], snapshot.key);
        }
    });
};

/**
 * Adiciona card na tela
 */
function adicionaCardATela(titulo, qtd, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = titulo;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let tipo = document.createElement("p");
    tipo.classList.add('card-text');
    tipo.innerText = 'No total ' + qtd + ' pessoas favoritaram o evento';

    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(tipo);
    card.appendChild(card_body);
    var doc = document.getElementById(id);
    if (doc != null) {
        $('#' + id).html(card_body);
    } else {
        CARD_CONTAINER.appendChild(card);
    }
    // insere no container

}

function logout() {
    firebase.auth().signOut().then(() => {
    });
}