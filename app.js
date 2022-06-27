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
	text = text.toString()
	if(text.length > 0){
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
	}else{
		return false
	}
	
}
function checkOperations(text){
	text = text.toString()
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
	text = text.toString()
	lexedOp = text.split("_")
	console.log(lexedOp)
	lexedOp[0] = parseFloat(lexedOp[0])
	lexedOp[2] = parseFloat(lexedOp[2])
	switch(lexedOp[1]){
		case "+":
			return lexedOp[0] + lexedOp[2]
		case "-":
			return lexedOp[0] - lexedOp[2]
		case "*":
			return lexedOp[0] * lexedOp[2]
		case "/":
			if(lexedOp[0] === 0 || lexedOp[2] === 0){
				return 8008135
			}
			return lexedOp[0] / lexedOp[2]
		default:
			return undefined
	}
}


function drawButtons(){
	const textDisplay = document.getElementById("text-display") 
	const buttonContainer = document.getElementById("button-container")
	let operationText = ""
	console.log(buttonContainer)
	//0 button is in an unusual place due to the nature of this for loop
	for(let i = 0; i < 10; i++){
		createButton("number-button", i, i, buttonContainer, () => {
			console.log(i)
			if(i === 0 && checkOperationsEndOfString(operation) === true){
				operation += ""
			}
			else{
				operation += i.toString()
			}
			if(checkOperations(operation) === false){
				operation = parseFloat(operation).toString()
			}
			
			textDisplay.innerHTML = operation
			console.log(operation + " " + operationText)
		})
	}
	createButton("operation-button", "clear", "CE", buttonContainer, () => {
		operation = "0"
		textDisplay.innerHTML = operation
	})

	createButton("operation-button", "delete", "del", buttonContainer, () => {
		operation = operation.toString()
		operation = operation.slice(0, operation.length - 1)
		console.log(operation)
		if (operation === ""){
			operation = "0"	
		}
		textDisplay.innerHTML = operation
	})

	createButton("operation-button", "add", "+", buttonContainer, () => {
		operationText = operationText.toString()
		operation = operation.toString()
		if(checkOperations(operation) === false){
			operation += "+"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_+_"
		  textDisplay.innerHTML = operation
		}	
		if(checkOperations(operation) === true && operation.substring(operationText.lastIndexOf("_") - 1).length != 0){
			console.log(operationText)
			operationText += operation.substring(operationText.lastIndexOf("_") - 1)
			textDisplay.innerHTML = interpretOperations(operationText)
			operation = interpretOperations(operationText)
			operationText = interpretOperations(operationText)
			operation += "+"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_+_"
		  textDisplay.innerHTML = operation
		}
	})

	createButton("operation-button", "subtract", "-", buttonContainer, () => {
		operationText = operationText.toString()
		operation = operation.toString()
		if(checkOperations(operation) === false){
			operation += "-"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_-_"
		  textDisplay.innerHTML = operation
		}	
		if(checkOperations(operation) === true && operation.substring(operationText.lastIndexOf("_") - 1).length != 0){
			console.log(operationText)
			operationText += operation.substring(operationText.lastIndexOf("_") - 1)
			textDisplay.innerHTML = interpretOperations(operationText)
			operation = interpretOperations(operationText)
			operationText = interpretOperations(operationText)
			operation += "-"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_-_"
		  textDisplay.innerHTML = operation
		}
	})
	
	createButton("operation-button", "multiply", "*", buttonContainer, () => {
		operationText = operationText.toString()
		operation = operation.toString()
		if(checkOperations(operation) === false){
			operation += "*"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_*_"
		  textDisplay.innerHTML = operation
		}	
		if(checkOperations(operation) === true && operation.substring(operationText.lastIndexOf("_") - 1).length != 0){
			console.log(operationText)
			operationText += operation.substring(operationText.lastIndexOf("_") - 1)
			textDisplay.innerHTML = interpretOperations(operationText)
			operation = interpretOperations(operationText)
			operationText = interpretOperations(operationText)
			operation += "*"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_*_"
		  textDisplay.innerHTML = operation
		}
	})

	createButton("operation-button", "divide", "/", buttonContainer, () => {
		operationText = operationText.toString()
		operation = operation.toString()
		if(checkOperations(operation) === false){
			operation += "/"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_/_"
		  textDisplay.innerHTML = operation
		}
		console.log(operation.substring(operationText.lastIndexOf("_") - 1))
		if(checkOperations(operation) === true && operation.substring(operationText.lastIndexOf("_") - 1).length != 0){
			console.log(operationText)
			operationText += operation.substring(operationText.lastIndexOf("_") - 1)
			textDisplay.innerHTML = interpretOperations(operationText)
			operation = interpretOperations(operationText)
			operationText = interpretOperations(operationText)
			operation += "/"
			operationText = operation.substring(0, operation.length - 1)
			operationText += "_/_"
		  textDisplay.innerHTML = operation
		}
	})

	createButton("operation-button", "decimal", ".", buttonContainer, () => {
		operationText = operationText.toString()
		operation = operation.toString()
		decimalCheck = operation.substring(operationText.lastIndexOf("_") - 1)
		if(decimalCheck.indexOf(".") === -1){
			operation += "." 
		  textDisplay.innerHTML = operation
		}	
	})

	createButton("operation-button", "equals", "=", buttonContainer, () => {
		if(checkOperations(operation) === true && operation.substring(operationText.lastIndexOf("_") - 1).length != 0){
			operationText += operation.substring(operationText.lastIndexOf("_") - 1)
			textDisplay.innerHTML = interpretOperations(operationText)
			console.log(interpretOperations(operationText))
			operationText = interpretOperations(operationText)
			operation = operationText
			console.log(operationText)
		}
	})
	
}

drawButtons()
