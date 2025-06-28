// Cotação de moedas do dia.
// const USD = 4.87
// const EUR = 5.32
// const GBP = 6.08

// Obtendo os elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente numeros.
amount.addEventListener("input", () =>{
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex,"")
})

// Captando o evento de submit do formulario (clicar em "Converter")
form.onsubmit = async (event) => {
  event.preventDefault() // Impede o recarregamento da página

  // Chama a função para buscar as cotações atuais
  const exchange = await exchangeRate()
  if(!exchange) result; // Se houve erro ao buscar, para a execução
  
  // Verifica qual moeda o usuário escolheu no <select>
  switch (currency.value){
    case "USD":
      // Se for dólar, usa a cotação USD vinda da API e passa para a função de conversão
      convertCurrency(amount.value, exchange.USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, exchange.EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, exchange.GBP, "£")
      break
    default:
      // Caso o usuário não selecione nada válido
      alert("Selecione uma moeda válida.");
  }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol){
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o total.
    let total = amount * price

    // Verifica se o resultado não é um número
    if (isNaN(total)){
      return alert("Por favor, digite o valor corretmente para converter.")
    }

    //Formatar o velor total, sem o R$
    total = formatCurrencyBRL(total).replace("R$","")

    // Exibe o resultado total.
    result.textContent = `${total} Reais`

    // Limpar os campos do from
    fromClaer()

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")
  } catch (error) {
    
    //Remove a classe do footer ocultando ele.
    footer.classList.remove("show-result")
    alert("Não foi possível converter. Tente novemanete mais trde.")
  }
}

// Formata a moeda em BRL
function formatCurrencyBRL(value) {
  // Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00)
  return Number(value).toLocaleString("pt-BR",{
    style: "currency",
    currency: "BRL",
  })
}

// Limpando o formulário
function fromClaer() {
  // Limpando os campos
  amount.value = ""
  currency.value = ""

  // Focando no campo do valor
  amount.focus()
}

// Busca as cotações mais recentes do dólar, euro e libra
async function exchangeRate() {
   // URL da API da AwesomeAPI com os pares BRL (real) para USD, EUR e GBP
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL"

  try {
    // Faz uma requisição HTTP para a API e espera (await) a resposta
    const response = await fetch(url);

    // Converte o corpo da resposta em JSON (objeto JavaScript)
    const data = await response.json();

    // Retorna as cotações extraídas do JSON, convertendo para número com parseFloat
    return {
      USD: parseFloat(data.USDBRL.high),
      EUR: parseFloat(data.EURBRL.high),
      GBP: parseFloat(data.GBPBRL.high),
    };
  } catch (error) {
    alert("Erro ao buscar as cotações. Tente novamente mais tarde.")
    // Retorna null para que o restante do código saiba que houve falha
    return null
  }
}