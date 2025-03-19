# K6 API Notification Tests

Este repositório contém testes de carga para o módulo de notificações da API, utilizando K6 da Grafana Labs.

## Descrição

Este script executa testes de carga para duas operações principais do módulo de notificações:
1. Obtenção de notificações (GET)
2. Criação de novas notificações (POST)

O script foi desenvolvido para verificar o desempenho, estabilidade e comportamento da API sob carga controlada.

## Pré-requisitos

- [K6](https://k6.io/docs/getting-started/installation/) instalado em sua máquina
- Acesso à API de notificações
- Token de autenticação válido

## Configurações

O script utiliza as seguintes variáveis de ambiente que podem ser configuradas:

- `BASE_URL`: URL base da API (padrão: 'http://localhost:3000')
- `AUTH_TOKEN`: Token de autenticação para acessar a API (padrão: 'seu_token_aqui')

## Parâmetros de Teste

Por padrão, o teste utiliza a seguinte configuração:
- **Usuários Virtuais (VUs)**: 2
- **Duração**: 30 segundos

Você pode modificar estes parâmetros no objeto `options` dentro do script ou via linha de comando.

## Como Executar

### Execução Básica

```bash
k6 run script.js
```

### Com Variáveis de Ambiente

```bash
k6 run -e BASE_URL=https://sua-api.com -e AUTH_TOKEN=seu_token_real script.js
```

### Modificando Parâmetros via Linha de Comando

```bash
k6 run --vus 5 --duration 1m script.js
```

## Estrutura do Script

O script está organizado da seguinte forma:

1. **Imports e Configuração**:
   - Importação dos módulos necessários
   - Definição de variáveis de ambiente
   - Configuração dos parâmetros de teste

2. **Funções de Teste**:
   - `testGetNotifications()`: Testa o endpoint GET /notifications
   - `testPostNotification()`: Testa o endpoint POST /notifications

3. **Função Principal**:
   - Executa ambos os testes em sequência
   - Adiciona pausa entre iterações

## Verificações (Checks)

O script verifica os seguintes aspectos:

- **GET /notifications**:
  - Status 200 OK
  - Existência de notificações no body da resposta

- **POST /notifications**:
  - Status 201 Created

## Interpretação dos Resultados

Após a execução, o K6 exibirá um resumo dos resultados, incluindo:

- Quantidade de checks que passaram
- Métricas de desempenho (tempo de resposta, etc.)
- Taxa de requisições
- Dados transferidos

## Personalização

Você pode personalizar o script para:

1. Adicionar mais endpoints para teste
2. Modificar os parâmetros de carga
3. Adicionar checks mais específicos
4. Configurar thresholds (limiares) para falha automática

## Exemplo de Relatório

Após a execução, um relatório semelhante a este será exibido:

```
  execution: local
     script: script.js
     output: -

  scenarios: (100.00%) 1 scenario, 2 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 2 looping VUs for 30s (gracefulStop: 30s)

  ✓ GET status is 200
  ✓ has notifications
  ✓ POST status is 201

  checks.........................: 100.00% ✓ 168      ✗ 0    
  data_received..................: 24 MB   759 kB/s
  data_sent......................: 41 kB   1.3 kB/s
  http_req_blocked...............: avg=0.47ms   min=0s      med=0s      max=21.42ms  p(90)=0s      p(95)=0s     
  http_req_connecting............: avg=0.38ms   min=0s      med=0s      max=17.11ms  p(90)=0s      p(95)=0s     
  http_req_duration..............: avg=43.78ms  min=9.88ms  med=43.35ms max=83.57ms  p(90)=77.72ms p(95)=79.48ms
  http_req_failed................: 0.00%   ✓ 0        ✗ 112  
  http_req_receiving.............: avg=0.63ms   min=0.04ms  med=0.16ms  max=9.49ms   p(90)=2.04ms  p(95)=2.85ms 
  http_req_sending...............: avg=0.23ms   min=0.05ms  med=0.11ms  max=4.76ms   p(90)=0.26ms  p(95)=0.52ms 
  http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s     
  http_req_waiting...............: avg=40.75ms  min=9.32ms  med=38.7ms  max=81.85ms  p(90)=74.02ms p(95)=77.78ms
  http_reqs......................: 112     3.51632/s
  iteration_duration.............: avg=1.1s     min=1.05s   med=1.09s   max=1.35s    p(90)=1.13s   p(95)=1.14s  
  iterations.....................: 56      1.75816/s
  vus............................: 2       min=2      max=2
  vus_max........................: 2       min=2      max=2
```

## Próximos Passos Sugeridos

- Adicionar thresholds para falha automática quando o desempenho estiver abaixo do esperado
- Integrar ao pipeline CI/CD
- Expandir para testar outros endpoints da API
- Criar cenários mais complexos com ramping VUs

## Recursos Adicionais

- [Documentação Oficial do K6](https://k6.io/docs/)
- [Melhores Práticas para Testes de Carga](https://k6.io/docs/testing-guides/api-load-testing/)
- [Integração com CI/CD](https://k6.io/docs/integrations/)
