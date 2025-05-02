var dataInicial = document.querySelector('#start')
var dataFinal = document.querySelector('#end')
var valorBoleto = document.querySelector('#boleto')
const localStorageKey = 'juros-e-multa'

function calculateDateDiff() {
    let start = new Date(dataInicial.value)
    let end = new Date (dataFinal.value)

    start = new Date(start);
    end = new Date(end);

    let timeInOneDay = 1000 * 60 * 60 * 24;
    return Math.floor((end - start) / timeInOneDay);
}

function calculoJuros() {
    let boleto = Number(valorBoleto.value)
    let diffInDays = calculateDateDiff()

    let juros = (((boleto * 0.01) / 30) * diffInDays)

    return juros
}

/*function calculoMulta() {
    const boleto = Number(valorBoleto.value);
    const dataVenc = new Date(dataInicial.value);
    const dataPagto = new Date(dataFinal.value);

    let multaPercentual = 0;

    if(dataPagto > dataVenc){
        multaPercentual += 0.02;

        let proximoMes = new Date(dataVenc);
        proximoMes.setMonth(proximoMes.getMonth() + 1);
        proximoMes.setDate(1);

        let mesesAdicionais = 0;
        while (proximoMes <= dataPagto) {
            mesesAdicionais++;
            proximoMes.setMonth(proximoMes.getMonth() + 1);
        }

        multaPercentual += mesesAdicionais * 0.02;

        if (multaPercentual > 0.10) {
            multaPercentual = 0.10;
        }
    }

    const multa = boleto * multaPercentual;

    return multa;
}*/

function calculoMulta() {
    var porcentMulta = document.querySelector("input[name='porcentagem']:checked").value;
    var boleto = Number(valorBoleto.value)

    var multa = boleto * porcentMulta

    return multa
}

function total(){
    let boleto = Number(valorBoleto.value)
    let juros = calculoJuros()
    let multa = calculoMulta()

    let total = (juros + (multa + boleto))
    
    return total
}

function novoCalculo(){

    let values  = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
        data: dataInicial.value.split('-').reverse().join('/'),
        valor1: calculoJuros(),
        valor2: calculoMulta(),
        valor3: total()
    })

    localStorage.setItem(localStorageKey, JSON.stringify(values))
    getCalculos()
}

function getCalculos(){

    let values  = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('resultado')
    list.innerHTML = ''

    for(let i = 0; i < values.length; i++){
        
        let jurosFormatado = parseFloat(values[i]['valor1']).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        let multaFormatada = parseFloat(values[i]['valor2']).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        let totalFormatado = parseFloat(values[i]['valor3']).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        
        let newRow = `<tr>
                        <td>${values[i]['data']}</td>
                        <td>${jurosFormatado}</td>
                        <td>${multaFormatada}</td>
                        <td>${totalFormatado}</td>
                        <td><button id='btn-remove' onclick='excluirItem("${values[i]}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg></button></td>
                      </tr>`
                      
        list.innerHTML += newRow;
        verificarExclusaoTotal()
    }

}

function excluirItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.valor1 == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    getCalculos()
    verificarExclusaoTotal()
}

function verificarExclusaoTotal(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let btn = document.getElementById('btn-Limpar')

    if(values.length > 0){
        btn.style.display = "block"
    } else{
        btn.style.display = "none"
    }
}

function exclusaoTotal(){
    localStorage.removeItem(localStorageKey)
    document.getElementById('resultado').innerHTML = ''
    verificarExclusaoTotal()
}

getCalculos()
