var width = 800,
    height = 600;

var force = d3.layout.force()
    .size([width, height])
    .charge(-100)
    .linkDistance(40)
    .on("tick", tick);

var svg = d3.select(".node_graph").append("svg")
    .attr("class", "border--primary-color")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".relationship"),
    node = svg.selectAll(".node");

d3.json("mock_json/graph01.json", function(error, graph) {
  console.log(graph);
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  link = link.data(graph.links)
    .enter().append("line")
      .attr("class", "relationship");

  node = node.data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 8)
      .on("click", click);
});

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

function click(d) {
  window.alert('You clicked this node! This should be a modal with more info!')
}
