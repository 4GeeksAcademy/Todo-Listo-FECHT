import React, { useEffect, useState } from "react"




const Home = () => {

    const [tarea, setTarea] = useState("")
    const [listaTareas, setListatareas] = useState([])

    useEffect(() => {
        gettasks()
    }, [])

    const gettasks = () => {

        fetch("https://playground.4geeks.com/todo/users/antuan")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    // Si no existe el usuario, lo creamos
                    return createUser();
                } else {
                    throw new Error("Error al obtener las tareas");
                }
            })
            .then((data) => {
                if (data.todos) {
                    setListatareas(data.todos);
                }
            })
            .catch((error) => console.error(error));
    }


    const createUser = () => {
        return fetch("https://playground.4geeks.com/todo/users/antuan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([]), // Un usuario nuevo tiene una lista de tareas vacía
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al crear el usuario");
            })
            .then(() => {
                console.log("Usuario creado");
                return { todos: [] }; // Devolvemos una lista vacía para inicializar
            });
    };



    const deleteTask = (id) => {

        fetch("https://playground.4geeks.com/todo/todos/" + id, {
            method: "DELETE", // Actualizamos toda la lista en el servidor
            headers: { "Content-Type": "application/json" },

        })
            .then((response) => {
                if (response.ok) {
                    console.log("Tarea eliminada correctamente en el servidor");
                    // Filtrar la tarea que se debe eliminar
                    const nuevaLista = listaTareas.filter((tarea,) => tarea.id !== id);

                    // Actualizar el estado local
                    setListatareas(nuevaLista);
                }
            })
            .catch((error) => {
                console.error("Error al eliminar la tarea en el servidor:", error);
            });
    };

    const createtask = () => {
        const nuevaTarea = {label: tarea, is_done: false };

        fetch("https://playground.4geeks.com/todo/todos/antuan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaTarea),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al actualizar las tareas");
                return response.json();
            })
            .then((data) => {
                const nuevaLista = [...listaTareas, data];
                setListatareas(nuevaLista);

            })
            .catch((error) => console.error(error));
    };





    const agregarTarea = (e) => {
        if (e.key === "Enter" && tarea.trim() !== "") {
            // estoy agregando un nuevo identificador usando Date.now()( esto me genera un numero)  para cada tarea ya que todas al tener el mismo id. se borran debido a la condicion que les puse. 
            createtask()
            setTarea("");
        }
    };






    return (
        <div className=" p-3 mb-2 bg-light">
            <div className="">

                <div className=" cabecera fw-light "> <h1> TAREAS </h1></div>


                <input type=" input text" onChange={(e) => setTarea(e.target.value)} value={tarea}
                    onKeyDown={agregarTarea}
                />

                <ul className="lista">
                    {listaTareas.map((item, index) => <li key={index}>   {item.label} <span onClick={() => deleteTask(item.id)}> x </span> </li>)}
                </ul>

                <div> <p> {listaTareas.length} </p> </div>
            </div>
        </div>

    )
}

export default Home