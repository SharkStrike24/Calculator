//Create a javascript program to imitate a calculator
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.key}']`);
		if(key != null){
    	key.click();
		}else if(e.key === "Enter"){
			const equals = document.getElementById("=")
			equals.click()
		}else if(e.key === "Delete"){
			const del = document.getElementById("Backspace")
			del.click()
		}
});

const textDisplay = document.getElementById("text-display") 
const buttonContainer = document.getElementById("button-container")
let operation = ""
let operationText = ""

function createButton(className, id, text, parent, clickFunction){
	let button = document.createElement("button")
	button.classList.add(className.toString())
	button.setAttribute("id", id.toString())
	button.innerHTML = text.toString()
	button.addEventListener("click", clickFunction)
	if(parent != undefined){
		parent.appendChild(button)
	}
	button.setAttribute("data-key", id.toString())
}

//create a function to add an operation to the equation in order to reduce redundancy
function addOperation(displayText, innerText, op){
		if(checkOperations(op) === true){		
			op = op.toString()
			innerText = innerText.toString()
			displayText = displayText.toString()
			if(checkOperations(displayText) === false){
				displayText += op
				innerText = displayText.substring(0, displayText.length - 1)
				innerText += "_" + op + "_"
		  	textDisplay.innerHTML = displayText
			}	
			if(checkOperations(displayText) === true && displayText.substring(innerText.lastIndexOf("_") - 1).length != 0){
				innerText += displayText.substring(innerText.lastIndexOf("_") - 1)
				textDisplay.innerHTML = interpretOperations(innerText)
				displayText = interpretOperations(innerText)
				innerText = interpretOperations(innerText)
				displayText += op
				innerText = displayText.substring(0, displayText.length - 1)
				innerText += "_" + op + "_"
		  	textDisplay.innerHTML = displayText
			}
		}
	operation = displayText
	operationText = innerText

	console.log("innerText: " + innerText)
	console.log("displayText: " + displayText)
	console.log("op: " + op)
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
	console.log(buttonContainer)
	//0 button is in an unusual place due to the nature of this for loop
	for(let i = 0; i < 10; i++){
		createButton("number-button", i, i, buttonContainer, () => {
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
		})
	}
	createButton("operation-button", "c", "CE", buttonContainer, () => {
		operation = "0"
		textDisplay.innerHTML = operation
	})

	createButton("operation-button", "Backspace", "del", buttonContainer, () => {
		operation = operation.toString()
		operation = operation.slice(0, operation.length - 1)
		if (operation === ""){
			operation = "0"	
		}
		textDisplay.innerHTML = operation
	})

	createButton("operation-button", ".", ".", buttonContainer, () => {
		operationText = operationText.toString()
		operation = operation.toString()
		decimalCheck = operation.substring(operationText.lastIndexOf("_") - 1)
		if(decimalCheck.indexOf(".") === -1){
			operation += "." 
		  textDisplay.innerHTML = operation
		}	
	})

	createButton("operation-button", "=", "=", buttonContainer, () => {
		operationText = operationText.toString()
		if(checkOperations(operation) === true && operation.substring(operationText.lastIndexOf("_") - 1).length != 0){
			operationText += operation.substring(operationText.lastIndexOf("_") - 1)
			textDisplay.innerHTML = interpretOperations(operationText)
			console.log(interpretOperations(operationText))
			operationText = interpretOperations(operationText)
			operation = ""
			console.log(operationText)
		}
	})

	createButton("operation-button", "+", "+", buttonContainer, () => {addOperation(operation, operationText, "+")
	})

	createButton("operation-button", "-", "-", buttonContainer, () => {addOperation(operation, operationText, "-")
	})
	
	createButton("operation-button", "*", "*", buttonContainer, () => {addOperation(operation, operationText, "*")
	})

	createButton("operation-button", "/", "/", buttonContainer, () => {addOperation(operation, operationText, "/")
	})	
}

drawButtons()
