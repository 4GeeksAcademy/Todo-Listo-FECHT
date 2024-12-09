import React, { useEffect, useState } from "react"




  const Home = () => {

    const [tarea, setTarea] = useState("")
    const [listaTareas, setListatareas] = useState([])

    useEffect( () => {
        gettasks()
    },[] )
    
    const gettasks = () => {

        fetch('https://playground.4geeks.com/todo/users/antuan')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setListatareas(data.todos)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const deleteTask =(id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: 'DELETE' })
            
    }

    const createpost = (task) => {


        fetch("https://playground.4geeks.com/todo/todos/antuan", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label: task,
                is_done: false
            })
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)})
    }

    

    function agregartarea(e) {

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
    } 
    return (
        <div className=" p-3 mb-2 bg-light">
            <div className="">

                <div className=" cabecera fw-light "> <h1> TAREAS </h1></div>


                <input type=" input text" onChange={(e) => setTarea(e.target.value)} value={tarea}
                    onKeyDown={agregartarea}
                />

                <ul className="lista">
                    {listaTareas.map((item, index) => <li key={index}>   {item.label} <span onClick={() => deleteTask(item.id) }> x </span> </li>)}
                </ul>

                <div> <p> {listaTareas.length} </p> </div>
            </div>
        </div>

    )
} 

export default Home