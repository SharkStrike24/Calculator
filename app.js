//Create a javascript program to imitate a calculator
let operation = ""
function createButton(className, id, text, clickFunction, parent){
	let button = document.createElement("button")
	button.classList.add(className.toString())
	button.setAttribute("id", id.toString())
	button.innerHTML = text.toString()
	button.addEventListener("click", clickFunction)
	if(parent != undefined){
		parent.appendChild(button)
	}
}


function drawButtons(){
	const textDisplay = document.getElementById("text-display") 
	const buttonContainer = document.getElementById("button-container")
	console.log(buttonContainer)
	//0 button is in an unusual place due to the nature of this for loop
	for(let i = 0; i < 10; i++){
		createButton("number-button", i, i, () => {
			operation += i.toString()
			operation = parseInt(operation).toString()
			textDisplay.innerHTML = operation
			console.log(operation)
		}, buttonContainer)
	}

}

drawButtons()
