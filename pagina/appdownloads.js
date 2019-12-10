function logout() {
    firebase.auth().signOut().then(() => {
    }).catch(err => alert(err));
}