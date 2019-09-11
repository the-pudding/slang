var stepperTriggered = false;

/* global d3 */
function resize() {}

//----------------//

//building the stepper
function setupStepper() {

  //array of step states
  var steps = [
    step0,
    step1,
    step2,
    step3,
    step4,
    step5,
    step6
    // step7
  ]

  var stepsClicked = 0

  //define click events on right-left buttons
  var tapLeft = d3.selectAll('.tap')
    .on('click', function () {
      if(d3.select(this).classed("tap--left")){
        currentStep = currentStep - 1
        switchStep(currentStep)
        console.log('back')
        d3.event.stopPropagation()
      }
      else {
        currentStep = currentStep + 1
        switchStep(currentStep)
        console.log('forward')
      }
    })
  // var tapRight = d3.select('svg.tap--right')
  //   .on('click', function () {
  //   })



  var tapDown = d3.select('svg.tap--final')
    .on('click', function () {
      currentStep = currentStep + 1
      switchStep(currentStep)
      console.log('clicked')
      document.querySelector('.step').scrollIntoView({ behavior: 'smooth' })
    })


   // define each step
  function step0() {

    var entirePage = d3.select('.stepper')
      .on('click', function (d) {
      currentStep = currentStep + 1
      switchStep(currentStep)
    })

    //activate container
    d3.select('.stepper').classed('active',true)

      //Activate stepper tap
      d3.select(".stepper__tap").classed("active", true)

    //Activate first-button
      d3.select(".tap--first").classed("active", true)

    //Deactivate right-left click buttons
      d3.select(".tap.tap--left").classed("active", false)

      d3.select(".tap.tap--right").classed("active", false)

      //stop the first video on clickback
      d3.select('video.ismo.step1')['_groups'][0][0].pause()


  }

  function step1() {

    stepsClicked = stepsClicked + 1 

    //Remove full page click
      d3.select('.stepper')
        .on('click', null)

    //Dectivate first-button
      d3.select(".tap--first").classed("active", false)

    //Activate right-left click buttons
      d3.select(".tap.tap--left").classed("active", true)

      d3.select(".tap.tap--right").classed("active", true)

      d3.select('.pause-overlay')
        .style('opacity',null)





    // function splitSubtitle() {
    // var subtitleWords = document.getElementsByClassName('subtitle')[0]
    // subtitleWords.innerHTML = "<span>".concat(subtitleWords.innerHTML)
    // console.log(subtitleWords.innerHTML)
    // subtitleWords.innerHTML = subtitleWords.innerHTML.replace(/ /g,"</span> <span>")
    // console.log(subtitleWords.innerHTML)
    // subtitleWords.innerHTML = subtitleWords.innerHTML.slice(0,-7)
    // d3.selectAll('.subtitle>span').classed('subtitle-word',true)

    // splitSubtitle = function() {}

    // }

    // splitSubtitle()


    d3.select('.subtitle').classed('active',true)
    d3.select('.subtitle')
      .style('opacity',0)
    d3.select('.subtitle').transition()
      .delay(400)
      .duration(150)
      .style('opacity',1)
    // var subtitleHighlights = d3.selectAll('.subtitle-word')
    // subtitleHighlights.transition()
    //   .delay(400)
    //   .duration(200)
    //   .style('color','white')








      //play the first video
      d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0
      d3.select('video.ismo.step1')['_groups'][0][0].play()

  }

  function step2() {

  stepsClicked = stepsClicked + 1 
   // //activate script
   // d3.select('.script-container').classed("active",true)
   //  .transition()
   //  .duration(1000)

   //  //deselct active text on clickback
   //  d3.selectAll('.script-line').classed("active",false)
   //  //select active text
   //  d3.selectAll('.script-line')
   //    .filter(function (d) {
   //      return d.step_used == 'step2'
   //    })
   //    .classed('active',true)


  //  //stop the first video
  //  d3.select('video.ismo.step1')['_groups'][0][0].pause()
  //  d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0
  //  //play the second video
  //  d3.select('video.ismo.step2')['_groups'][0][0].play()
  // //pause the third video on clickback
  //  d3.select('video.ismo.step3')['_groups'][0][0].pause()
  //  d3.select('video.ismo.step3')['_groups'][0][0].currentTime = 0

  //stop the first video
   d3.select('video.ismo.step1')['_groups'][0][0].pause()
   d3.select('.stepper__video.step1').classed('active',true)
   // d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0

   d3.select('.pause-overlay')
    .style('opacity',1)


         //deactivate script on clickback
   d3.select('.script-container').classed("active",false)
   d3.select('.subtitle').classed('active',false)
   d3.select('.subtitle')
    .style('opacity',0)

    //deselect active text on clickback
    d3.selectAll('.script-line').classed("active",false)

    //stop the second video on clickback
   d3.select('video.ismo.step3')['_groups'][0][0].pause()
   d3.select('video.ismo.step3')['_groups'][0][0].currentTime = 0

  }

  function step3() {

   stepsClicked = stepsClicked + 1  
   console.log(stepsClicked)
   //activate script
   d3.select('.script-container').classed("active",true)

    //transition out overlay
    d3.select('.pause-overlay').transition()
    .duration(2000)
    .style('opacity',0)

    //deselct active text on clickback
    d3.selectAll('.script-line').classed("active",false)
    //select active text
    d3.selectAll('.script-line')
      .filter(function (d) {
        return d.step_used == 'step2'
      })
      .classed('active',true)

    if (stepsClicked === 3) {
     splitSentence()
    }



   //play the second video
   d3.select('video.ismo.step3')['_groups'][0][0].play()
  //pause the third video on clickback
   d3.select('video.ismo.step4')['_groups'][0][0].pause()
   d3.select('video.ismo.step4')['_groups'][0][0].currentTime = 0

  }

  function step4() {

    stepsClicked = stepsClicked + 1 
    //stop the second video
    d3.select('video.ismo.step3')['_groups'][0][0].pause()
    d3.select('video.ismo.step3')['_groups'][0][0].currentTime = 0
   //play the third video
    d3.select('video.ismo.step4')['_groups'][0][0].play()
    //pause the fourth video on clickback
    d3.select('video.ismo.step5')['_groups'][0][0].pause()
    d3.select('video.ismo.step5')['_groups'][0][0].currentTime = 0

    //deselect active text on clickback/clickthrough
    d3.selectAll('.script-line').classed("active",false)

    //select active text
    d3.selectAll('.script-line')
      .filter(function (d) {
        return d.step_used == 'step3'
      })
      .classed('active',true)

    //reset text color on clickback
      d3.selectAll('#ass-instance')
        .transition()
        .duration(1000)
        .style('color','rgba(0,255,243,0.4)')
  }


  function step5() {

   stepsClicked = stepsClicked + 1 
    //stop the third video
   d3.select('video.ismo.step4')['_groups'][0][0].pause()
   d3.select('video.ismo.step4')['_groups'][0][0].currentTime = 0
   //play the fourth video
   d3.select('video.ismo.step5')['_groups'][0][0].play()
   //pause the fifth video on clickback
   d3.select('video.ismo.step6')['_groups'][0][0].pause()
   d3.select('video.ismo.step6')['_groups'][0][0].currentTime = 0

   //deselect active text on clickback/clickthrough
    d3.selectAll('.script-line').classed("active",false)

   //select active text
    d3.selectAll('.script-line')
      .filter(function (d) {
        return d.step_used == 'step4'
      })
      .classed('active',true)

    //highlight instances of ass
    highlightAss()

    //reset text color on clickback
      d3.selectAll('#ass-instance')
        .transition()
        .duration(1000)
        .style('color','#00fff3')

    //Reactivate right click buttons on clickback
      d3.select(".tap.tap--right").classed("active", true).style("display",null).style("opacity",null)
      d3.select(".tap.tap--left").classed("active", true)



      //Move left tap to top corner

    //Deactivate final click button on clickback
      d3.select(".tap.tap--final").classed("active", false)
      d3.select(".tap.tap--final").transition()
        .style('opacity','0')

  }

  function step6() {

   stepsClicked = stepsClicked + 1 
    //stop the fourth video
   d3.select('video.ismo.step5')['_groups'][0][0].pause()
   d3.select('video.ismo.step5')['_groups'][0][0].currentTime = 0
   //play the fifth video
   d3.select('video.ismo.step6')['_groups'][0][0].play()

   //deselect active text on clickback/clickthrough
    d3.selectAll('.script-line').classed("active",false)

   //select active text
    d3.selectAll('.script-line')
      .filter(function (d) {
        return d.step_used == 'step5'
      })
      .classed('active',true)

    window.setTimeout(function(d){


      if(!stepperTriggered){
        d3.transition()
            .delay(0)
            .duration(1000)
            .tween("scroll", scrollTween(window.innerHeight));

        function scrollTween(offset) {
          stepperTriggered = true;
          return function() {
            var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
            return function(t) { scrollTo(0, i(t)); };
          };
        }
      }





      ////remove the stepper and activate the scroller
      //d3.select('.stepper__graphics').classed('active',false)
      //  .attr('display','none')

      // d3.select('.stepper').classed('active',false)
      // d3.select('.script-container')
      //   .classed('active',false)
      // d3.select('.tap.tap--final')
      //   .classed('active',false)
      // d3.select(".tap.tap--final").transition()
      //   .duration(1000)
      //   .style('opacity',0)

      d3.select('.scroll').classed('active',true)
        .attr('display','inline')
      d3.select('.stack').classed('active',true)

      d3.select('footer').style('display','block')

      //deselect active text on clickback/clickthrough
      d3.selectAll('.script-line').classed("active",false)

      //activate tap back button

      var tapBack = d3.select('svg.tap--back')
        .on('click', function () {
          currentStep = currentStep - 1
          switchStep(currentStep)
        })

      d3.select('svg.tap--back')
        .classed('active',true)

      //build charts
      buildIcebergTextList('assets/data/ass_ismo_citations_final.json','#iceberg0','#overlay0')
      buildIcebergTextChart('assets/data/ass_long_data.json','#iceberg1','#overlay1')
      buildIcebergTextChart('assets/data/fuck_long_data.json','#iceberg2','#overlay2')
      buildIcebergTextChart('assets/data/dog_long_data.json','#iceberg3','#overlay3')
      buildIcebergTextChart('assets/data/shit_long_data.json','#iceberg4','#overlay4')

      //last chart
      //define the data, run function
      d3.json('assets/data/ass_long_data.json').then(function(d){
        setupAssLine(d[186].citations,d3.select("#graphic2"))
      })
      .catch(function(error){
           // handle error
        })
        //end of data read/script


      //pause the fifth video

      // d3.select('video.ismo.step6')['_groups'][0][0].pause()

    },3000)

    //Move out right-left click buttons
      // d3.select(".tap.tap--right").transition()
      //   .duration(1000)
      //   .style('left','65%')
      //   .style('bottom','20%')
      //   .style('opacity','.6')
      // d3.select('.tap.tap--left').transition()
      //   .duration(1000)
      //   .style('right','65%')
      //   .style('bottom','20%')
      //   .style('opacity','.6')

    // //Activate final click button
    //   d3.select(".tap.tap--final").classed("active", true)
    //
    //   d3.select(".tap.tap--final").transition()
    //     .duration(1)
    //     .style('opacity',0)
    //
    //   d3.select(".tap.tap--final").transition()
    //     .duration(1000)
    //     .style('opacity',1)

    // //Dectivate clickback button on clickback
    //   d3.select(".tap.tap--back").classed("active", false)
    //
    //   //Reactivate left-right click on clickback
    //   d3.select('.tap.tap--left').classed('active',true)
    //   d3.select(".tap.tap--right").classed("active", true)
    //
    //     //reactivate on clickback
    //   d3.select('.stepper').classed('active',true)
    //   d3.select('.stepper__graphics').classed('active',true)
    //     .attr('display','none')
    //   d3.select('.script-container')
    //     .classed('active',true)
    //
    //   //deactivate scroller and stack on clickback
    //   d3.select('.scroll').classed('active',false)
    //   d3.select('.stack').classed('active',false)

    //deactivate leftright click button
    // d3.select('.tap.tap--left')
    //   .classed('active',false)
    d3.select('.tap.tap--right')
      .classed('active',false)
      .style("display","none")
      .style('opacity','0')


    // d3.select('.tap.tap--left').transition()
    //   .style('opacity','0')



  }

    function step7() {
      //remove the stepper and activate the scroller
      // d3.select('.stepper__graphics').classed('active',false)
      //   .attr('display','none')

      // d3.select('.stepper').classed('active',false)
      // d3.select('.script-container')
      //   .classed('active',false)
      // d3.select('.tap.tap--final')
      //   .classed('active',false)
      // d3.select(".tap.tap--final").transition()
      //   .duration(1000)
      //   .style('opacity',0)
      //
      // d3.select('.scroll').classed('active',true)
      //   .attr('display','inline')
      // d3.select('.stack').classed('active',true)
      // //deselect active text on clickback/clickthrough
      // d3.selectAll('.script-line').classed("active",false)
      //
      // //activate tap back button
      //
      //   var tapBack = d3.select('svg.tap--back')
      //     .on('click', function () {
      //       currentStep = currentStep - 1
      //       switchStep(currentStep)
      //       console.log('clicked')
      //     })
      //
      // d3.select('svg.tap--back')
      //   .classed('active',true)
      //
      // d3.select('svg.tap--back').transition()
      //   .duration(1000)
      //   .style('opacity',1)
      //
      // //pause the fifth video
      // d3.select('video.ismo.step6')['_groups'][0][0].pause()
      //
      // //deactivate leftright click button
      // d3.select('.tap.tap--left')
      //   .classed('active',false)
      // d3.select('.tap.tap--right')
      //   .classed('active',false)
      //
      // d3.select('.tap.tap--left').transition()
      //   .style('opacity','0')
      // d3.select('.tap.tap--right').transition()
      //   .style('opacity','0')


  }
  //end of step functions

  // split sentences by word
  function splitSentence() {
    var sentences = document.getElementsByClassName('script-line active')
    var x
      for (x of sentences) {
        x.innerHTML = "<span>".concat(x.innerHTML)
        x.innerHTML = x.innerHTML.replace(/ /g,"</span> <span>")
        x.innerHTML = x.innerHTML.slice(0,-7)
        d3.selectAll('.script-line.active >span').classed('sentence-word',true)
      }

     var videoLength = d3.select('.stepper__video.active>video')['_groups'][0][0]['duration']
     var numberWords = d3.selectAll('.sentence-word').size()
     var durationBetween = videoLength / numberWords
     console.log(durationBetween)

     d3.selectAll('.sentence-word')
      .transition().duration(0)
      .style('opacity',0)
        .transition().duration(videoLength*1000)
        .delay(function(d,i){ return i * durationBetween })
        .style('opacity',1)

    }

  //highlight asses function
  function highlightAss() {
      var scriptLines = document.getElementsByClassName('script-line')
      var x
      for (x of scriptLines) {
        x.innerHTML = x.innerHTML.replace(/ass-berg/g,'<span id="ass-instance">ass-berg</span>');
        x.innerHTML = x.innerHTML.replace(/badass/g,'<span id="ass-instance">badass</span>');
        x.innerHTML = x.innerHTML.replace(/dumbass/g,'<span id="ass-instance">dumbass</span>');
        x.innerHTML = x.innerHTML.replace(/your ass/g,'<span id="ass-instance">your ass</span>');
        x.innerHTML = x.innerHTML.replace(/Your ass/g,'<span id="ass-instance">Your ass</span>');
        x.innerHTML = x.innerHTML.replace(/my ass/g,'<span id="ass-instance">my ass</span>');
        x.innerHTML = x.innerHTML.replace(/My ass/g,'<span id="ass-instance">My ass</span>');
        x.innerHTML = x.innerHTML.replace(/half-assed/g,'<span id="ass-instance">half-assed</span>');
        x.innerHTML = x.innerHTML.replace(/blue-ass/g,'<span id="ass-instance">blue-ass</span>');
        x.innerHTML = x.innerHTML.replace(/long-ass/g,'<span id="ass-instance">long-ass</span>');
        x.innerHTML = x.innerHTML.replace(/good-ass/g,'<span id="ass-instance">good-ass</span>');
        x.innerHTML = x.innerHTML.replace(/grown-ass/g,'<span id="ass-instance">grown-ass</span>');
        x.innerHTML = x.innerHTML.replace(/lazy-ass/g,'<span id="ass-instance">lazy-ass</span>');
        x.innerHTML = x.innerHTML.replace(/piece of ass/g,'<span id="ass-instance">piece of ass</span>');
        x.innerHTML = x.innerHTML.replace(/ ass\./g,' <span id="ass-instance">ass</span>.');
        x.innerHTML = x.innerHTML.replace(/“ass”/g,'“<span id="ass-instance">ass</span>”');
        x.innerHTML = x.innerHTML.replace(/“ass.”/g,'“<span id="ass-instance">ass</span>.”');
        x.innerHTML = x.innerHTML.replace(/ ass,/g,' <span id="ass-instance">ass</span>,');
        x.innerHTML = x.innerHTML.replace(/ ass /g,' <span id="ass-instance">ass</span> ');
      }
      highlightAss = function(){}

    }
  //end of highlight asses function

    //keep only asses function
  function assOnlyScript() {
      var scriptLines = document.getElementsByClassName('scroll-script-line')
      var x
      for (x of scriptLines) {
        x.innerHTML = x.innerHTML.replace(/ass-berg/g,'<span id="ass-instance">ass-berg</span>');
        x.innerHTML = x.innerHTML.replace(/badass/g,'<span id="ass-instance">badass</span>');
        x.innerHTML = x.innerHTML.replace(/dumbass/g,'<span id="ass-instance">dumbass</span>');
        x.innerHTML = x.innerHTML.replace(/your ass/g,'<span id="ass-instance">your ass</span>');
        x.innerHTML = x.innerHTML.replace(/Your ass/g,'<span id="ass-instance">Your ass</span>');
        x.innerHTML = x.innerHTML.replace(/my ass/g,'<span id="ass-instance">my ass</span>');
        x.innerHTML = x.innerHTML.replace(/My ass/g,'<span id="ass-instance">My ass</span>');
        x.innerHTML = x.innerHTML.replace(/half-assed/g,'<span id="ass-instance">half-assed</span>');
        x.innerHTML = x.innerHTML.replace(/blue-ass/g,'<span id="ass-instance">blue-ass</span>');
        x.innerHTML = x.innerHTML.replace(/long-ass/g,'<span id="ass-instance">long-ass</span>');
        x.innerHTML = x.innerHTML.replace(/good-ass/g,'<span id="ass-instance">good-ass</span>');
        x.innerHTML = x.innerHTML.replace(/grown-ass/g,'<span id="ass-instance">grown-ass</span>');
        x.innerHTML = x.innerHTML.replace(/lazy-ass/g,'<span id="ass-instance">lazy-ass</span>');
        x.innerHTML = x.innerHTML.replace(/piece of ass/g,'<span id="ass-instance">piece of ass</span>');
        x.innerHTML = x.innerHTML.replace(/ ass\./g,' <span id="ass-instance">ass</span>.');
        x.innerHTML = x.innerHTML.replace(/“ass”/g,'“<span id="ass-instance">ass</span>”');
        x.innerHTML = x.innerHTML.replace(/“ass.”/g,'“<span id="ass-instance">ass</span>.”');
        x.innerHTML = x.innerHTML.replace(/ ass,/g,' <span id="ass-instance">ass</span>,');
        x.innerHTML = x.innerHTML.replace(/ ass /g,' <span id="ass-instance">ass</span> ');
      }
      assOnlyScript = function(){}

    }
  //end of highlight asses function

  //change step function
  function switchStep(currentStep){
      //activate the current step
      d3.selectAll(".stepper__annotation").classed("active", false);
      d3.select(".stepper__annotation.step" + currentStep).classed("active", true);
      d3.selectAll(".stepper__video").classed("active", false);
      d3.select(".stepper__video.step" + currentStep).classed("active", true);
      d3.selectAll(".stepper__intro").classed("active", false);
      d3.select(".stepper__intro.step" + currentStep).classed("active", true);
      //console.log(steps[("step" + currentStep)])

      //run that step
      steps[(currentStep)]()

    }
  //end of change step function

  //initalize stepper
  var currentStep = 0
  switchStep(currentStep)

//end of stepper function
}

