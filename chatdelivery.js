const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const fs = require('fs');

const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp conectado. Tudo pronto, mestre jedi! 🚀🤖');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

let aguardandoNome = false;
let nome = '';
let aguardandoFormaPagamento = false;
let formaPagamento = '';
let aguardandoValorTroco = false;
let aguardandoObservacao = false;
let observacao = '';
let aguardandoObservacaoTexto = false;
let valorTroco = '';
let aguardandoTroco = false;
let pedidosite = '';
let link = 'https://tonysilva22.github.io/cardapio-online/';
          
// Funções auxiliares

function salvarResumoPedido(resumo) {
  fs.appendFile('resumos.txt', resumo + '\n', (err) => {
    if (err) {
      console.error('Erro ao salvar o resumo do pedido:', err);
    } else {
      console.log('Resumo do pedido salvo com sucesso!');
    }
  });
}

function cumprimentar() {
  const dataAtual = new Date();
  const hora = dataAtual.getHours();

  let saudacao;

  if (hora >= 6 && hora < 12) {
    saudacao = "Bom dia!";
  } else if (hora >= 12 && hora < 17) {
    saudacao = "Boa tarde!";
  } else {
    saudacao = "Boa noite!";
  }

  return saudacao;
}

function getNomeCliente(numero) {
  try {
    const data = fs.readFileSync('contatos.txt', 'utf8');
    const linhas = data.split('\n');
    for (const linha of linhas) {
      const [num, nome] = linha.split(',');
      if (num === numero) {
        return nome;
      }
    }
  } catch (err) {
    return null;
  }
  return null;
}

function salvarNomeCliente(numero, nome) {
  const data = `${numero},${nome}\n`;
  fs.appendFileSync('contatos.txt', data, { flag: 'a+' });
  console.log(`Salvo ${numero},${nome}\n`);
}


