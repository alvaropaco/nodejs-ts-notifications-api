```ts
enum Channel {
  sms = 'sms',
  whatsApp = 'whatsApp',
}

interface Notification {
  // id da notificação no disparador
  id: string;

  // canal da notificação
  channel: Channel;

  // id do destinatário ex: +5511999999999
  to: string;

  // conteúdo da notificação
  body: string;

  // id definido pelos sistemas externos ao serviço de notificações
  externalId: string

  // other fields: recipients, timestamps, etc
}

export class NotificationSdk {
  // checks if a notification with the given externalId exists
  exists(externalId: string): Promise<boolean> {
    // mocked value, could return false
    return true;
  }
  
  // sends a notification
  send(channel: Channel, to: string, body: string, externalId: string): Promise<Notification> {
    // mocked charge
    const id = (Math.random() + 1).toString(36).substring(7);
    return { id, channel, to, body, externalId };
  }
}
```

Um serviço externo de disparo de notificações por SMS e WhatsApp fornece um método para disparo de notificações, mas não permite a consulta de notificações por API. Eles enviam as atualizações do status das notificações através de webhooks e, caso não consigam entregar o webhook, retentam a entrega por 1h após o evento. No entanto, disponibilizam um método para verificar se a notificação, dado seu id externo, foi enviada a eles.

Como não conseguimos consultar o status das notificações através da API, precisamos processar os webhooks e manter os registros atualizados em nosso banco de dados. 

As notificações de sms podem assumir os status processing, rejected, sent e delivered com as seguintes transições teóricas:
 - processing -> rejected
 - processing -> sent
 - sent -> delivered

As notificações de WhatsApp podem assumir os status processing, rejected, sent, delivered e viewed com as seguintes transições teóricas:
 - processing -> rejected
 - processing -> sent
 - sent -> delivered
 - delivered -> viewed

Os webhooks possuem o seguinte formato:
```json
{
  "timestamp": "YYYY-MM-DDThh:mm:ss.SSSZ",
  "event": "delivered" // or sent, etc
}
```

Em breve o sistema de notificações suportará novos canais com novos status e transições diferentes para cada canal.

Crie uma aplicação servida via Web API utilizando NodeJS/TypeScript que permita o envio, atualização e consulta dos status das notificações e disponibilize através de um repositório do GitHub. A escolha do banco de dados não é relevante para esse projeto, considere utilizar o SQLite por simplicidade.

1. Caso o nossa aplicação fique indisponível por muito tempo, podemos perder eventos de mudança de status. Quais medidas você tomaria para deixar a aplicação mais robusta?

- Alvaro: ***"Para resolver cenarios como esta onde precisamos garantir a disponibilidade da aplicacao, podemos utilizar o conceito de `dead letter queue` para garantir que os eventos nao sejam perdidos,implmentando um mecanismo de reprocessamento de eventos que nao foram processados com sucesso. Além disso podemos utilizar mecanismos the confirmacao de recebimento de mensagens como o `ack` para garantir que a mensagem foi processada com sucesso.***
***Portanto, para garantir a disponibilidade eu provavelmente optaria por implmentar algum sistema de persistencia de mensagens que nao foram processadas com sucesso e um mecanismo de reprocessamento dessas mensagens."***

2. Precisamos enviar os eventos de mudança de status das notificações para um stream de eventos (e.g. Apache Kafka, Amazon Kinesis Data Streams, etc) para que outras aplicações possam consumí-los. Precisamos garantir que cada evento seja entregado pelo menos uma vez no stream. Como você faria esse processo?

- Alvaro: ***"Para garantir que o evento foi entrege pelo meno uma vez, podemos tirar vantagem das ferramentas de ack "all" que o Apache Kafka e o Kinesis oferecem. Assim, garantimos que os eventos sejamreplicados nos brokers e que o evento seja processado com sucesso. Tambem é importante garantir a indepotencia dos sistemas que consomem esses eventos, para garantir que o evento nao seja processado mais de uma vez.= sem que o resultado seja diferente."***

3. Os eventos de mudança de estado podem vir fora de ordem caso o serviço externo de notificações demore para processar algumas notificações ou tenha alguma degradação de performance. Quais medidas você tomou ou tomaria para deixar a aplicação mais robusta a esse cenário?

- Alvaro: ***"Para garantir que os eventos sejam processados na ordem correta, podemos utilizar o conceitos de `event sourcing` e `event versioning` onde garantimos a consistencia eventual dos dados. Para isso, eu optaria por implmentar FIFO que ajudam na ordecao de eventos que exigem temporalidade e uma strutura de dados das mensagens onde teriamos um identificador único, sequencial e incremental dos dados (ID), bem como um timestamp da dadta de criação. Além disso, para melhorar na observabilidade de todo o conjunto de registro e eventos, podemos utilizar tracking id's que ajudam a rastrear o percurso dos eventos criados em uma arquitetura distribuida."***

## Entrega do Desafio ##
- Disponibilize o código em um repositório no GitHub.
- Inclua instruções detalhadas sobre como rodar o projeto.