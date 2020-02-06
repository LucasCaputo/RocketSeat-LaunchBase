//nome, peso, altura

const nome1 = "Carlos"
const peso = 84
const altura = 1.88

let imc = peso / (altura * altura)

if (imc >= 30){
    console.log(`Carlos você está acima do peso`)
}else{
    console.log(`Carlos você não está acima do peso`)
}

// Cálculo de aposentadoria

const nome = "Silvana"
const sexo = "F"
const idade = 48
const contribuicao = 23

let soma = idade + contribuicao

if (sexo == "F" && contribuicao>=85){

    console.log(`${nome}, você pode se aposentar!`)

}else if (sexo == "M" && contribuicao>=95){

    console.log(`${nome}, você pode se aposentar!`)

}else{
    console.log(`${nome}, você ainda não pode se aposentar!`)
}
