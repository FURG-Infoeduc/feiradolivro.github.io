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
var ref = firebase.database().ref('conteudo/eventos/');
var ref1 = firebase.database().ref('conteudo/dias/');
var datas = []
/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
        titulo: $("#titulo").val(),
        subtitulo: $("#subtitulo").val(),
        autor: $("#autor").val(),
        autoremail: $("#autoremail").val(),
        autorformacao: $("#autorformacao").val(),
        autorprofissao: $("#autorprofissao").val(),
        linkedin: $("#linkedin").val(),
        lattes: $("#lattes").val(),
        imagemperfilautor: $("#imagemperfilautor").val(),
        imagemtema: $("#imagemtema").val(),
        descricao: $("#descricao").val(),
        tipo: $("#tipo").val(),
        hora: $("#hora").val(),
        data: $("#data").val(),
        avaliacao: 0,
        contadoravaliacoes: 0
    }
    if (card.titulo != '' && card.tipo != '' && card.data != '' && card.hora != '') {
        /**
     * set(): metodo que cria dados na url passada
     * child(): acessa o nó filho passado por parametro
     */
        var rhora = RegExp("([0-9]{2}:[0-9]{2})");
        var rdata = RegExp("([0-9]{2}/[0-9]{2})");
        if (rhora.test(card.hora) && rdata.test(card.data)) {
            ref.push(card).then(() => {
                //adicionaCardATela(card);
            });
            if (datas.indexOf(card.data) == -1) {
                try{
                    ref1.push(card.data).then(() => {
                    });
                }catch(ex){
                    alert(ex);
                }
            }
            /**
             * push(): cria id unico e insere os dados dentro desse uid
             */
            $("#titulo").val('');
            $("#subtitulo").val('');
            $("#autor").val('');
            $("#autoremail").val('');
            $("#autorformacao").val('');
            $("#autorprofissao").val('');
            $("#descricao").val('');
            $("#tipo").val('outros');
            $("#hora").val('');
            $("#data").val('');
            $("#imagemtema").val('');
            $("#imagemperfilautor").val('');
            $("#linkedin").val('');
            $("#lattes").val('');
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
    });
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
    })
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
    let header = document.createElement("h2");
    if (datas.indexOf(informacao.data) == -1) {
        datas.includes(informacao.data);
    }
    header.innerText = informacao.data;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let tipo = document.createElement("p");
    tipo.classList.add('card-text');
    tipo.innerText = 'Tipo: ' + informacao.tipo;
    let titulo = document.createElement("p");
    titulo.classList.add('card-text');
    titulo.innerText = 'Título: ' + informacao.titulo;
    let subtitulo = document.createElement("p");
    subtitulo.classList.add('card-text');
    subtitulo.innerText = 'Subtítulo: ' + informacao.subtitulo;
    let autor = document.createElement("p");
    autor.classList.add('card-text');
    autor.innerText = 'Autor: ' + informacao.autor;
    let autoremail = document.createElement("p");
    autoremail.classList.add('card-text');
    autoremail.innerText = 'Email: ' + informacao.autoremail;
    let autorformacao = document.createElement("p");
    autorformacao.classList.add('card-text');
    autorformacao.innerText = 'Formação: ' + informacao.autorformacao;
    let autorprofissao = document.createElement("p");
    autorprofissao.classList.add('card-text');
    autorprofissao.innerText = 'Profissão: ' + informacao.autorprofissao;
    let autorlattes = document.createElement("p");
    autorlattes.classList.add('card-text');
    autorlattes.innerText = 'Link Lattes: ' + informacao.lattes;
    let autorlinkedin = document.createElement("p");
    autorlinkedin.classList.add('card-text');
    autorlinkedin.innerText = 'Link LinkedIn: ' + informacao.autorlinkedin;
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
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
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
    card_body.appendChild(hora);
    card_body.appendChild(titulo);
    card_body.appendChild(subtitulo);
    card_body.appendChild(autor);
    card_body.appendChild(autoremail);
    card_body.appendChild(autorformacao);
    card_body.appendChild(autorprofissao);
    card_body.appendChild(descricao);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}

function mascara(id) {
    var valorcampo = document.getElementById(id).value
    if (id == 'data') {
        if (valorcampo.length == 2) {
            valorcampo += '/'
        }
    } else if (id == 'hora') {
        if (valorcampo.length == 2) {
            valorcampo += ':'
        }
    }
    document.getElementById(id).value = valorcampo;
}
function logout() {
    firebase.auth().signOut().then(() => {
    });
}