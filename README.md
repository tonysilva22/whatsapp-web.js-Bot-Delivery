# WhatsApp Bot para Serviço de Delivery

Este é um bot WhatsApp projetado para um serviço de delivery. Ele oferece uma experiência interativa para os clientes, permitindo que façam pedidos, escolham opções de pagamento e forneçam informações adicionais sobre o pedido.

## Funcionalidades

- **Cumprimento Personalizado**: O bot saúda o cliente com base no horário do dia.

- **Registro de Cliente**: Solicita e armazena o nome do cliente para futuras interações.

- **Apresentação do Cardápio**: Envia o link do cardápio para que o cliente possa visualizar as opções disponíveis.

- **Seleção de Itens do Cardápio**: Permite ao cliente escolher itens específicos do cardápio.

- **Quantidade e Observações**: Permite ao cliente especificar a quantidade desejada e fornecer observações adicionais para cada item.

- **Forma de Pagamento**: Oferece opções de pagamento, incluindo Pix, Cartão e Dinheiro.

- **Troco (se aplicável)**: Solicita ao cliente que indique se precisa de troco e forneça o valor, se necessário.

- **Resumo do Pedido**: Apresenta um resumo do pedido ao cliente antes de finalizá-lo.

- **Status do Pedido**: Notifica o cliente sobre o status do pedido (recebido, em preparo, a caminho, entregue, etc.).

## Uso

1. **Iniciar o Bot**: Execute o código e escaneie o QR Code exibido no console para conectar o bot ao WhatsApp.

2. **Interagir com o Cliente**: O bot cumprimentará o cliente e solicitará o nome, se ainda não estiver registrado.

3. **Solicitar o Cardápio**: O cliente pode solicitar o cardápio digitando `1` ou `Ver o cardápio`.

4. **Selecionar Itens do Cardápio**:
   - O cliente escolhe os itens desejados e especifica a quantidade.

5. **Adicionar Observações (Opcional)**: O cliente pode fornecer observações adicionais para os itens.

6. **Selecionar Forma de Pagamento**: O bot oferece opções de pagamento (Pix, Cartão ou Dinheiro).

7. **Troco (se aplicável)**: Se o pagamento for em dinheiro, o cliente pode indicar se precisa de troco e fornecer o valor.

8. **Resumo do Pedido**: O bot apresenta um resumo do pedido para confirmação.

9. **Status do Pedido**: O cliente recebe notificações sobre o status do pedido.

## Configuração

Antes de usar o bot, siga estas etapas:

1. Instale as dependências:

   ```bash
   npm install qrcode-terminal 
   npm install whatsapp-web.js 
   ```

2. Inicie o bot com o comando:

   ```bash
   node bot.js
   ```

3. Escaneie o QR Code exibido no console com o WhatsApp.

## Observações

- O bot armazena os nomes dos clientes e resumos dos pedidos em arquivos de texto.

- Para informações sobre como configurar e personalizar o bot, consulte a documentação do [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js).

---

