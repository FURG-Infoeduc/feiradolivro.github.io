
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendmessaging = functions.database.ref('conteudo/feed/{pushId}').onCreate((messagen, context) => {
    if(messagen.val()){
        const message = JSON.parse(JSON.stringify(messagen.val()));
            var titulo = message.titulo;
            var corpo = message.descricao;
            const payload = {
                notification:{
                    title : titulo,
                    body : corpo,
                    badge : '1',
                    sound : 'default'
                }
            };
        return admin.database().ref('administracao/tokens').on('child_added', tokenn => {
            if(tokenn.val()){
                const token = tokenn.val();
                if (token != '-'){
                    return admin.messaging().sendToDevice(token, payload);
                }
            }
        }
        );
    }else{
        console.log('No token available');
    }
});
