
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
let cardtitle = document.createElement("h3");
cardtitle.innerText = 'Notícias';
CARD_CONTAINER.appendChild(cardtitle); 
var ref = firebase.database().ref('conteudo').child('feed');

function criarCard() {
    var card = {
        titulo: $("#titulo").val(),
        imagemtema: $("#imagemtema").val(),
        descricao: $("#descricao").val(),
        notificar:$('#notificar').prop("checked"),
    }

    if (card.titulo != '' && card.descricao != '' && card.imagemtema != '') {
        try{
            ref.push(card).then(() => {
            }).catch(err => alert(err));
        }catch(ex){
            alert(ex);
        }
    
        $("#titulo").val('');
        $("#descricao").val('');
        $("#imagemtema").val('');
        $('#notificar').prop("checked", false);;
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
    header.innerText = informacao.titulo;
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let descricao = document.createElement("p");
    descricao.classList.add('card-text');
    descricao.innerText = 'Descrição: ' + informacao.descricao;
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
    card_body.appendChild(descricao);
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
