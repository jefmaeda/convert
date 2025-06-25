// Cotação de moedas do dia.
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

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

// Captando o evento de submit do formulario
form.onsubmit = (event) => {
  event.preventDefault()
  
  switch (currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
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