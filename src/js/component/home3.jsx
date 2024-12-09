import React, { useEffect, useState } from "react";

const [tarea, setTarea] = useState("")
const [listaTareas, setListatareas] = useState([])
// console.table(listaTareas)


useEffect(() => {
	createpost()
},)

//create your first component
const createpost = (tarea) => {


	fetch('https://playground.4geeks.com/todo/todos/antuan', {
		method: "POST",
		body: JSON.stringify({
			"label": tarea,
			"is_done": false
		}),
		headers: {
			"Content-Type": "application/json"

		}
			.then(resp => {

				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			})


	}

}

	const gettasks = () => {

        fetch('https://playground.4geeks.com/todo/users/antuan')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setListaTareas(data.todos)
            })
            .catch(error => {
                console.error(error);
            });
    }
	
	const deleteTask =() => {
        fetch('https://playground.4geeks.com/todo/todos/todo_id', { method: 'DELETE' })
            .then() => this.s













function borrartarea(index) {
			// aqui estamos almazenando un copia del array principal ya que puede genrar conflicto con el array principal 

			const nuevalista = [...listaTareas]
			nuevalista.splice(index, 1);
			setListatareas(nuevalista)
		}

let listadetareasnuevas = listaTareas.map((item, index) => <li key={index}>   {item} <span onClick={() => { console.log(index); borrartarea(index) }}> x </span> </li>)

async function agregartarea(e) {

			// Aqui estamos utilizando una condicion para cuando una persona toca la letra enter se agrege la tarea 
			if (e.key == "Enter") {

				// Al array listaTareas le agregamos la informacion que recopila el input(Tarea)

				// Creamos un nuevo array en el cual se lo incorporamos a la base de datos que recopila el input(Tarea)
				let arraynuevo = listaTareas.concat(tarea)

				// // Ahora aqui le pasamos el valor de arraynuevo a la funcion setListatareas

				setListatareas(arraynuevo)

				// quiero agregar lo que se esta escribiendo(Tarea) a una lista (Listatareas)

				setTarea('')


			}

			return (
				<div className=" p-3 mb-2 bg-light">
					<div className="">

						<div className=" cabecera fw-light "> <h1> TAREAS </h1></div>


						<input type=" input text" onChange={(e) => setTarea(e.target.value)} value={tarea}
							onKeyDown={agregartarea}
						/>

						<ul className="lista">
							{listadetareasnuevas}
						</ul>

						<div> <p> {listaTareas.length} </p> </div>
					</div>
				</div>
			);
		};

	}
	export default Home;