//-------------//

//define the data, run script function
d3.csv('assets/data/ismo_script.csv').then(
//begin script function
function setupStepperScript(datapoints) {

  var scriptContainer = d3.select('.stepper__graphics')
    .append('p')
    .attr('class','script-container')

  var scriptLines = scriptContainer.selectAll('span')
    .data(datapoints)
    .enter().append('span')
    .attr('class','script-line')
    .text(function (d){
      return (d.text + " ")
})
//end of script function
}).catch(function(error){
     // handle error
  })
//end of data read/script


function setupAssLine(datapoints,container) {


  if (datapoints.length > 1) {
    var citationData = datapoints;


    var viewportWidth = document.getElementById('content').offsetWidth;


    //set up variables
    const margin = { top: 20, right: 26, bottom: 20, left: 26 }
    console.log(container['_groups'][0][0].clientWidth)
    const height = (window.innerHeight - margin.top - margin.bottom) / 2
    // const width = Math.min(viewportWidth,550) - margin.left - margin.right
    const width = container['_groups'][0][0].clientWidth - margin.left - margin.right
    console.log(width)

    var sliderContainer = container.append('div')
      .attr('class','slider-container')

    var svg = container
      .append('svg')
      .attr('class','time-line')
      .attr('width',width+margin.left+margin.right)
      .attr('height',height+margin.bottom+margin.top)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var lineFunction = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })

    var lineData = [ { "x": 0,   "y": height*.02},  { "x": width,  "y": height*.02} ]



    //filter data

    var citationCounter = 0
    for (var x of citationData){
      if (x['@first'] == 'yes')
        {citationData = citationData.slice(citationCounter,)}
      citationCounter = citationCounter + 1
    }
    //grab just the dates
    var citationDates = citationData.map(function (d) {return +d.date})
    var firstDate = citationDates[0]
    var lastDate = citationDates.slice(-1)[0]


    //set up scales
    var xPositionScale = d3.scaleLinear()
      .domain([+firstDate,+lastDate])
      .range([0,width])

    var indexCounter = 0
      //remove extraneous years
     for (var x of citationDates) {
      if (x.length > 4) {
        var newDate = x.slice(0,4)
        citationDates[indexCounter] = newDate
      }
      else {}
      indexCounter = indexCounter + 1
    }


    //add the timeline
    var timeLine = svg.append('line')
        .attr("class","background-bar")
        .attr("x1",0)
        .attr("x2",width)
        .attr("y1",8)
        .attr("y2",8)
        .attr('stroke-width',2)
        .attr('stroke','#333333')

    //add axis labels

    var yearLabelStart = svg.append('g')
        .attr('transform','translate(' + 0 +','+ 0 + ')')
        .append('text')
        .text(firstDate)
        .attr('class','year-label')
        ;

    var yearLabelEnd = svg.append('g')
      .attr('transform','translate(' + width +','+ 0 + ')')
      .append('text')
        .text(lastDate)
        .attr('class','year-label')

      //add circle for each citation
    var citationCircles = svg.selectAll('.citation')
        .data(citationData)
        .enter()
        .append('line')
        .attr("class","citation")
        .attr('x1',function (d) {
          if (d.date.length >4)
            {return  xPositionScale(d.date.slice(0,4))}
          else
            {return xPositionScale(d.date)}

        })
        .attr('x2',function (d) {
          if (d.date.length >4)
            {return  xPositionScale(d.date.slice(0,4))}
          else
            {return xPositionScale(d.date)}

        })
        .attr('y1',0)
        .attr('y2',16)
        .classed("active",function(d,i){
          return i==0;
        })
        .attr('opacity',.5)
        .attr('id', function (d) {
          if (d.date.length >4)
            {return 'date' + d.date.slice(0,4)}
          else
            {return 'date' + d.date}
        });

    //add the selected citation container
    var citationContainer = container.append('div')
      .attr('class','citationContainer')
      .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])

    sliderContainer
      .append('input')
        .attr('type','range')
        .attr('min',firstDate)
        .attr('max',lastDate)
        .attr('id','rangeSLider')
        .attr('value',firstDate)
        .attr('step',1)
        .attr('class','slider')
        .attr('dates',citationDates.map(function(d){
          return +d;
        }))

        .on("input",function(d){
          var value = d3.select(this).property("value")

          var dates = citationDates.map(function(d){
            return +d;
          })

          var selected = dates.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);

          citationCircles.classed("active",function(d){
            if(+d.date == selected){
              var text = d["#text"];

              citationContainer
                .text('(' + selected + ') ' + d["#text"])

              return true;
            }
            return false;
          })
        })

  }
  else {

    var citationData = datapoints;

    var citationContainer = container.append('div')
      .attr('class','citationContainer')
      .text('(' + citationData.date + ') ' + citationData['#text'])

  }


}