client.on('message', async (msg) => {
  const nomeCliente = getNomeCliente(msg.from);
  const lowerCaseMsg = msg.body.toLowerCase();

  if (msg.body === 'Boa tarde' || msg.body === 'boa tarde' || msg.body === 'BOA TARDE' ||
      msg.body === 'Boa noite' || msg.body === 'boa noite' || msg.body === 'BOA NOITE' ||
      msg.body === 'Oi' || msg.body === 'oi' || msg.body === 'OI' || msg.body === 'Olá' || msg.body === 'ola' ||
      msg.body === 'Ola' || msg.body === 'OLÁ' || msg.body === 'OLA' || msg.body === '') {

    if (nomeCliente && msg.from.endsWith('@c.us')) {
      await client.sendMessage(msg.from, `*${cumprimentar()} ${nomeCliente}!* 👋🏼\n\nBem-vindo ao nosso restaurante! Como posso ajudar você hoje? 🍔🍟🥤\n\n1️⃣ Ver o cardápio\n2️⃣ Conferir nossos horários de funcionamento\n`);
    } else {
      await client.sendMessage(msg.from, `${cumprimentar()} Seja bem-vindo(a) ao nosso restaurante! 😊\n\nAntes de prosseguirmos, por favor, poderia me informar o seu nome?`);
      aguardandoNome = true;
    }
  } else if (aguardandoNome && msg.from.endsWith('@c.us')) {
    nome = msg.body;
    aguardandoNome = false;
    salvarNomeCliente(msg.from, nome);
    await client.sendMessage(msg.from, `${nome}! 😄\n\nQue ótimo ter você aqui! Estou à disposição para ajudar. Como posso tornar sua experiência incrível hoje? 🍔🌟\n\n1️⃣ Ver o cardápio\n2️⃣ Conferir nossos horários de funcionamento\n`);
  } else if ((msg.body === '1' || lowerCaseMsg === 'ver o cardápio') && msg.from.endsWith('@c.us')) {
    await client.sendMessage(msg.from, `Certo, ${nomeCliente}, vou enviar o link do cardápio:\n*${link}*`);
    aguardandoFormaPagamento = true;
  } else if (aguardandoFormaPagamento && msg.from.endsWith('@c.us')) {
    pedidosite = msg.body;
    await client.sendMessage(msg.from, 'Ótimo! Agora, por favor, informe a forma de pagamento:\n*Pix*\n*Cartão*\n*Dinheiro*');
    aguardandoFormaPagamento = false;
 
  }


  else if (msg.body.toLowerCase() === 'pix') {
    const chat = await msg.getChat();
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    formaPagamento = 'Pix';
    await client.sendMessage(msg.from,`🌟 Perfeito, ${nomeCliente}! Agora você está quase lá. Para concluir o pagamento, utilize a nossa chave Pix: *ljihghv*. 📱💸\n\nAssim que recebermos a confirmação do pagamento, seu pedido será preparado com todo carinho!`
  );
  
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    await client.sendMessage(msg.from,`📝 Se tiver alguma observação para o pedido, digite 3️⃣.\n\n *Exemplo: 'Mais sorvete e menos açaí.'* \n\nSe não houver observações, digite 0️⃣ paraprosseguir.`);
    
    aguardandoObservacao = true;
    }


    
    else if (msg.body.toLowerCase() === 'cartão') {
    formaPagamento = 'Cartão';
    await client.sendMessage(msg.from, `Se você tiver alguma Observação, digite 3️⃣.\n\nExemplo: '1 hambúrguer no ponto médio, com queijo cheddar e maionese extra!'\n\nOu, para prosseguir com o pedido, digite 0️⃣.`);
    aguardandoObservacao = true;
}
  
   else if (aguardandoObservacao && msg.body.toLowerCase() === '3') {
    const chat = await msg.getChat();
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    await client.sendMessage(msg.from, `Qual é a sua Observação?`);
    aguardandoObservacaoTexto = true;
 
  } else if (aguardandoObservacaoTexto) {
    const chat = await msg.getChat();
    observacao = msg.body;
    aguardandoObservacaoTexto = false;
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    await client.sendMessage(msg.from, `Está correto?\n\n *${observacao}* \n\n Digite  0️⃣ para confirmar`);
  

  } else if (msg.body.toLowerCase() === 'dinheiro') {
    const chat = await msg.getChat();
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    formaPagamento = 'Dinheiro';
    await client.sendMessage(msg.from,`💵 Para facilitar a entrega, precisaremos saber se você precisa de troco. Por favor, escolha uma das opções abaixo:\n\n*Sim*, preciso de troco\n*Não*, não preciso de troco`);
  
    aguardandoTroco = true;
  
  
  
  } else if (aguardandoTroco && msg.from.endsWith('@c.us')) {
    const lowerCaseMsg = msg.body.toLowerCase();
    const chat = await msg.getChat();
    if (lowerCaseMsg === 'não' || lowerCaseMsg === 'não preciso') {
      await delay(2000);//delay de 3 segundos
      await chat.sendStateTyping();// Simulando Digitação
      await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
      await client.sendMessage(msg.from, `Se você tiver alguma Observação, digite 3️⃣.\n\nExemplo: '1 hambúrguer no ponto médio, com queijo cheddar e maionese extra!'\n\nOu, para prosseguir com o pedido, digite 0️⃣.`);
      aguardandoTroco = false;
  
  
    } else if (lowerCaseMsg === 'sim' || lowerCaseMsg === 'preciso') {
      const chat = await msg.getChat();
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    await client.sendMessage(msg.from,`💵 Certo, Para agilizar o processo de entrega, por favor, informe o valor para o troco. Você pode usar o seguinte exemplo como referência:\n\n*EXEMPLO: Preciso de troco para R$ 100,00*`
  );
      aguardandoValorTroco = true;
      aguardandoTroco = false;
    }
    
  } else if (aguardandoValorTroco && msg.from.endsWith('@c.us')) {
    const chat = await msg.getChat();
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
       valorTroco = msg.body;
    if (!isNaN(valorTroco) && valorTroco > 0) {
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    await client.sendMessage(msg.from, `Se você tiver alguma Observação, digite 3️⃣.\n\nExemplo: '1 hambúrguer no ponto médio, com queijo cheddar e maionese extra!'\n\nOu, para prosseguir com o pedido, digite 0️⃣.`);
    aguardandoObservacao = true;
    aguardandoValorTroco = false;
    
    }

  } else if ((msg.body.toLowerCase() === 'finalisz' || msg.body === '0') && msg.from.endsWith('@c.us')) {
    const chat = await msg.getChat();
    await delay(2000);//delay de 3 segundos
    await chat.sendStateTyping();// Simulando Digitação
    await delay(4000);//Delay de 3000 milisegundos mais conhecido como 3 segundos
    //------------------------------------------------------------------------------------------------------------
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString();
    const horaFormatada = dataAtual.toLocaleTimeString();

    let resumo = `*Resumo do Pedido de ${nomeCliente}:*\n`;
    resumo += `Data: ${dataFormatada} - Hora: ${horaFormatada}\n\n`;
    resumo += `Forma de Pagamento: ${formaPagamento}\n`;
    resumo += `${pedidosite}\n\n`;
    if (observacao.trim() !== '') {
      resumo += `*Observacao*: ${observacao}\n\n`;
    }
    resumo += `\n*Perfeito, ${nomeCliente}! Seu pedido foi registrado e está sendo processado.*\n`;
    resumo += `Agradecemos por escolher nosso restaurante! Você será informado sobre o status da entrega em breve.`;
    await client.sendMessage(msg.from, resumo);
    const otherNumber = '55';
    await client.sendMessage(otherNumber + '@c.us', resumo);
    console.log('resuno do pedido enviado para tony')
    salvarResumoPedido(resumo);

}
   if ((msg.body === '2' || msg.body.toLowerCase() === 'Horário de Funcionamento') && msg.from.endsWith('@c.us')) {
  await client.sendMessage(msg.from, `⏰ Horário de Funcionamento:\n\n📅 Segunda a Quinta: 13h às 21h\n📅 Sexta: 13h às 17h\n📅 Sábado: 18h às 22h\n📅 Domingo: 13h às 22h\n\nEstamos ansiosos para atendê-lo(a)! Caso queira fazer um pedido, digite 1️⃣.`);

 }


});
