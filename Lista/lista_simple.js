//selectores

const agregar_input = document.querySelector('#agregar_dato')
const agregar_boton = document.querySelector('#boton_agregar')
const agregar_opcion = document.getElementsByName('opcion_agregar')

const eliminar_boton = document.querySelector('#boton_eliminar')
const eliminar_opcion = document.getElementsByName('opcion_eliminar')


const buscar_input = document.querySelector('#buscar_dato')
const buscar_boton = document.querySelector('#boton_buscar')


const contador_nodos = document.querySelector('#contador_nodos_simple')

const contenedor_nodos  = document.querySelector('.contenedor-nodos')



//eventos botones

agregar_boton.addEventListener('click',agregar)
eliminar_boton.addEventListener('click',eliminar)
buscar_boton.addEventListener('click',buscar)

//funciones

async function agregar(){
    if(agregar_opcion[0].checked){
        lista.insertar_primero(agregar_input.value)
        const nodo = document.createElement('div')
        nodo.className = 'nodo'
        contenedor_nodos.prepend(nodo)
        await delay()

        const nodo_dato = document.createElement('div')
        nodo_dato.className = 'dato'
        nodo_dato.innerText = agregar_input.value
        nodo.appendChild(nodo_dato)
        await delay()

        const nodo_flecha = document.createElement('div')
        nodo_flecha.className = 'flecha'
        nodo_flecha.innerHTML = '&rightarrow;'
        nodo.appendChild(nodo_flecha)
        contador_nodos.innerText = 'Total nodos: '+lista.contar_nodos()
    }
    else if(agregar_opcion[1].checked){
        lista.insertar_ultimo(agregar_input.value)
        const nodo = document.createElement('div')
        nodo.className = 'nodo'
        contenedor_nodos.appendChild(nodo)
        await delay()

        const nodo_dato = document.createElement('div')
        nodo_dato.className = 'dato'
        nodo_dato.innerText = agregar_input.value
        nodo.appendChild(nodo_dato)
        await delay()

        const nodo_flecha = document.createElement('div')
        nodo_flecha.className = 'flecha'
        nodo_flecha.innerHTML = '&rightarrow;'
        nodo.appendChild(nodo_flecha)
        contador_nodos.innerText = 'Total nodos: '+lista.contar_nodos()
        
    }
}

async function eliminar(){
    if(eliminar_opcion[0].checked){
        lista.eliminar_primero()
        contenedor_nodos.firstChild.className = 'eliminar'
        await delay()
        contenedor_nodos.removeChild(contenedor_nodos.firstChild)
        contador_nodos.innerText = 'Total nodos: '+lista.contar_nodos()
    }
    else if(eliminar_opcion[1].checked){
        lista.eliminar_ultimo()
        contenedor_nodos.lastChild.className = 'eliminar'
        await delay()
        contenedor_nodos.removeChild(contenedor_nodos.lastChild)
        contador_nodos.innerText = 'Total nodos: '+lista.contar_nodos()
    }
}

function buscar(){
    lista.marcar_nodo_encontrado(buscar_input.value)
}

async function delay(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(
                console.log()
            )
        }, 500);
    })
}





//clases

class Nodo{
    constructor(dato){
        this.dato = dato
        this.siguiente = null
    }
}

class ListaSimple{
    constructor(){
        this.head = null
    }
    Vacia(){
        if(this.head === null){
            return true
        }
        else{
            return false
        }
    }
    insertar_primero(valor){
        let nuevo_nodo = new Nodo(valor)
        if(this.Vacia()){
            this.head = nuevo_nodo
        }
        else{
            nuevo_nodo.siguiente = this.head
            this.head = nuevo_nodo
        }
    }
    eliminar_primero(){
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            let auxiliar = this.head.siguiente
            this.head = null
            this.head = auxiliar
        }
    }
    Ultimo(){
        let actual = this.head
        while(actual.siguiente !== null){
            actual = actual.siguiente
        }
        return actual
    }
    Penultimo(){
        let actual = this.head
        while(actual.siguiente.siguiente !== null){
            actual = actual.siguiente
        }
        return actual
    }
    insertar_ultimo(valor){
        let nuevo_nodo = new Nodo(valor)
        if(this.Vacia()){
            this.head = nuevo_nodo
        }
        else{
            this.Ultimo().siguiente = nuevo_nodo
        }
    }
    eliminar_ultimo(){
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            if(this.contar_nodos() === 1){
                this.head = null
            }
            else{
                this.Penultimo().siguiente = null
            }
        }
    }

    buscar_nodo(valor){
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            let actual = this.head
            let encontrado = false
            while(actual !== null && encontrado === false){
                if(actual.dato === valor){
                    encontrado = true
                }
                else{
                    actual = actual.siguiente
                }
            }
            return encontrado
        }
    }
    obtener_nodo(valor){
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            if(this.buscar_nodo(valor)){
                let actual = this.head
                let encontrado = false
                while(actual !== null && encontrado === false){
                    if(actual.dato === valor){
                        encontrado = true
                    }
                    else{
                        actual = actual.siguiente
                    }
                }
                return actual
            }
            else{
                console.log('El elemento no esta en la lista')
            }
        }
    }
    contar_nodos(){
        let contador = 0
        if(this.Vacia()){
            return contador
        }
        else{
            let actual = this.head
            while(actual !== null){
                contador++
                actual = actual.siguiente
            }
        }
        return contador
    }

    async mostrar_nodos(){
        let actual = this.head
        contenedor_nodos.innerHTML = ''
        while(actual !== null){
            const nodo = document.createElement('div')
            nodo.className = 'nodo'
            contenedor_nodos.appendChild(nodo)
            await delay()

            const nodo_dato = document.createElement('div')
            nodo_dato.className = 'dato'
            nodo_dato.innerText = actual.dato
            nodo.appendChild(nodo_dato)
            await delay()

            const nodo_flecha = document.createElement('div')
            nodo_flecha.className = 'flecha'
            nodo_flecha.innerHTML = '&rightarrow;'
            nodo.appendChild(nodo_flecha)
            actual = actual.siguiente
        }
    }

    async marcar_nodo_encontrado(valor){
        let actual = this.head
        let encontrado = false
        const nodos_contenedor = contenedor_nodos.childNodes
        let indice = 0
        if(this.buscar_nodo(valor)){
            while(actual !== null && encontrado === false){
                if(actual.dato === valor){
                    nodos_contenedor[indice].className = 'encontrado'
                    encontrado = true
                }
                else{
                    nodos_contenedor[indice].className = 'nodo'
                    actual = actual.siguiente
                    indice++
                }
            }
        }
    }
    
}

let lista = new ListaSimple()




