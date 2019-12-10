var currentuser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    firebase.auth().createUserWithEmailAndPassword(email, senha).then(user =>{
        //console.log('usuario', user);
        alert('usuario criado com sucesso');
        document.getElementById('email').value= '';
        document.getElementById('senha').value = '';
    })
}

/**
 * deletar um usuario
 */
function deletarUsuario(){
    if(currentuser){
        currentuser.delete().then(()=>{
            alert('usuario excluido')
        })
    }
}