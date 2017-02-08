function histogram(data) {

  data.forEach( elm => {
    elm.value = Math.round(elm.value / 100)
  })
console.log(data)

  var parseTime = d3.timeFormat("%Y-%m");

  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 60},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().range([0, width]).padding(0.2),
      y = d3.scaleLinear().range([height, 0]);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  valueMax = d3.max(data, function(d) {return d.value})
  valueMin = d3.min(data, function(d) {return d.value})

  x.domain(data.map(function(d) { return parseTime(d.date); }));
  y.domain([valueMin, valueMax]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", function(d, i) {
      if(data[i].value < 0) return "translate(0,-20)"
    })

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(5))

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Balance");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(parseTime(d.date)); })
    .attr("y", function(d) {
      if(d.value > 0) return y(d.value)
      else return y(0)
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      if(d.value > 0) return y(0) - y(d.value);
      else return y(d.value) - y(0)
    });

}

module.exports = {
  histogram: histogram
}
