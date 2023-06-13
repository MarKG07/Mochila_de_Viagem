const form = document.getElementById("novoItem")//elemento pai (form) do formulario
const lista = document.getElementById("lista") //elemento pai(ul) do li criado acima
const itens = JSON.parse(localStorage.getItem("itens")) || [] //pega os elementos do localStorage (CONVERTE DE STRING PRA JSON DE VOLTA) caso n tenha ele cria um vazio

itens.forEach((elemento) => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome == nome.value) //pega o elemento e verifica se o valor é igual ao que foi adicionado pelo usuario (nome.value)
    console.log(existe)

    const itemAtual = { //objeto q pega as informações inseridas
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id //Usa como itemAtual o elemento q ja existe/ atribui o id do 'existe'(criado como dataset) ao itemAtual

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual //procura o valor de itens e compara dps sobscreve pelo 'itemAtual'
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1].id) + 1 : 0 //verifica se o array está vazio, se não tiver, pega a ultima posiçao e adciona um, se tiver atribui a zero

        criaElemento(itemAtual)

        itens.push(itemAtual) //adiciona o objeto dentro do array
    }



    localStorage.setItem("itens", JSON.stringify(itens)) //LocalStorage salva somente em string, mas retorna um objeto, por isso o 'stringfy'

    nome.value = ""
    quantidade.value = ""
})


function criaElemento(item) {

    const novoItem = document.createElement("li") //cria elemento html via js
    novoItem.classList.add("item") //adiciona classe no elemento

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade //adiciona quantidade(valor) dentro do elemento strong criado
    numeroItem.dataset.id = item.id //adiciona o dataset id dentro do strong

    novoItem.appendChild(numeroItem) //adiciona  o elemento dentro de outro via JS
    novoItem.innerHTML += item.nome //adiciona ele msm, mais o nome

    novoItem.appendChild(botaoDeleta(item.id))//recebe o botao de delete

    lista.appendChild(novoItem) //adiciona o elemento na lista ul

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade //pega o data pelo item id atribuido e atualiza a quantidade via html
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id) //this utilizado para especificar o elemento daquele botão/parentNode para remover o pai do elemento
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove() //recebe o elemento e deleta
    console.log(id)

    itens.splice(itens.find(elemento => elemento.id === id), 1) //procura o elemento nos itens e verifica se é igual ao id recebido
    
    localStorage.setItem("itens", JSON.stringify(itens)) //seta dnv
}