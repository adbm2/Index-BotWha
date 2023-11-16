const { Client } = require('whatsapp-web.js');

const client = new Client();
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const moment = require('moment-timezone');


const config = {

    timezone: 'America/Bogota', 

};

async function run() {
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  
  client.on('ready', () => {
    console.log('Conexion completada');
  });


  await client.initialize();


 
    function salinicio() {
    const dataAtual = new Date();
    const hora = dataAtual.getHours();


    let saludoinicial;
            if (hora >= 6 && hora < 12) {
              saludoinicial = `Buenos dias.    
Good morning.    
Bonjour.     
Bom Dia. `;
            } else if (hora >= 12 && hora < 17) {
              saludoinicial = `Buenas tardes.    
Good afternoon.     
Bonsoir.  
Boa tarde. `;
            } else {
              saludoinicial = `Buenas noches.    
Good night.     
Bonne nuit.     
Boa noite`;
            }

        return saludoinicial;
        }



  const delay = ms => new Promise(res => setTimeout(res, ms));



  
  client.on('message', async msg => {

    if (
      msg.body.match(/(buenas noches|buenos dias|menu|buenas tardes|hola|dia|informacion|Imagen|videos|audios|teste)/i) &&
      msg.from.endsWith('@c.us')
     
    )
    {
      const chat = await msg.getChat();
      chat.sendStateTyping();
      await delay(1000);
      const menuMessage = `- Hola soy bot, estoy para servirte, dime qué opción quieres seleccionar:

- Hello, I am a bot and I am here to serve you, tell me which option you want to select:

- Bonjour, je suis un bot et je suis là pour vous servir, dites-moi quelle option vous souhaitez sélectionner:

- Olá, sou um bot e estou aqui para atendê-lo, diga-me qual opção deseja selecionar:
       \n1.   - Para saludar. 
      - To greet.
      - Pour saluer.
      - Para saudar. 
      \n2.  - Poder ver y saber la hora. 
      - Being able to see and know the time. 
      - Pouvoir voir et connaître l'heure. 
      - Ser capaz de ver e saber a hora`;

      await client.sendMessage(msg.from, menuMessage);    
   
    }
    else if (msg.body.trim() === "1") {
        
        //Codigo de saluda = 1
        const saudacoes = salinicio();
        await client.sendMessage(msg.from, `${saudacoes}`);

    } else if (msg.body.trim() === "2") {

        // Codigo de hora actual = 2
        const currentDateTime = moment().tz(config.timezone).format('YYYY-MM-DD HH:mm:ss');
        await client.sendMessage(msg.from, `La hora actual en este momento es: ${currentDateTime}

The current time at this moment is: ${currentDateTime}

L'heure actuelle à ce moment est: ${currentDateTime}

A hora atual neste momento é: ${currentDateTime}`);
    }
   


  });
 
  function waitForResponse() {
    return new Promise((resolve, reject) => {
      client.on('message', async msg => {
        if (msg.from.endsWith('@c.us')) {
          resolve(msg);
        }
      });
    });
  }
}  
run().catch(err => console.error(err));