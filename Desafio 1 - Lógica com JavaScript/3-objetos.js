const usuarios = [
    { nome: "Carlos", tecnologias: ["HTML", "CSS"] },
    { nome: "Jasmine", tecnologias: ["JavaScript", "CSS"] },
    { nome: "Tuane", tecnologias: ["HTML", "Node.js"] }
]

for ( let usuario of usuarios){
    console.log(`${usuario.nome} trabalha com ${usuario.tecnologias.join(', ')}`)
}                                      

function checaSeUsuarioUsaCSS (usuario){
    for (let tecnologia of usuario.tecnologias){
        if(tecnologia == 'CSS') return true          
    }                    
    return false     
}

for (let i = 0; i < usuarios.length; i++) {
   
    if(checaSeUsuarioUsaCSS(usuarios[i])){
        console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
    }    
}

