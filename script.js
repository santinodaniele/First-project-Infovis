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
	.domain([0, 10000])
	.range([ 0, width ]);
svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));

// Aggiungo l'asse delle Y
var y = d3.scaleLinear()
	.domain([35, 90])
	.range([ height, 0]);
svg.append("g")
	.call(d3.axisLeft(y));

var z = d3.scaleLinear()
	.domain([200000, 1310000000])
	.range([ 1, 40]);

// Creo una variabile che mi dice il nome della bolla quando ci passo sopara
var tooltip = d3.select("#mioGrafico")
	.append("div")
	.style("opacity", 0)
	.attr("class", "tooltip")
	.style("background-color", "gold")
	.style("border-radius", "5px")
	.style("padding", "10px")
	.style("color", "darkred")

var showTooltip = function(d) {
	tooltip
		.transition()
		.duration(200)
		.style("opacity", 1)
		.text("Nome: " + d.Nome)
		.style("left", (d3.mouse(this)[0]+30) + "px")
		.style("top", (d3.mouse(this)[1]+30) + "px")
}
var moveTooltip = function(d) {
	tooltip
		.style("left", (d3.mouse(this)[0]+30) + "px")
		.style("top", (d3.mouse(this)[1]+30) + "px")
}
var hideTooltip = function(d) {
	tooltip
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
			.on("mouseover", showTooltip )
			.on("mousemove", moveTooltip )
			.on("mouseleave", hideTooltip )
	})
	.catch(function(error) {
		console.log(error); // Se ci sono errori mostrali qui
	});