
/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
   
    var config = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, url) {
                var ref = firebase.database().ref('url/');
                ref.once('value').then(snapshot => {
                    document.location = snapshot.val();
                });
            }
        },
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
    };
    //inicializa o firebase
    ui.start('#firebaseui-auth', config);
});