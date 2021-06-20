//Selectores

const agregar_input_doble = document.querySelector('#agregar_dato_doble')
const agregar_boton_doble = document.querySelector('#boton_agregar_doble')
const agregar_opcion_doble = document.getElementsByName('opcion_agregar_doble')

const eliminar_opcion_doble = document.getElementsByName('opcion_eliminar_doble')
const eliminar_boton_doble = document.querySelector('#boton_eliminar_doble')

const eliminar_especifico = document.querySelector('#eliminar_especifico')
const boton_eliminar_especifico = document.querySelector('#boton_eliminar_especifico')

const contador_nodos_dobles = document.querySelector('#contador_nodos_dobles')
const contenedor_nodos_doble = document.querySelector('.contenedor_nodos_doble')

const buscar_doble_input = document.querySelector('#buscar_dato_doble')
const boton_buscar_doble = document.querySelector('#boton_buscar_doble')

const modificar_especifico_input = document.querySelector('#modificar_especifico')
const modificar_nuevo_valor = document.querySelector('#modificar_nuevo_valor')
const boton_modifcar = document.querySelector('#boton_modificar')

//botones eventos
agregar_boton_doble.addEventListener('click',agregar_doble)
eliminar_boton_doble.addEventListener('click',eliminar_doble)
boton_buscar_doble.addEventListener('click',buscar_doble)
boton_eliminar_especifico.addEventListener('click',func_eliminar_nodo_especifico)
boton_modifcar.addEventListener('click',modificar_nodo_especifico)
//funciones


async function agregar_doble(){
    if(agregar_opcion_doble[0].checked){
        lista_doble.insertar_primero(agregar_input_doble.value)
        const nodo = document.createElement('div')
        nodo.className = 'nodo_doble'
        contenedor_nodos_doble.prepend(nodo)
        await delay()
        const flecha_back = document.createElement('div')
        flecha_back.innerHTML = '&LeftArrow;'
        flecha_back.className = 'flecha_back'
        nodo.appendChild(flecha_back)
        await delay()
        const nodo_dato = document.createElement('div')
        nodo_dato.innerText = agregar_input_doble.value
        nodo_dato.className = 'dato_doble'
        nodo.appendChild(nodo_dato)
        await delay()
        const flecha_front = document.createElement('div')
        flecha_front.innerHTML = '&RightArrow;'
        flecha_front.className = 'flecha_front'
        nodo.append(flecha_front)
        contador_nodos_dobles.innerText = 'Total nodos: '+lista_doble.contar_nodos()
    }
    else if(agregar_opcion_doble[1].checked){
        lista_doble.insertar_ultimo(agregar_input_doble.value)
        const nodo = document.createElement('div')
        nodo.className = 'nodo_doble'
        contenedor_nodos_doble.append(nodo)
        await delay()
        const flecha_back = document.createElement('div')
        flecha_back.innerHTML = '&LeftArrow;'
        flecha_back.className = 'flecha_back'
        nodo.appendChild(flecha_back)
        await delay()
        const nodo_dato = document.createElement('div')
        nodo_dato.innerText = agregar_input_doble.value
        nodo_dato.className = 'dato_doble'
        nodo.appendChild(nodo_dato)
        await delay()
        const flecha_front = document.createElement('div')
        flecha_front.innerHTML = '&RightArrow;'
        flecha_front.className = 'flecha_front'
        nodo.append(flecha_front)
        contador_nodos_dobles.innerText = 'Total nodos: '+lista_doble.contar_nodos()
    }
}
async function eliminar_doble(){
    if(eliminar_opcion_doble[0].checked){
        lista_doble.eliminar_primero()
        console.log(contenedor_nodos_doble.firstChild.classList.add('eliminar_nodo_doble'))
        contenedor_nodos_doble.firstChild.classList.add('eliminar_nodo_doble')
        await delay()
        contenedor_nodos_doble.removeChild(contenedor_nodos_doble.firstChild)
        contador_nodos_dobles.innerText = 'Total nodos: '+lista_doble.contar_nodos()
    }
    else if(eliminar_opcion_doble[1].checked){
        lista_doble.eliminar_ultimo()
        contenedor_nodos_doble.lastChild.classList.add('eliminar_nodo_doble')
        await delay()
        contenedor_nodos_doble.removeChild(contenedor_nodos_doble.lastChild)
        contador_nodos_dobles.innerText = 'Total nodos: '+lista_doble.contar_nodos()
    }
}

