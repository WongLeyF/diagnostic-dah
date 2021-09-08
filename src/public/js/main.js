
class MainController {

    constructor(container) {
        const table = document.getElementById('fact')
        const button = document.getElementById('generateTable')
        const thead = document.createElement("thead")
        const trTitle = document.createElement("tr")
        const tbody = document.createElement("tbody")
        const head = ['Iteración', 'Expresión', 'Valor']
        this.container = container
        button.addEventListener("click", (event) => {
            const value = document.getElementById('floatingInput').value
            table.innerHTML = ''
            thead.innerHTML = ''
            trTitle.innerHTML = ''
            tbody.innerHTML = ''
            table.appendChild(thead)
            thead.appendChild(trTitle)
            for (let i = 0; i < 3; i++) {
                const cell = document.createElement("th");
                const textCell = document.createTextNode(head[i]);
                cell.appendChild(textCell);
                trTitle.appendChild(cell);
            }
            table.appendChild(tbody)
            for (let i = 1; i <= value; i++) {
                const row = document.createElement("tr");

                const text = [i, factorialString(i), factorial(i)]
                for (let j = 0; j < 3; j++) {
                    const cell = document.createElement("td");
                    const textCell = document.createTextNode(text[j]);
                    cell.appendChild(textCell);
                    row.appendChild(cell);
                }
                tbody.appendChild(row)
            }
            // table.writeln("<thead style='background-color: red; color: yellow'>");
            // table.writeln("<tr>");
            // table.writeln("<th>n</th>");
            // table.writeln("<th>n!</th>");
            // table.writeln("</tr>");
            // table.writeln("</thead>");
        })
    }
}

function factorial (n) {
	let total = 1; 
	for (let i=1; i<=n; i++) {
		total = total * i; 
	}
	return total; 
}

function factorialString (n) {
    let string = '1'
	for (let i=1; i<=n; i++) {
		string = string + '*' + i; 
	}
	return string; 
}

async function awake() {
    window.controller = new MainController(document.body)
}

document.addEventListener("DOMContentLoaded", awake)