//-----------------//

function buildCitationTimeline(usageData,icebergnumber,overlaynumber) {


      //set up variables
      // const margin = { top: 20, right: 20, bottom: 20, left: 20 }
      // const height = window.innerHeight - margin.top - margin.bottom
      // const width = window.innerWidth - margin.left - margin.right
      //
      // var svg = d3.select(overlaynumber)
      //   .append('svg')
      //   .attr('class','time-line')
      //   .attr('width',width)
      //   .attr('height',height-margin.bottom)
      //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      // var lineFunction = d3.line()
      //   .x(function(d) { return d.x; })
      //   .y(function(d) { return d.y; })
      // var lineData = [ { "x": width*.1,   "y": height*.2},  { "x": width*.9,  "y": height*.2} ]


      //filter data and only do line if more than 1 citation
      if (usageData.number_of_citations == 1) {
          var citationData = Array(usageData.citations)

          //add circle for each citation
        // var citationCircles = svg.selectAll('.citation-circle')
        //     .data(citationData)
        //     .enter().append('circle')
        //     .attr('cx',width/2)
        //     .attr('class','citation-circle')
        //     .attr('cy',height*.2)
        //     .attr('r',4)
        //     .attr('opacity',1)
        //     .attr('text', function (d){
        //       return d['#text']
        //     })
        //     .attr('fill','#F24C3D')
        //     .attr('id', function (d) {
        //
        //       if (d.date.length >4)
        //         {return 'date' + d.date.slice(0,4)}
        //       else
        //         {return 'date' + d.date}
        //     })
        //
        //   if (citationData[0].date.length > 4)
        //     {var yearLabelText = citationData[0].date.slice(0,4)}
        //   else
        //     {var yearLabelText = citationData[0].date}
        //

      //   var yearLabelStart = svg.append('g')
      //     .attr('transform','translate(' + width*.5 +','+ height*.23 + ')')
      //     .append('text')
      //     .text(yearLabelText)
      //     .attr('class','year-label')
      //
      //           //add the selected citation container
      // var citationContainer = d3.select(overlaynumber).append('div')
      //   .attr('class','citationContainerIceberg')
      //   .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])


      }
      else {
        var citationData = usageData.citations
        // setupAssLine(citationData)

      //   var x
      //   var citationCounter = 0
      //   for (x of citationData){
      //     if (x['@first'] == 'yes')
      //       {citationData = citationData.slice(citationCounter,)}
      //     citationCounter = citationCounter + 1
      //   }
      //
      //   //grab just the dates
      //   var citationDates = citationData.map(function (d) {return d.date})
      //   var x
      //   var indexCounter = 0
      //     //remove extraneous years
      //   for (x of citationDates) {
      //    if (x.length > 4) {
      //     var newDate = x.slice(0,4)
      //     citationDates[indexCounter] = newDate
      //    }
      //    else {}
      //    indexCounter = indexCounter + 1
      //   }
      //
      //     //set up scales
      // var xPositionScale = d3.scaleLinear()
      //   .domain([d3.min(citationDates),d3.max(citationDates)])
      //   .range([width*.1,width*.9])
      //
      // //add the timeline
      // var timeLine = svg.append('path')
      //     //.transition().duration(2000)
      //     .attr('d',lineFunction(lineData))
      //     .attr('stroke-width',2)
      //     .attr('stroke','#333333')
      //
      // //add axis labels
      //
      // var yearLabelStart = svg.append('g')
      //   .attr('transform','translate(' + width*.1 +','+ height*.23 + ')')
      //   .append('text')
      //     .text(d3.min(citationDates))
      //     .attr('class','year-label')
      //
      // var yearLabelEnd = svg.append('g')
      //   .attr('transform','translate(' + width*.9 +','+ height*.23 + ')')
      //   .append('text')
      //     .text(d3.max(citationDates))
      //     .attr('class','year-label')
      //
      //   //add circle for each citation
      //   var citationCircles = svg.selectAll('.citation-circle')
      //       .data(citationData)
      //       .enter().append('circle')
      //       .attr('cx',function (d) {
      //         return xPositionScale(d.date)
      //       })
      //       .attr('class','citation-circle')
      //       .attr('cy',height*.2)
      //       .attr('r',4)
      //       .attr('opacity',.5)
      //       .attr('text', function (d){
      //         return d['#text']
      //       })
      //       .attr('fill','#F24C3D')
      //       .attr('id', function (d) {
      //
      //         if (d.date.length >4)
      //           {return 'date' + d.date.slice(0,4)}
      //         else
      //           {return 'date' + d.date}
      //       })
      //
      // //add a slider
      // var sliderContainer = d3.select(overlaynumber).append('div')
      //   .attr('class','slider-container')
      //
      //
      // var slider = sliderContainer.append('input')
      //   .attr('type','range')
      //   .attr('min',d3.min(citationDates))
      //   .attr('max',d3.max(citationDates))
      //   .attr('id','rangeSlider')
      //   .attr('value',d3.min(citationDates))
      //   .attr('step',1)
      //   .attr('class','sliderIceberg')
      //   .attr('dates',citationDates)
      //   // .attr('oninput','selectCitationIceberg(this.value)')
      //   // .attr('onstart','selectCitationIceberg(this.value)')
      //
      // //add the selected citation container
      // var citationContainer = d3.select(overlaynumber).append('div')
      //   .attr('class','citationContainerIceberg')
      //   .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])



//end of if/else
      }

//end of function
}

