---
title: Logica
tags: ''
---
# Lógica de Funcionamento do Projeto


## O código possui 7 variáveis principais, sendo elas:

* 2x para a configuração por peso;
* 2x para a configuração por intervalo;
* 1x para guardar a quantidade de ração no pote;
* 1x para guardar a quantidade de ração no prato;
* 1x para guardar a configuração selecionada;

## Tela
#### A configuração será feita através da tela LCD, divida em duas partes principais:

* Tela 1: mostrará as configurações atuais;
* Tela 2: mostrará as opções para definir uma configuração;

Essas telas possuem outras sub-telas, formando no total um menu simples e completo.

 A tela 2 é o que definirá as demais funções do sistema, pois é nela que escolhemos qual configuração vamos usar, e com quanta quantidade e/ou intervalo. As configurações podem ser duas:
 
 * Por peso: Usuário define o peso padrão de ração a ser colocado no pote, e qual a quantidade mínima de ração no pote para que haja o reabastecimento.
 
 * Por intervalo: Usuário define o peso padrão de ração a ser abastecido no pote, e o intervalo de tempo que o abastecimento acontecerá.
 
 Com estas configurações definidas e salvas, elas já vão constar automaticamente na tela 1 para que o usuário possa acompanhar. Além disso, todo o resto do sistema se inicia.
 
## Sistema
 
#### A partir do momento em que tudo foi definido, as taras de peso já medidas e a relação rotação/gramas já configurada, o sistema se inicia e começa a funcionar conforme o tipo de configuração definida:
 
 * Por peso: Se o prato estiver vazio, o motor rodará X vezes até alcançar a quantidade padrão escolhida. A partir de então, se o prato atingir o peso mínimo de abastecimento configurado, o motor roda até a quantidade padrão novamente.
 
 * Por intervalo: A partir do momento em que a configuração intervalo for definida, o motor instantaneamente rodará X vezes até que atinja o a quantidade padrão escolhida. E a cada X intervalo escolhido, o motor rodará até a quantidade padrão novamente.
 
No fim, utilizamos uma variável para guardar qual configuração foi escolhida, para que certos avisos sejam ou não exibidas ao usuário.
 
Fora essas funções, temos algumas que funcionam independentemente da configuração escolhida, como os leds e o sensor de peso do pote. Eles funcionam em conjunto, a partir da seguinte definição:

 * Se o sensor de peso do pote <= 200, então led RGB ficará vermelho.
 
 * Se o sensor de peso do pote > 200 e <= 700, então led RGB ficará amarelo.
  
 * Se o sensor de peso do pote > 700, então led RGB ficará verde.
 
E assim, com todos esses componentes unidos e essa lógica, o Alimentador de Pets funcionará perfeitamente, ajudando a vida de várias pessoas e enchendo a barriguinha de vários pets.

![Montagem](/montagem.png)