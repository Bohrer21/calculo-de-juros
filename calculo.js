var dataInicial = window.document.querySelector('#start')
var dataFinal = window.document.querySelector('#end')

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
    var valorBoleto = window.document.getElementById('boleto')
    var res = window.document.getElementById('res')
    var boleto = Number(valorBoleto.value)
    const diffInDays = calculateDateDiff()

    var juros = (((boleto * 0.1) / 30) * diffInDays)

    res.innerHTML = juros
}