//---------------------///

function buildIcebergTextChart(filename,icebergnumber,overlaynumber) {
      //time to make some charts

      //define the data, run function
    d3.json(filename).then(
    //begin function
    function icebergChart(datapoints) {
      var citationsLengths = datapoints.map(function (d) {return d.number_of_citations})


      //set up scales
      var colorScale = d3.scaleOrdinal()
        .domain(['noun','compound','phrase','adjective','suffix','verb','adverb'])
        .range(['#FABD21','#DB2CCA','#8633FF','#DB772C','#F24C3D','green','gray'])


      var container = d3.select(icebergnumber)

      //append span groups to svg
      var spans = container.selectAll('p')
        .data(datapoints)
        .enter().append('p')
        .sort(function(x, y){
          return y.number_of_citations - x.number_of_citations
        })
        .attr('class','iceberg-text')
        .html(function(d) {
          return d.word + "—<span>" +d.definition + '</span>'
        })

      //add click to reveal
      var reveals = spans.append('div')
        .attr('class','reveal-click')
        .on('click', function (d) {
            d3.select(this).selectAll('*').remove()
            var data = d.citations
            var container = d3.select(this)
            setupAssLine(data,container)
        })

      reveals.append('p')
        .attr('class','reveal-label')
        .text('click to reveal citations')

    //end of function
    }).catch(function(error){
         // handle error
      })
      //end of data read/script
    }

