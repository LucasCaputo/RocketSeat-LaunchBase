const empresa = {
    nome: "RocketSeat",
    cor: "Roxo",
    foco: "Programação",    
    endereco: {
        rua: "Rua Guilherme Gembala",
        numero: "260",     
    },
};

console.log(`A empresa ${empresa.nome} está localizada na ${empresa.endereco.rua}, ${empresa.endereco.numero}`)

const programador = {
    nomeProgramador: "Carlos",
    idade: "32",
    Tecnologias: {
        nome: "C++",
        especialidade: "Desktop",
    },
};

console.log(`O usuário ${programador.nomeProgramador} tem ${programador.idade} anos e usa a tecnologia ${programador.Tecnologias.nome} com especialidade em ${programador.Tecnologias.especialidade}`)