function loadGraph(json_file) {
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

  d3.json("mock_json/" + json_file, function(error, graph) {
    if (error) throw error;

    console.log(graph);

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
    window.alert('This node will display information after we have an API.')
  }
}

/*
 * 'Controller' methods.
 */

// Initalize the graph
function initGraph(graphFile) {
  console.log(graphFile);
 if (graphFile) {
   loadGraph(graphFile)
 } else {
   loadGraph("graph01.json")
 }
}

//GET /links/topics/<id>
function filterTopic(topicNum) {
  $('svg').remove();
  if (topicNum < 10) {
    initGraph("sub_01.json")
  } else if (null) {
    initGraph("graph01.json")
  } else {
    initGraph("sub_02.json")
  }
}

/*
 * Business Logic
 */
$('.startFilterBtn').click(function(){
  topicNum = $('#filterTopic').val()
  filterTopic(topicNum)
  $('#title').text("Topic " + topicNum)
})

$('.resetFilterBtn').click(function(){
  $('svg').remove();
  initGraph("graph01.json");
  $('#title').text("Overview")
})

initGraph("graph01.json");
