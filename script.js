// Imposto le dimensioni e i margini del grafico
var margin = {top: 20, right: 40, bottom: 60, left: 100};
var	width = 1000 - margin.left - margin.right;
var	height = 600 - margin.top - margin.bottom;

// Appendo l'oggetto svg al body della mia pagina
var svg = d3.select("#mioGrafico")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Aggiungo l'asse delle X
var x = d3.scaleLinear()
	.domain([0, 100])
	.range([ 0, width ])

svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.attr("class","xAxis")
	.call(d3.axisBottom(x).ticks(20))

// Aggiungo del testo lungo gli assi
svg.append("text")
	.attr("text-anchor", "end")
	.attr("x", width)
	.attr("y", height + margin.top + 20)
	.text("X")
	.attr("fill","black");

svg.append("text")
	.attr("text-anchor", "end")
	.attr("transform", "rotate(-90)")
	.attr("y", -margin.left+60)
	.attr("x", -margin.top+40)
	.text("Y")
	.attr("fill","black");

// Aggiungo l'asse delle Y
var y = d3.scaleLinear()
	.domain([0, 100])
	.range([ height, 0]);

svg.append("g")
	.attr("class","yAxis")
	.call(d3.axisLeft(y).ticks(20));

// Creo una variabile che mi dice il nome della bolla quando ci passo sopra
var nomeBolla = d3.select("#mioGrafico")
	.append("div")
	.style("opacity", 0)
	.attr("class", "nomeBolla")
	.style("background-color", "gold")
	.style("border-radius", "5px")
	.style("padding", "10px")
	.style("color", "darkred")

var mostraNomeBolla = function(d) {
	nomeBolla
		.transition()
		.duration(200)
		.style("opacity", 1)
		.text("Nome: " + d.Nome)
		.style("left", (d3.mouse(this)[0]+30) + "px")
		.style("top", (d3.mouse(this)[1]+30) + "px")
}
var muoviNomeBolla = function(d) {
	nomeBolla
		.style("left", (d3.mouse(this)[0]+30) + "px")
		.style("top", (d3.mouse(this)[1]+30) + "px")
}
var nascondiNomeBolla = function(d) {
	nomeBolla
		.transition()
		.duration(200)
		.style("opacity", 0)
}

//Carico i dati dal file json
d3.json("data.json")
	.then(function(data) {

		// Aggiungo le bolle
		svg.append('g')
			.selectAll("dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function (d) {
				return d.x;
			})
			.attr("cy", function (d) {
				return d.y;
			})
			.attr("r", function (d) {
				return d.r;
			})
			.style("fill", function (d) {
				if (d.Nome == "Bolla1") {
					return "red"
				} else if (d.Nome == "Bolla2") {
					return "yellow"
				} else if (d.Nome == "Bolla3") {
					return "green"
				} else if (d.Nome == "Bolla4") {
					return "blue"
				} else if (d.Nome == "Bolla5") {
					return "pink"
				} else if (d.Nome == "Bolla6") {
					return "purple"
				} else if (d.Nome == "Bolla7") {
					return "orange"
				} else if (d.Nome == "Bolla8") {
					return "gray"
				} else if (d.Nome == "Bolla9") {
					return "brown"
				} else if (d.Nome == "Bolla10") {
					return "white"
				}
			})
			.style("opacity", "0.7")
			.attr("stroke", "black")
			.attr("stroke-width", "4")
			.on("mouseover", mostraNomeBolla)
			.on("mousemove", muoviNomeBolla)
			.on("mouseleave", nascondiNomeBolla)



		// seleziono i tick dell'asse delle x e richiamo la funzione "cliccamiX"
		// che attribuisce ai raggi il valore del tick e a cx il valore dei raggi
		svg.selectAll(".xAxis .tick")
			.on('click', cliccamiX)

		// seleziono i tick dell'asse delle y e richiamo la funzione "cliccamiY"
		// che attribuisce ai raggi il valore del tick e a cy il valore dei raggi
		svg.selectAll(".yAxis .tick")
			.on('click', cliccamiY)

		function cliccamiX(d) {
			d3.selectAll("circle")
				.transition()
				.duration(2000)
				.attr("r",d)
				.attr("cx", function (d) {return d.r;})
				.attr("cy", function (d) {return d.y;});
		}

		function cliccamiY(d) {
			d3.selectAll("circle")
				.transition()
				.duration(2000)
				.attr("r",d)
				.attr("cx", function (d) {return d.x;})
				.attr("cy", function (d) {return d.r;});
		}
	})

	.catch(function(error) {
		console.log(error); // Se ci sono errori mostrali qui
	});