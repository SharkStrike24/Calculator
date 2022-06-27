//Create a javascript program to imitate a calculator
let operation = ""
function createButton(className, id, text, parent, clickFunction){
	let button = document.createElement("button")
	button.classList.add(className.toString())
	button.setAttribute("id", id.toString())
	button.innerHTML = text.toString()
	button.addEventListener("click", clickFunction)
	if(parent != undefined){
		parent.appendChild(button)
	}
}

function endOfString(text){	
		return text.charAt(text.length - 1)
}

function checkOperationsEndOfString(text){
	switch(text.length - 1){
		case text.indexOf("+"):
			return true
		case text.indexOf("-"):
			return true
		case text.indexOf("*"):
	  	return true
		case text.indexOf("/"):
			return true
		default:
			return false
	}
	
}
function checkOperations(text){
	let total = 0
	total += text.indexOf("+")
	total += text.indexOf("-")
	total += text.indexOf("*")
	total += text.indexOf("/")
	if(total === -4){
		return false
	}
	else{
		return true
	}
}

function interpretOperations(text){
	lexedOp = text.split("_")
	lexedOp[0] = parseInt(lexedOp[0])
	lexedOp[2] = parseInt(lexedOp[2])
	switch(lexedOp[1]){
		case "+":
			return lexedOp[0] + lexedOp[2]
		case "-":
			return lexedOp[0] - lexedOp[2]
		case "*":
			return lexedOp[0] * lexedOp[2]
		case "/":
			return lexedOp[0] / lexedOp[2]
		default:
			return undefined
	}
	text = ""
}


function drawButtons(){
	const textDisplay = document.getElementById("text-display") 
	const buttonContainer = document.getElementById("button-container")
	let operationText = ""
	console.log(buttonContainer)
	//0 button is in an unusual place due to the nature of this for loop
	for(let i = 0; i < 10; i++){
		createButton("number-button", i, i, buttonContainer, () => {
			if(i === 0 && checkOperationsEndOfString(operation)){
				operation += ""
			}
			else{
				operation += i.toString()
			}
			if(checkOperations(operation) === false){
				operation = parseInt(operation).toString()
			}
			
			textDisplay.innerHTML = operation
			console.log(operation)
		})
	}
	createButton("operation-button", "clear", "CE", buttonContainer, () => {
		operation = "0"
		textDisplay.innerHTML = operation
	})

	createButton("operation-button", "delete", "del", buttonContainer, () => {
		operation = operation.slice(0, operation.length - 1)
		if (operation === ""){
			operation = "0"	
		}
		textDisplay.innerHTML = operation
	})

	createButton("operation-button", "add", "+", buttonContainer, () => {
		if(checkOperations(operation) === false){
			operation += "+"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_+_"
		  textDisplay.innerHTML = operation
		}	
	})

	createButton("operation-button", "subtract", "-", buttonContainer, () => {
		if(checkOperations(operation) === false){
			operation += "-"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_-_"
		  textDisplay.innerHTML = operation
		}	
	})
	
	createButton("operation-button", "multiply", "*", buttonContainer, () => {
		if(checkOperations(operation) === false){
			operation += "*"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_*_"
		  textDisplay.innerHTML = operation
		}	
	})

	createButton("operation-button", "divide", "/", buttonContainer, () => {
		if(checkOperations(operation) === false){
			operation += "/"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_/_"
		  textDisplay.innerHTML = operation
		}	
	})

	createButton("operation-button", "equals", "=", buttonContainer, () => {
		operationText += operation.substring(operationText.lastIndexOf("_") - 1)
		console.log(operationText.lastIndexOf("_"))
		console.log(operationText)
		operation = ""
		textDisplay.innerHTML = interpretOperations(operationText)
	})

}

drawButtons()
