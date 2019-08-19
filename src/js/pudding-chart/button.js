// var svg = d3.select("#button-container").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//   var backButton = svg.append('rect')
//     .attr('width',50)
//     .attr('height'30)
//     .attr('fill','red')
//     .attr('x',20)
//     .attr('y',40)

// packed = {
//     // Overall vars
//     const marginLeft = 20
//     const marginTop = 20
//     const marginBottom = 20
//     const marginRight = 20
//     const height = 500 - marginTop - marginBottom
//     const width = 1000 - marginLeft - marginRight
//     const radius=20
//     const svgW = d3.select(DOM.svg(width + marginLeft + marginRight, height + marginTop + marginBottom))
//     svgW.append("rect")
//       .attr("width", "100%")
//       .attr("height", "100%")
//       .attr("fill", "#111111");
//     const data = ass_datapoints
   
//     var colorScale = d3.scaleOrdinal().domain(['noun','compound','phrase','adjective','suffix','verb','adverb']).range(['#FABD21','#DB2CCA','#8633FF','#DB772C','#F24C3D','green','gray'])
//     var xPositionScale = d3.scalePoint().domain(['verb','noun','compound','adjective','phrase','suffix','adverb']).range([0+marginLeft,width-marginRight])
//     //var yPositionScale = d3.scaleLinear().domain([-20,80]).range([0+marginBottom,height-marginTop])
//     var ypadding = 10
//     var xpadding = 10
    
//     var tip = d3tip()
//     .attr('class', 'd3-tip')
//     .offset([-10, 0])
//     .html(function(d) {
//       return "<strong class='tip-platform'>" + d.word + "</strong>" + "<span class='super-font'>" + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br> Flesch Reading Ease Score: " + d.definition + "<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Time to read: " + Math.round(d.time_to_read) + " minutes<br>" + "&mdash;&mdash;&mdash;&mdash;" + "<br>Sample Sentence: " + d.worst_sentence +".</span>"
//     })
    
    
//     svgW.call(tip)
 
//     var nodes = data.map(function(node, index) {
//     return {
//       word: node.word,
//       definition: node.definition,
//       first_citation_date: node.first_citation_date,
//       first_citation_text: node.first_citation_text,
//       part_of_speech: node.part_of_speech
//     };
//   });

 
//     var simulation = d3.forceSimulation(nodes)
//       .force("y", d3.forceY(function(d) { return height/2; }).strength(.8))
//       .force("x", d3.forceX(function(d) { return xPositionScale(d.part_of_speech); }).strength(.8))
//       .force("collide", d3.forceCollide().radius(function(d){ return 19 }))
//       .force("center", d3.forceCenter(width/2, height/2))
//       .force("manyBody", d3.forceManyBody().strength(.8))
//       .stop();

//     for (var i = 0; i < 201; ++i) simulation.tick();

// var circleGroups = svgW.selectAll('g')
//       .data(nodes)
//       .enter().append('g')
//       .attr("x", function(d) { return d.x} )
//       .attr("y", function(d) { return d.y} )
    
//     var policyCircles = circleGroups.append('circle')
//       .attr('fill', function (d) {
//         return colorScale(d.part_of_speech)
//       })
//       .attr('r', 18)
//       .attr('cy', function (d) {
//         return d3.select(this.parentNode).attr('y')
//       })
//       .attr('cx', function (d) {
//         return d3.select(this.parentNode).attr('x')
//       })
//       .attr('stroke','#333333')
//       .attr('opacity', .8)
//       .attr('id', function(d){ return 'pos' + d.part_of_speech })
//       .on('mouseover', function(d, i) {
//         var currentState = this
//           d3.select(this).style('opacity', 1);
//           tip.show(d)
          
//       })
//       .on('mouseout', function(d, i) {
//         var currentState = this
//           d3.select(this).style('opacity', .8);
//           tip.hide(d)
//       })
    
//     var side = 2 * 18 * Math.cos(Math.PI / 4),
//       dx = 18 - side / 2;
    
//     var wordTextLabels = circleGroups.append('foreignObject')
//       .attr("width", side)
//       .attr("height", side)
//       .attr('transform', 'translate(' + [-dx*2, -dx*2] + ')')
//       .attr('y', function (d) {
//         return d3.select(this.parentNode).attr('y')
//       })
//       .attr('x', function (d) {
//         return d3.select(this.parentNode).attr('x')
//       })
//       .style("font", "9px 'Times New Roman'")
//       .append("xhtml:span")
//       .html(function (d) { return  d.word })
      
  
      
   
    
//   var phraseSize=d3.selectAll("#posphrase").size()
//   var compoundSize=d3.selectAll("#poscompound").size()
//   var nounSize=d3.selectAll("#posnoun").size()
//   var adjectiveSize=d3.selectAll("#posadjective").size()
//   var suffixSize=d3.selectAll("#possuffix").size()
//   var verbSize=d3.selectAll("#posverb").size()
//   var adverbSize=d3.selectAll("#posadverb").size()

//   console.log(phraseSize)
//   console.log(compoundSize)
//   console.log(nounSize)
//   console.log(adjectiveSize)
  
//   var circleSizes = [phraseSize,compoundSize,nounSize,adjectiveSize,suffixSize,verbSize,adverbSize]
    

//  return svgW.node() 
// }