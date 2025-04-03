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

    let formatJuros = juros.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    //view1.innerHTML = formatJuros

    return juros
}


function getPorcentMulta(daysLate) {
    let mesesAtrasados = Math.floor(daysLate / 30);
    let porcentagem = Math.min((mesesAtrasados + 1) * 0.02, 0.10);
    return porcentagem;
}

function calculoMulta() {
    let boleto = Number(valorBoleto.value)
    let diffInDays = calculateDateDiff();

    let porcentMulta = getPorcentMulta(diffInDays);
    let multa = boleto * porcentMulta;

    //view2.innerHTML = multa.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    return multa
}

function total(){
    let boleto = Number(valorBoleto.value)
    let juros = calculoJuros()
    let multa = calculoMulta()

    let total = (juros + (multa + boleto))

    //view3.innerHTML = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    return total
}

function novoCalculo(){

    let values  = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
        data: dataInicial.value,
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
                        <td>${values[i]['data']}
                        <td>${jurosFormatado}</td>
                        <td>${multaFormatada}</td>
                        <td>${totalFormatado}</td>
                      </tr>`;
        list.innerHTML += newRow;
    }

}