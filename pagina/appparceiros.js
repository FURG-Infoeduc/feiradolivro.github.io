/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
let cardtitle = document.createElement("h3");
cardtitle.innerText = 'Parceiros';
CARD_CONTAINER.appendChild(cardtitle); 

var ref = firebase.database().ref('conteudo').child('parceiros');
/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        nome: $("#nomeparceiro").val(),
        logo: $("#imagemtema").val(),
    }

    if (card.nome != '' && card.logo != '') {
        try{
            ref.push(card).then(() => {
            }).catch(err => alert(err));
        }catch(ex){
            alert(ex);
        }

        $("#nomeparceiro").val('');
        $("#imagemtema").val('');
    }
    else {
        alert('Preencher os campos com asterisco!')
    }
};

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
    var card = document.getElementById(id);
    ref.child(id).remove().then(() => {
        card.remove()
    }).catch(err => alert(err));
};


/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    ref.orderByKey().on('child_added', snapshot => {
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
    let header = document.createElement("h3");
    header.innerText = informacao.nome;
    let nnimage = document.createElement("p");
    nnimage.innerText = "Nome imagem: "+informacao.logo;
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('del');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'Remover';
    inner.appendChild(button_del);
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
    card_body.appendChild(nnimage);
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