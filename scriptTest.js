let circles = null;

function xAxisClicked(){
    circles.map(value => {
        appo = value.x;
        value.x = value.r;
        value.r = appo;
    })
}
function yAxisClicked(){
    circles.map(value => {
        appo = value.y;
        value.y = value.r;
        value.r = appo;
    })

}

d3.json("data.json")
    .then(function(data) {
        circles = data;
    });

function loop(){
}

setInterval(loop, 1000);