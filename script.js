// Imposto le dimensioni e i margini del grafico
var margin = {top: 20, right: 40, bottom: 60, left: 100};
var	width = 1000 - margin.left - margin.right;
var	height = 600 - margin.top - margin.bottom;

//variabili di appoggio
var laX = "x"
var laY = "y"
var raggio = "r"

d3.json("data.json").then(function(data){

    var svg = d3.select("#mioGrafico")
        .append("svg")
        .attr("width", width + margin.left + margin.right)

        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Aggiugno uno scale per il raggio
    var r = d3.scaleLinear()
        .domain([d3.min(data, function(d){return d["r"];}), d3.max(data, function (d) {
            return d["r"];})])
        .range([ 4, 50])

    // Aggiungo uno scale per l'asse delle x
    var x = d3.scaleLinear()
        .domain([0,d3.max(data, function (d) {
            return d["x"]+50;
        })+50])
        .range([ 0, width ]);

    //Aggiungo l'asse delle x
    var xAxis = svg.append("g")
        .attr("id", "asseDelleX")
        .attr("class","xAxis")
        .attr("transform", "translate(0," + height + ")")
        .attr("color", "darkgreen")
        .call(d3.axisBottom(x).ticks(24).tickSize(-550))
        .on('click', aggiorna);

    //Aggiungo del testo lungo l'asse delle x
    var xAxisLabel = svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text("Clicca sui valori dell'asse X per cambiare visualizzazione")
        .attr("fill","darkred");

    //Aggiungo uno scale per l'asse delle Y
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d["y"];})+50])
        .range([ height, 0])

    //Aggiungo l'asse delle y
    var yAxis = svg.append("g")
        .attr("id", "asseDelleY")
        .attr("class","yAxis")
        .attr("color", "darkgreen")
        .call(d3.axisLeft(y).ticks(20).tickSize(-860))
        .on('click', aggiorna);

    // Aggiungo del testo lungo l'asse delle y
    var yAxisLabel = svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left+50)
        .attr("x", -margin.top + 30)
        .text("Clicca sui valori dell'asse Y per cambiare visualizzazione")
        .attr("fill","darkred");

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

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
             .text("Nome: " + d.Nome + "\n"+ "X: " +d[laX] + "\n"+ "Y: " +d[laY]  + "\n"+ "Raggio: " +d[raggio])
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

    //Creo delle bandiere da inserire nelle bolle
    var flag1 = svg.append("defs");
    flag1.append("pattern")
        .attr("id","italia")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "italy_flag.ico")

    var flag2 = svg.append("defs");
    flag2.append("pattern")
        .attr("id","spagna")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "spain_flag.ico")

    var flag3 = svg.append("defs");
    flag3.append("pattern")
        .attr("id","argentina")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "argentina_flag.ico")

    var flag4 = svg.append("defs");
    flag4.append("pattern")
        .attr("id","brasile")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "brazil_flag.ico")

    var flag5 = svg.append("defs");
    flag5.append("pattern")
        .attr("id","canada")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "canada_flag.ico")

    var flag6 = svg.append("defs");
    flag6.append("pattern")
        .attr("id","germania")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "germany_flag.ico")

    var flag7 = svg.append("defs");
    flag7.append("pattern")
        .attr("id","giappone")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "japan_flag.ico")

    var flag8 = svg.append("defs");
    flag8.append("pattern")
        .attr("id","portogallo")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "portugal_flag.ico")

    var flag9 = svg.append("defs");
    flag9.append("pattern")
        .attr("id","uk")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "uk_flag.ico")

    var flag10 = svg.append("defs");
    flag10.append("pattern")
        .attr("id","usa")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("perspectiveAspectRatio","none")
        .attr("xmlns:xlink","http://www.w3.org/1999/xLink")
        .attr("xlink:href", "us_flag.ico")

    // Creo una legenda
    svg.append("rect").attr("x",880).attr("y",130).attr("width", 10).attr("height",10).style("fill", "red")
    svg.append("rect").attr("x",880).attr("y",160).attr("width", 10).attr("height",10).style("fill", "yellow")
    svg.append("text").attr("x", 890).attr("y", 130).text("1").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 890).attr("y", 160).text("2").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("rect").attr("x",880).attr("y",190).attr("width", 10).attr("height",10).style("fill", "green")
    svg.append("rect").attr("x",880).attr("y",220).attr("width", 10).attr("height",10).style("fill", "blue")
    svg.append("text").attr("x", 890).attr("y", 190).text("3").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 890).attr("y", 220).text("4").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("rect").attr("x",880).attr("y",250).attr("width", 10).attr("height",10).style("fill", "pink")
    svg.append("rect").attr("x",880).attr("y",280).attr("width", 10).attr("height",10).style("fill", "purple")
    svg.append("text").attr("x", 890).attr("y", 250).text("5").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 890).attr("y", 280).text("6").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("rect").attr("x",880).attr("y",310).attr("width", 10).attr("height",10).style("fill", "orange")
    svg.append("rect").attr("x",880).attr("y",330).attr("width", 10).attr("height",10).style("fill", "gray")
    svg.append("text").attr("x", 890).attr("y", 310).text("7").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 890).attr("y", 330).text("8").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("rect").attr("x",880).attr("y",360).attr("width", 10).attr("height",10).style("fill", "brown")
    svg.append("rect").attr("x",880).attr("y",390).attr("width", 10).attr("height",10).style("fill", "white")
    svg.append("text").attr("x", 890).attr("y", 360).text("9").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 890).attr("y", 390).text("10").style("font-size", "8px").attr("alignment-baseline","middle")

    // Aggiungo le bolle
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[laX]); } )
        .attr("cy", function (d) { return y(d[laY]); } )
        .attr("r", function (d) { return r(d[raggio]); })
        .style("fill", function (d) {
            if (d.Nome == "Italia") {
                return "url(#italia)"
            } else if (d.Nome == "Spagna") {
                return "url(#spagna)"
            } else if (d.Nome == "Argentina") {
                return "url(#argentina)"
            } else if (d.Nome == "Brasile") {
                return "url(#brasile)"
            } else if (d.Nome == "Canada") {
                return "url(#canada)"
            } else if (d.Nome == "Germania") {
                return "url(#germania)"
            } else if (d.Nome == "Giappone") {
                return "url(#giappone)"
            } else if (d.Nome == "Portogallo") {
                return "url(#portogallo)"
            } else if (d.Nome == "Usa") {
                return "url(#usa)"
            } else if (d.Nome == "UK") {
                return "url(#uk)"
            }
        })
        .style("opacity", "1")
        .attr("stroke", "black")
        .attr("stroke-width", "3")
        .on("mouseover", mostraNomeBolla)
        .on("mousemove", muoviNomeBolla)
        .on("mouseleave", nascondiNomeBolla)

    //Funzione che aggiorna il grafico e le bolle quando clicchi sugli assi
    function aggiorna() {

        target = this.id

        if (target === "asseDelleX"){

            //Aggiorno l'asse delle x
            x.domain([d3.min(data, function (d) {return d[laX]-r(d[raggio]);}), d3.max(data, function (d) {return d[raggio]})+50])
            xAxis.transition()
                .duration(1000)
                .attr("color", "darkgreen")
                .call(d3.axisBottom(x).ticks(24).tickSize(-550))

            xAxisLabel.text("Clicca sui valori dell'asse X per cambiare visualizzazione")

            //Aggiorno il raggio
            r.domain([d3.min(data, function (d) {return d[laX]}), d3.max(data, function (d) {return d[laX]})]);

            //Aggiorno il grafico
            svg.selectAll("circle")
                .data(data)
                .transition()
                .duration(1000)
                .attr("cx", function (d) { return x(d[raggio]); } )
                .attr("cy", function (d) { return y(d[laY]); } )
                .attr("r", function (d) { return  r(d[laX]); } )

            let tmp = laX
            laX = raggio
            raggio = tmp
        }
        else
        {
            //Aggiorno l'asse delle y
            y.domain([d3.min(data, function (d) {return d[laY]-r(d[raggio]);}),d3.max(data, function (d) {return d[raggio]})+50])
            yAxis.transition()
                .duration(1000)
                .attr("color", "darkgreen")
                .call(d3.axisLeft(y).ticks(20).tickSize(-860))

            yAxisLabel.text("Clicca sui valori dell'asse Y per cambiare visualizzazione")

            //Aggiorno il raggio
            r.domain([d3.min(data, function (d) {return d[laY]}), d3.max(data, function (d) {return d[laY]})]);

            //Aggiorno il grafico
            svg.selectAll("circle")
                .data(data)
                .transition()
                .duration(1000)
                .attr("cx", function (d) { return x(d[laX]); } )
                .attr("cy", function (d) { return y(d[raggio]); } )
                .attr("r", function (d) { return  r(d[laY]); } )

            let tmp = laY
            laY = raggio
            raggio = tmp

        }
    }
})
    .catch(function(error) {
        console.log(error); // Se ci sono errori mostrali qui
    });