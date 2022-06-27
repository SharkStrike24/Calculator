function drawButtons(){
	const buttonContainer = document.getElementById("button-container")
	for(let i = 0; i < 10; i++){
		let button = document.createElement('button')
		button.classList.add("number-button")
		terms.setAttribute("id",i.toString())
		buttonContainer.appendChild(button)
	}
}
