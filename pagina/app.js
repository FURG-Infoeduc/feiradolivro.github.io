/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
let cardtitle = document.createElement("h3");
cardtitle.innerText = 'Eventos';
CARD_CONTAINER.appendChild(cardtitle);  
/**
     * firebase: objeto global
     * database(): metodo para acesso ao realtime database
     * ref(): url em string para referencia do caminho do banco
     * set(): metodo que cria dados na url passada
     */
var ref = firebase.database().ref('conteudo').child('eventos');
/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var dates = $("#data").val().split('-')
    var datetemp = dates[2]+'/'+dates[1]+'/'+dates[0];
    var card = {
        titulo: $("#titulo").val(),
        subtitulo: $("#subtitulo").val(),
        descricao: $("#descricao").val(),
        hora: $("#hora").val(),
        data: datetemp,
    }
    if (card.titulo != ''  && card.data != '' && card.hora != '') {
        /**
     * set(): metodo que cria dados na url passada
     * child(): acessa o nó filho passado por parametro
     */
        var rhora = RegExp("([0-9]{2}:[0-9]{2})");
        var rdata = RegExp("([0-9]{2}/[0-9]{2}/[0-9]{4})");
        if (rhora.test(card.hora) && rdata.test(card.data)) {
            ref.push(card).then(() => {
                //adicionaCardATela(card);
            }).catch(err => alert(err));
            
            /**
             * push(): cria id unico e insere os dados dentro desse uid
             */
            $("#titulo").val('');
            $("#subtitulo").val('');
            $("#descricao").val('');
            $("#hora").val('');
            $("#data").val('');
        }
        else {
            alert('Os campos data ou hora estão fora do padrão data: dd/mm/aaaa hora: hh:mm')
        }
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
    //.remove(): remove o nó em que o metodo é utilizado, remove também os nós dentro desse nó removido
    ref.child(id).remove().then(() => {
        card.remove()
    }).catch(err => alert(err));
};


/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    /** 
     * once(): retorna os dados lidos de uma url
     * snapshot: objeto retornado pela leitura
    */
    /**
     * .on():
     */

    /**
     * ORDENAÇÃO
     * .orderByChild('filho'): ordena pela propriedade filho
     */
    /**
     * .orderByKey(): Ordena por chave
     * .orderByValue(): ordena pela chave
     */
    ref.orderByKey().on('child_added', snapshot => {
        adicionaCardATela(snapshot.val(), snapshot.key)
    }).catch(err => alert(err))
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

    let data = document.createElement("p");
    data.classList.add('card-text');
    data.innerText = 'Data: ' + informacao.data;
    let subtitulo = document.createElement("p");
    subtitulo.classList.add('card-text');
    subtitulo.innerText = 'Subtítulo: ' + informacao.subtitulo;
    let descricao = document.createElement("p");
    descricao.classList.add('card-text');
    descricao.innerText = 'Descrição: ' + informacao.descricao;
    let hora = document.createElement("p");
    hora.classList.add('card-text');
    hora.innerText = 'Hora: ' + informacao.hora;
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
    card_body.appendChild(hora);
    card_body.appendChild(data);
    card_body.appendChild(subtitulo);
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