function buildIcebergTextList(filename,icebergnumber,overlaynumber) {
      //time to make some charts

      //define the data, run function
    d3.json(filename).then(
    //begin function
    function icebergChart(datapoints) {
      var overlayHeight = window.innerHeight

      d3.select(overlaynumber).transition()
        .style('height',(overlayHeight + 'px'))

      var container = d3.select(icebergnumber)

      //append circle groups to svg
      var usages = container.append("div").attr("class","usage-wrapper").selectAll('.usage-rows')
        .data(datapoints)
        .enter()
        .append('div')
        .attr("class","usage-rows")

      usages.append("p")
        .attr('class','usage-examples')
        // .style('color', '#333333')
        .text(function(d,i) {
          return (i+1) + '. ' + d.ismo_example
        })

      usages.append("p")
        .attr('class','word-container')
        .html(function(d){
          return "<span class='first'>"+d.word + "</span> <span class='sense-container'><i>"+ d.part_of_speech + "</i> ; " + d.definition + "</span>";
        })

      // var usageData = d3.select(this)['_groups'][0][0]['__data__']


      usages.append("div")
        .attr('class','def-container')
        .each(function(d){
          var container = d3.select(this);
          var data = d.citations
          setupAssLine(data,container)
        })

      // var senseContainer = usages.append('p')
      //   .attr('class','sense-container')
      //   .text(function(d){
      //     return
        // })




        // .on('click', function (d,i) {
        //
        //   // var overlay = d3.select(overlaynumber)
        //   //   .classed('active',true)
        //   //   .on('click', d3.select(this).classed('active',false))
        //
        //
        //   console.log(usageData,icebergnumber,overlaynumber);
        //
        //   buildCitationTimeline(usageData,icebergnumber,overlaynumber)
        // })

    //end of function
    }).catch(function(error){
         // handle error
      })
      //end of data read/script
    }

//run functions
function init() {
  console.log('Make something awesome!');
  //Run the stepper
  setupStepper()
  //Build charts moved to last step of stepper
}



export default { init, resize };
