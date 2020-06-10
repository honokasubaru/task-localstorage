'use strict';

//METODO PARA OBTENER VALORES
const getValues = (value) => {

	//OBTENER VALORES DE TITULO Y DESCRIPCION
	if(!value){

		const toDo = document.querySelector('input[id="toDo"]').value;
		const description = document.querySelector('textarea[id="description"]').value;

		//GUARDAR VALORES
		saveItem(toDo,description);

	}else{

		const temp = JSON.parse(localStorage.getItem(Value));
		fillForm(temp);

	}

}

//METODO PARA GUARDAR VALORES
const saveItem = (toDo,description) => {

	const temp = {
		toDo,
		description
	}

	//ALMACENAR EN LOCALSTORAGE

	if(!localStorage.getItem('toDo')){

		let toDo = new Array();
		toDo.push(temp);
		localStorage.setItem('toDo',JSON.stringify(toDo));

	}else{

		let toDo = JSON.parse(localStorage.getItem('toDo'));
		let bul = true;

		for(let i in toDo){

			if(toDo[i].toDo == temp.toDo){

				if(confirm('Ya existe esta tarea, quieres sobreescribirla?')){

					toDo[i] = temp;
					localStorage.setItem('toDo',JSON.stringify(toDo));
				}

				bul = false;
				break;
			}
		}

		if(bul){

			toDo.push(temp);
			localStorage.setItem('toDo',JSON.stringify(toDo));
		}

	}

}

//METODO PARA EDITAR LAS TAREAS
const editTask = (toDo,description) =>{

	document.querySelector('input[id="toDo"').value = toDo;
	document.querySelector('textarea[id="description"]').value = description;

}

//METODO PARA ESCRIBIR LAS TAREAS EN EL DOCUMENT
const fillTasks = () =>{

	if(localStorage.getItem('toDo')){

		const tasks = JSON.parse(localStorage.getItem('toDo'));

		let taskContainer = document.querySelector('div[id = "task"');
		taskContainer.innerHTML = null;

		for(const item of tasks){
			console.log(item.toDo,item.description);
			taskContainer.innerHTML += `
				<div class="card mb-3">
				<div class="card-body">
				<h4>${item.toDo}</h4>
				<p>${item.description}</p>
				<a href="#" class="btn btn-danger" onclick="deleteTask('${item.toDo}')">Delete</a>
				<a href="#" class="btn btn-warning" onclick="editTask('${item.toDo}','${item.description}')">Edit</a>
				</div>
				</div>
			`
		}
		
	}

}

fillTasks();

//METODO PARA BORRAR LAS TAREAS
const deleteTask = (value)=>{

	let toDo = JSON.parse(localStorage.getItem('toDo'));

	for(let i in toDo){

		if(toDo[i].toDo == value){

			toDo.splice(i,1);
			localStorage.setItem('toDo',JSON.stringify(toDo));
			fillTasks();
			break;

		}

	}

}

document.querySelector('form[id="form"').addEventListener('submit', e => {

	e.preventDefault();
	getValues();
	document.querySelector('form[id="form"').reset();
	fillTasks();


});