var dataInicial = document.querySelector('#start')
var dataFinal = document.querySelector('#end')
var valorBoleto = document.querySelector('#boleto')

function calculateDateDiff() {
    let start = dataInicial.value
    let end = dataFinal.value

    start = new Date(start)
    end = new Date(end)

    let diffInTime = Math.abs(end - start)
    let timeInOneDay = 1000 * 60 * 60 * 24
    let diffInDays = diffInTime / timeInOneDay

    return diffInDays
}


function calculoJuros() {
    var boleto = Number(valorBoleto.value)
    const diffInDays = calculateDateDiff()

    var juros = (((boleto * 0.01) / 30) * diffInDays)

    var formatJuros = juros.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    view1.innerHTML = formatJuros

    return juros
}

function calculoMulta() {
    var porcentMulta = document.querySelector("input[name='porcentagem']:checked").value;
    var boleto = Number(valorBoleto.value)

    var multa = boleto * porcentMulta

    var formatMulta = multa.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    view2.innerHTML = formatMulta

    return multa
}

function total(){
    var boleto = Number(valorBoleto.value)
    const juros = calculoJuros()
    const multa = calculoMulta()

    var total = (juros + (multa + boleto))

    var formatTotal = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    view3.innerHTML = formatTotal
}