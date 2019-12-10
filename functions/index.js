const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.insertDate = functions.database.ref('conteudo/eventos/{pushId}').onCreate((val, context) => {
    if (val.val()) {
        const conteudo = JSON.parse(JSON.stringify(val.val()));
        var data = conteudo.data;
        var tem = false;
        admin.database().ref('conteudo/dias').on('value', dado => {
            if (dado.val()) {
                const dataset = JSON.parse(JSON.stringify(dado.val()));
                var s = dataset.dia;
                if (s.isEqual(data)) {
                    tem = true;
                }
            }
        }
        );
        if (!tem) {
            return admin.database().ref('conteudo/dias/'+data.split('/').join('')).set({ 'dia': data }).then(val =>{
                console.log('ok');
                return null; 
            }).catch(e=>{

            });
        }

    }
})

exports.sendmessaging = functions.database.ref('conteudo/feed/{pushId}').onCreate((messagen, context) => {
    if (messagen.val()) {
        const message = JSON.parse(JSON.stringify(messagen.val()));
        var titulo = message.titulo;
        var corpo = message.descricao;
        var notificar = message.notificar;
        if (notificar === true) {
            const payload = {
                notification: {
                    title: titulo,
                    body: corpo,
                    badge: '1',
                    sound: 'default'
                }
            };
            return admin.database().ref('administracao/tokens').on('child_added', tokenn => {
                if (tokenn.val()) {
                    const token = tokenn.val();
                    if (token !== '-') {
                        return admin.messaging().sendToDevice(token, payload);
                    }
                }
            }
            );
        }
    } else {
        console.log('No token available');
    }
});

exports.removeDate = functions.database.ref('conteudo/eventos/{pushId}').onDelete((val, context) => {
    if (val.val()) {
        const conteudo = JSON.parse(JSON.stringify(val.val()));
        var data = conteudo.data.split('/').join('');
        var tem = true;
        var lista = []
        admin.database().ref('conteudo/eventos').on('value', dado => {
            if (dado.val()) {
                const dataset = JSON.parse(JSON.stringify(dado.val()));
                var s = dataset.data.split('/').join('');
                lista.add(s);
            }
        }
        );
        lista.forEach(element => {
            if (element.isEqual(data)) {
                tem = false;
            }
        });
        if (tem) {
            return admin.database().ref('conteudo/dias/'+data).child('dia').remove().then(val=>{
                console.log('ok');
                return null; 
            }).catch(e=>{
                
            });
        }

    }
})