function buscar_doble(){
    lista_doble.marcar_nodo_especifico(buscar_doble_input.value)
}
function func_eliminar_nodo_especifico(){
    lista_doble.eliminar_nodo_especifico(eliminar_especifico.value)
    //ista_doble.mostrar()
    contador_nodos_dobles.innerText = 'Total nodos: '+lista_doble.contar_nodos()
}

function modificar_nodo_especifico(){
    lista_doble.modificar_nodo_especifico(modificar_especifico_input.value,modificar_nuevo_valor.value)
    //lista_doble.mostrar()
}

//Clases

class NodoDoble{
    constructor(dato){
        this.dato = dato
        this.anterior = null
        this.siguiente = null
    } 
}

class ListaDoble{
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
        let nuevo_nodo = new NodoDoble(valor)
        if(this.Vacia()){
            this.head = nuevo_nodo
        }
        else{
            nuevo_nodo.siguiente = this.head
            this.head.anterior = nuevo_nodo
            this.head = nuevo_nodo
        }
    }

    eliminar_primero(){
        if(this.Vacia()){
            console.log('La lista esta vacia') 
        }
        else if(this.head.siguiente === null && this.head.anterior === null){
            this.head = null
        }
        else{
            let auxiliar = this.head.siguiente
            auxiliar.anterior = null
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
        let nuevo_nodo = new NodoDoble(valor)
        if(this.Vacia()){
            this.head = nuevo_nodo
        }
        else{
            nuevo_nodo.anterior = this.Ultimo()
            this.Ultimo().siguiente = nuevo_nodo
        }
    }
    eliminar_ultimo(){
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else if(this.head.siguiente === null && this.head.anterior === null){
            this.head = null
        }
        else{
            this.Penultimo().siguiente = null
        }
    }

    contar_nodos(){
        let actual = this.head
        let contador = 0
        if(this.Vacia()){
            return contador
        }
        while(actual !== null){
            contador++
            actual = actual.siguiente
        }
        return contador
    }

    buscar_nodo(valor){
        let actual = this.head
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            let encontrado = false
            while(actual !== null && encontrado === false){
                if(actual.dato === valor){
                    encontrado = true
                }
                actual = actual.siguiente
            }
            return encontrado
        }
    }
    obtener_nodo(valor){
        let actual = this.head
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            if(this.buscar_nodo(valor)){
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
                console.log('El nodo no esta en la lista')
            }
        }
    }
    async eliminar_nodo_especifico(valor){
        if(this.Vacia()){
            console.log('La lista esta vacia')
        }
        else{
            if(this.buscar_nodo(valor)){
                if(this.obtener_nodo(valor).siguiente === null && this.obtener_nodo(valor).anterior !== null){
                    
                    contenedor_nodos_doble.lastChild.classList.add('eliminar_nodo_doble')
                    await delay()
                    contenedor_nodos_doble.removeChild(contenedor_nodos_doble.lastChild)
                    this.eliminar_ultimo()
                    contador_nodos_dobles.innerText = 'Total nodos: '+this.contar_nodos()
                }
                else if(this.obtener_nodo(valor).siguiente !== null && this.obtener_nodo(valor).anterior === null){
                    contenedor_nodos_doble.firstChild.classList.add('eliminar_nodo_doble')
                    await delay()
                    contenedor_nodos_doble.removeChild(contenedor_nodos_doble.firstChild)
                    this.eliminar_primero()
                    contador_nodos_dobles.innerText = 'Total nodos: '+this.contar_nodos()
                }
                else if(this.obtener_nodo(valor).siguiente === null && this.obtener_nodo(valor).anterior === null){
                    contenedor_nodos_doble.firstChild.classList.add('eliminar_nodo_doble')
                    await delay()
                    contenedor_nodos_doble.removeChild(contenedor_nodos_doble.firstChild)
                    this.eliminar_primero()
                    contador_nodos_dobles.innerText = 'Total nodos: '+this.contar_nodos()
                }
                else if(this.obtener_nodo(valor).siguiente !== null && this.obtener_nodo(valor).anterior !== null){
                    let actual = this.head
                    let contador = 0
                    let encontrado = false
                    while(actual !== null && encontrado == false){
                        if(actual.dato === valor ){
                            encontrado = true
                        } 
                        else{
                            contador++
                            actual = actual.siguiente
                        }
                    }
                    
                    contenedor_nodos_doble.childNodes[contador].classList.add('eliminar_nodo_doble')
                    await delay()
                    contenedor_nodos_doble.removeChild(contenedor_nodos_doble.childNodes[contador])
                    let auxiliar1 = this.obtener_nodo(valor)
                    let auxiliar2 = auxiliar1.anterior
                    let auxiliar3 = auxiliar1.siguiente
                    auxiliar2.siguiente = auxiliar3
                    auxiliar3.anterior = auxiliar2
                    auxiliar1 = null
                    contador_nodos_dobles.innerText = 'Total nodos: '+this.contar_nodos()
                }
            }
            else{
                console.log('No esta en la lista')
            }
        }
    }
    modificar_nodo_especifico(valor,nuevo_valor){
        if(this.Vacia()){
            console.log('La lista esta vacia ')
        }
        else{
            if(this.buscar_nodo(valor)){
                let actual = this.head
                let indice = 0
                let encontrado = false
                while(actual !== null && encontrado == false){
                    if(actual.dato === valor ){
                        encontrado = true
                    } 
                    else{
                        indice++
                        actual = actual.siguiente
                    }
                }
                contenedor_nodos_doble.childNodes[indice].childNodes[1].innerText = nuevo_valor
                this.obtener_nodo(valor).dato = nuevo_valor
            }
        }
    }
    async mostrar(){
        let actual = this.head
        contenedor_nodos_doble.innerHTML = ''
        while(actual !== null){
            const nodo = document.createElement('div')
            nodo.className = 'nodo_doble'
            contenedor_nodos_doble.appendChild(nodo)
            await delay()
            const flecha_back = document.createElement('div')
            flecha_back.innerHTML = '&LeftArrow;'
            flecha_back.className = 'flecha_back'
            nodo.appendChild(flecha_back)
            await delay()
            const nodo_dato = document.createElement('div')
            nodo_dato.innerText = actual.dato
            nodo_dato.className = 'dato_doble'
            nodo.appendChild(nodo_dato)
            await delay()
            const flecha_front = document.createElement('div')
            flecha_front.innerHTML = '&RightArrow;'
            flecha_front.className = 'flecha_front'
            nodo.append(flecha_front)

            actual = actual.siguiente
        }
    }

    marcar_nodo_especifico(valor){
        let actual = this.head
        let encontrado = false
        let indice = 0
        const nodos_contenedor = contenedor_nodos_doble.childNodes
        if(this.buscar_nodo(valor)){
            while(actual!== null && encontrado === false){
                if(actual.dato === valor){
                    nodos_contenedor[indice].className = 'encontrado'
                    encontrado = true
                }
                else{
                    nodos_contenedor[indice].className = 'nodo_doble'
                    indice++
                    actual = actual.siguiente
                }
            }
        }
        else{
            console.log('El dato no existe')
        }
    }
}

lista_doble = new ListaDoble()


