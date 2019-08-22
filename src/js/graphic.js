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
    step6,
    step7
  ]

  //define click events on right-left buttons
  var tapLeft = d3.select('svg.tap--left')
    .on('click', function () {
      currentStep = currentStep - 1
      switchStep(currentStep)
      console.log('clicked')
      d3.event.stopPropagation()
    })
  var tapRight = d3.select('svg.tap--right')
    .on('click', function () {
      currentStep = currentStep + 1
      switchStep(currentStep)
      console.log('clicked')
    })
  var tapDown = d3.select('svg.tap--final')
    .on('click', function () {
      currentStep = currentStep + 1
      switchStep(currentStep)
      console.log('clicked')
      document.querySelector('.step').scrollIntoView({ behavior: 'smooth' })
    })
  var tapBack = d3.select('svg.tap--back')
    .on('click', function () {
      currentStep = currentStep - 1
      switchStep(currentStep)
      console.log('clicked')
    })


   // define each step
  function step0() {
    var entirePage = d3.select('.stepper')
      .on('click', function (d) {
      currentStep = currentStep + 1
      console.log(currentStep)
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
        .style('opacity','0')
      d3.select(".tap.tap--right").classed("active", false)
        .style('opacity','0')

      d3.select(".tap.tap--left")
        .transition()
        .style('right','55%')
        .style('bottom','5%')
        .style('opacity','0')
        .style('pointer-events','none')
      d3.select(".tap.tap--right")
        .transition()
        .style('left','55%')
        .style('bottom','5%')
        .style('opacity','0')


      //stop the first video on clickback
      d3.select('video.ismo.step1')['_groups'][0][0].pause()
   
    
  }

  function step1() {

    //Remove full page click
      d3.select('.stepper')
        .on('click', null)

    //Dectivate first-button
      d3.select(".tap--first").classed("active", false)

    //Activate right-left click buttons
      d3.select(".tap.tap--left").classed("active", true)
      d3.select(".tap.tap--right").classed("active", true)

      d3.select(".tap.tap--left")
        .transition()
        .duration(1000)
        .style('opacity','1')
        .style('right','55%')
        .style('bottom','5%')
        .style('pointer-events','auto')
      d3.select(".tap.tap--right")
        .transition()
        .duration(1000)
        .style('opacity','1')
        .style('left','55%')
        .style('bottom','5%')
        


      //play the first video
      d3.select('video.ismo.step1')['_groups'][0][0].play()
   
  }

  function step2() {
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
   d3.select('video.ismo.step1')['_groups'][0][0].currentTime = 0


         //deactivate script on clickback
   d3.select('.script-container').classed("active",false)

    //deselect active text on clickback
    d3.selectAll('.script-line').classed("active",false)

  }

  function step3() {
   //activate script 
   d3.select('.script-container').classed("active",true)
    .transition()
    .duration(1000)

    //deselct active text on clickback
    d3.selectAll('.script-line').classed("active",false)
    //select active text
    d3.selectAll('.script-line')
      .filter(function (d) {
        return d.step_used == 'step2'
      })
      .classed('active',true)

    
   //stop the first video
   d3.select('video.ismo.step2')['_groups'][0][0].pause()
   d3.select('video.ismo.step2')['_groups'][0][0].currentTime = 0
   //play the second video
   d3.select('video.ismo.step3')['_groups'][0][0].play()
  //pause the third video on clickback
   d3.select('video.ismo.step4')['_groups'][0][0].pause()
   d3.select('video.ismo.step4')['_groups'][0][0].currentTime = 0

   //highlight instances of ass
    highlightAss()
  }

  function step4() {
    
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
  }
  

  function step5() {

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

    //circle unique usages
    circleUniques()

    //Reactivate right click buttons on clickback
      d3.select(".tap.tap--right").classed("active", true)
       d3.select(".tap.tap--left").classed("active", true)

      //Move left tap to top corner

    //Deactivate final click button on clickback
      d3.select(".tap.tap--final").classed("active", false)
      d3.select(".tap.tap--final").transition()
        .style('opacity','0')

    //Move back right-left click buttons
      d3.select(".tap.tap--right").transition()
        .duration(1000)
        .style('left','55%')
        .style('bottom','5%')
        .style('opacity','1')
      d3.select('.tap.tap--left').transition()
        .duration(1000)
        .style('right','55%')
        .style('bottom','5%')
        .style('opacity','1')
   
  }

  function step6() {

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

    //Move out right-left click buttons
      d3.select(".tap.tap--right").transition()
        .duration(1000)
        .style('left','65%')
        .style('bottom','20%')
        .style('opacity','.6')
      d3.select('.tap.tap--left').transition()
        .duration(1000)
        .style('right','65%')
        .style('bottom','20%')
        .style('opacity','.6')

    //Activate final click button
      d3.select(".tap.tap--final").classed("active", true)

      d3.select(".tap.tap--final").transition()
        .duration(1)
        .style('opacity',0)

      d3.select(".tap.tap--final").transition()
        .duration(1000)
        .style('opacity',1)
    
    //Dectivate clickback button on clickback
      d3.select(".tap.tap--back").classed("active", false)

      //Reactivate left-right click on clickback
      d3.select('.tap.tap--left').classed('active',true)
      d3.select(".tap.tap--right").classed("active", true)


      //hide asses on clickback
      d3.select('#script-container')
        .transition()
        .duration(1000)
        .style('overflow','hidden')

        //reactivate on clickback
      d3.select('.stepper__graphics').classed('active',true)
        .attr('display','none')
      d3.select('.script-container')
        .classed('active',true)

      //deactivate scroller on clickback
      d3.select('#scroll').classed('active',false)

      //reset text color on clickback
      d3.selectAll('#ass-instance')
        .transition()
        .duration(1000)
        .style('color','#b2eafc')


  }

    function step7() {
      //remove the stepper and activate the scroller
      d3.select('.stepper__graphics').classed('active',false)
        .attr('display','none')
      d3.select('.script-container')
        .classed('active',false)
      d3.select('.tap.tap--final')
        .classed('active',false)
      d3.select(".tap.tap--final").transition()
        .duration(1000)
        .style('opacity',0)
      d3.select('#scroll').classed('active',true)
        .attr('display','inline')
      //deselect active text on clickback/clickthrough
      d3.selectAll('.script-line').classed("active",false)

      //pause the fifth video
      d3.select('video.ismo.step6')['_groups'][0][0].pause()

      //keep only asses moving into scroll
      assOnlyScript()

      //activate tap back button
      d3.select('.tap.tap--back')
        .classed('active',true)

      //deactivate leftright click button
      d3.select('.tap.tap--left')
        .classed('active',false)
      d3.select('.tap.tap--right')
        .classed('active',false)

      d3.select('.tap.tap--left').transition()
        .style('opacity','0')
      d3.select('.tap.tap--right').transition()
        .style('opacity','0')

      //allow all asses to peek out
      d3.select('#script-container')
        .transition()
        .duration(1000)
        .style('overflow','visible')

      d3.selectAll('#ass-instance')
        .transition()
        .duration(1000)
        .style('color','#333333')

   
  }
  //end of step functions

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

  //circle unique usages function
  function circleUniques() {
    console.log('running circles')
      var scriptLines = d3.selectAll('.script-line')
      .filter (function (d) {
        return d.first_unique_usage == 'TRUE'
      })
      .enter()
      .append('circle')
        .attr('stroke','D1a72a')
        .attr('fill','none')
        .attr('r',3)
        .attr('cx', function(d) {
          return select(this).position().left
        })
        .attr('cy', function(d) {
          return select(this).position().top
        })  
    }
  //end of circleunique usages function

  //change step function
  function switchStep(currentStep){
      //activate the current step
      d3.selectAll(".stepper__annotation").classed("active", false);
      d3.select(".stepper__annotation.step" + currentStep).classed("active", true);
      d3.selectAll(".stepper__video").classed("active", false);
      d3.select(".stepper__video.step" + currentStep).classed("active", true);
      d3.selectAll(".stepper__intro").classed("active", false);
      d3.select(".stepper__intro.step" + currentStep).classed("active", true);
      console.log(("step" + currentStep))
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
  console.log('running')
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

//----------------//

//define the data, run script function
d3.csv('assets/data/ismo_script.csv').then(
//begin script function
function setupScrollScript(datapoints) {
  console.log('running')
  var scrollScriptContainer = d3.select('.scroll__graphic')
    .append('p')
    .attr('id','script-container')
    .attr('class','chart')

  var scrollScriptLines = scrollScriptContainer.selectAll('span')
    .data(datapoints)
    .enter().append('span')
    .attr('class','scroll-script-line')
    .text(function (d){
      return (d.text + " ")
}) 
//end of script function
}).catch(function(error){
     // handle error   
  })
//end of data read/script

//----------------//

//begin scrolly function
function setupScroller() {

    //array of step states
    var scrollSteps = [
      scrollStep0,
      scrollStep1,
      scrollStep2,
      scrollStep3,
      scrollStep4,
      scrollStep5,
      scrollStep6,
      scrollStep7
    ]

    //define step functions
    function scrollStep0() {

    }

    function scrollStep1() {
      // d3.select('#scroll').on('click',alert('hey1'))


    }

    function scrollStep2() {


      //on scrollback
      d3.select('.ass-label').classed('active',false)
      d3.selectAll('.usage-examples').classed('active',false)

      d3.selectAll('.scroll-script-line')
        .transition()
        .duration(1000)
        .style('opacity',1)
        .style('display','inline')

      var chart = d3.select('.chart')
        // .style('top','35%')

    }

    function scrollStep3() {
      var yPositionScale = d3.scalePoint()
        .domain(['1','2','3','4','5','6','7','8','9','10'])
        .range([0,window.innerHeight*.75])

            //add in word label 'ass'
      var assLabel = d3.select('.ass-label').classed('active',true)
      d3.select('.ass-label')
        .style('opacity',0)

      d3.select('.ass-label').transition()
        .duration(1000)
        .style('opacity',1)

      d3.selectAll('.scroll-script-line')
        .style('opacity',1)


      var scriptLines = d3.selectAll('.scroll-script-line')
        .transition()
        .duration(1000)
        .style('opacity',0)
        .style('display','none')

        //on scrollback
        d3.selectAll('.usage-examples').remove()
        

        //define the data, run script function
        d3.csv('assets/data/ismo_script.csv').then(
        //begin script function
        function setupScrollScript(datapoints) {

          console.log('yeeee')
          var uniques = d3.select('#script-container').selectAll('.usage-examples')
            .data(datapoints)
            .enter().append('span')
            .sort(function(x, y){
           return x.usage_number - y.usage_number
        })
            .filter(function (d) {
            return d.first_unique_usage == 'TRUE'
          })
            .text(function (d){
          return d.usage_number + '. ' + d.usage_example
        }) 
            .attr('id', function (d) {
              return 'usage' + d.usage_number
            })
            .attr('class','usage-examples')
            .classed('active',true)
      
        //end of script function
        }).catch(function(error){
             // handle error   
          })
        //end of data read/script

      d3.selectAll('.usage-examples')
        .style('opacity',0)

      d3.selectAll('.usage-examples').transition()
        .duration(1000)
        .style('opacity',1)


    }

    function scrollStep4() {
      //show only first usage
      d3.selectAll('.usage-examples').classed('active',false)
      d3.select('.usage-examples#usage1').classed('active',true)

      //on clickback
      d3.select('.time-line')
        .transition()
        .duration(1000)
        .attr('opacity',0)
        .remove()
      d3.select('.slider-container')
        .transition()
        .duration(1000)
        .attr('opacity',0)
        .remove()
      d3.select('.citationContainer')
        .transition()
        .duration(1000)
        .attr('opacity',0)
        .remove()


    }

    function scrollStep5() {

      //on clickback

      d3.selectAll('.usage-examples').classed('active',false)
      d3.select('.usage-examples#usage1').classed('active',true)
      d3.select('.usage-examples#usage1')
        .style('background-color','transparent')

      //on clickback deactivate stack section
      d3.select('.stack').classed('active',false)


      //define the data, run function
    d3.json('assets/data/ass_long_data.json').then(
    //begin function
    function setupAssLine(datapoints) {
      console.log('running ass line')
      console.log(datapoints)

      //set up variables
      const margin = { top: 20, right: 20, bottom: 20, left: 20 }
      const height = window.innerHeight - margin.top - margin.bottom
      const width = window.innerWidth - margin.left - margin.right
      var svg = d3.select('.scroll__graphic')
        .append('svg')
        .attr('class','time-line')
        .attr('width',width)
        .attr('height',height-margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
      var lineData = [ { "x": width*.1,   "y": height*.2},  { "x": width*.9,  "y": height*.2} ]

      //set up scales
      var xPositionScale = d3.scaleLinear()
        .domain([1761,2000])
        .range([width*.1,width*.9])

      //filter data
      var citationData = datapoints[186].citations
      var x 
      var citationCounter = 0
      for (x of citationData){
        if (x['@first'] == 'yes')
          {citationData = citationData.slice(citationCounter,)}
        citationCounter = citationCounter + 1
      }
      console.log(citationData)

      //grab just the dates
        var citationDates = citationData.map(function (d) {return d.date})
        var x
        var indexCounter = 0
          //remove extraneous years
         for (x of citationDates) {
          console.log(x.length)
          if (x.length > 4) {
            var newDate = x.slice(0,4)
            citationDates[indexCounter] = newDate
          }
          else {}
          indexCounter = indexCounter + 1

        }
        console.log(citationDates)

        var firstDate = citationDates[0]
        var lastDate = citationDates.slice(-1)[0]

      //add the timeline 
      var timeLine = svg.append('path')
          //.transition().duration(2000)
          .attr('d',lineFunction(lineData))
          .attr('stroke-width',2)
          .attr('stroke','#333333')

      //add axis labels

      var yearLabelStart = svg.append('g')
        .attr('transform','translate(' + width*.1 +','+ height*.23 + ')')
        .append('text')
          .text(firstDate)
          .attr('class','year-label')

      var yearLabelEnd = svg.append('g')
        .attr('transform','translate(' + width*.9 +','+ height*.23 + ')')
        .append('text')
          .text(lastDate)
          .attr('class','year-label')
        
        //add circle for each citation  
        var citationCircles = svg.selectAll('circle')
            .data(citationData)
            .enter().append('circle')
            .attr('cx',function (d) {
              if (d.date.length >4)   
                {return  xPositionScale(d.date.slice(0,4))}
              else
                {return xPositionScale(d.date)}
              
            })
            .attr('cy',height*.2)
            .attr('r',4)
            .attr('opacity',.5)
            .attr('text', function (d){
              return d['#text']
            })
            .attr('fill','#F24C3D')
            .attr('id', function (d) {

              if (d.date.length >4)   
                {return 'date' + d.date.slice(0,4)}
              else
                {return 'date' + d.date}
            })

      //add a slider
      var sliderContainer = d3.select('.scroll__graphic').append('div')
        .attr('class','slider-container')

      //add the selected citation container
      var citationContainer = d3.select('.scroll__graphic').append('div')
        .attr('class','citationContainer')
        .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])
        
      var slider = sliderContainer.append('input')
        .attr('type','range')
        .attr('min',firstDate)
        .attr('max',lastDate)
        .attr('id','rangeSLider')
        .attr('value',1761)
        .attr('step',1)
        .attr('class','slider')
        .attr('dates',citationDates)
        .attr('oninput','selectCitation(this.value)')
        .attr('onstart','selectCitation(this.value)')





    
//---------------------///

    //end of function
    }).catch(function(error){
         // handle error   
      })
      //end of data read/script
        
    }

    function scrollStep6() {

      //bring back all usages
      d3.selectAll('.usage-examples').classed('active',true)

      d3.select('.slider-container').transition().duration(1000).style('opacity',0)
      d3.select('.slider-container').remove()
      d3.select('.citationContainer').transition().duration(1000).style('opacity',0)
      d3.select('.citationContainer').remove()
      d3.select('.time-line').transition().duration(1000).style('opacity',0)
      d3.select('.time-line').remove()

      //add background colors for pos
      d3.selectAll('#usage1, #usage2')
        .transition()
        .duration(1000)
        .style('background-color','rgba(250, 189, 33, .7)')

      d3.select('#usage3')
        .transition()
        .duration(1000)
        .style('background-color','rgba(219, 119, 44, .7)')

      d3.select('#usage4')
        .transition()
        .duration(1000)
        .style('background-color','rgba(242, 76, 61, .7)')

      d3.selectAll('#usage5, #usage6, #usage7, #usage8')
        .transition()
        .duration(1000)
        .style('background-color','rgba(219, 44, 202, .7)')

      d3.selectAll('#usage9, #usage10')
        .transition()
        .duration(1000)
        .style('background-color','rgba(134, 51, 255, .7)')

      //unstick chart
      d3.select('.scroll__graphic')
        .attr('position','relative')

      //activate stack section
      d3.select('.stack').classed('active',true)
    
    }  

    function scrollStep7() {

    }   


    var main = d3.select('main')
    var scrolly = main.select('#scroll');
    var graphic = scrolly.select('.scroll__graphic');
    var text = scrolly.select('scroll__text');
    var step = text.selectAll('.step');

    // initialize the scrollama
    var scroller = scrollama();

    // generic window resize listener event
    function handleResize() {
      // 1. update height of step elements
      var stepH = Math.floor(window.innerHeight * 0.75);
      step.style('height', stepH + 'px');

      var graphicHeight = window.innerHeight 
      var graphicMarginTop = (window.innerHeight - graphicHeight) / 2  

      graphic
        .style('height', graphicHeight + 'px')
        .style('top', 0 + 'px');


      // 3. tell scrollama to update new element dimensions
      scroller.resize();
    }

    // scrollama event handlers
    function handleStepEnter(response) {
      // response = { element, direction, index }

      // add color to current step only
      step.classed('is-active', function (d, i) {
        return i === response.index;
      })
      //run current step function
      scrollSteps[response.index]();
      console.log('scroll step is '+ response.index)

      // update graphic based on step, run step functions here
      // graphic.select('.chart').text(response.index + 1);
    }

    function setupStickyfill() {
      d3.selectAll('.sticky').each(function () {
        Stickyfill.add(this);
      });
    }


    function init() {
      setupStickyfill();

      // 1. force a resize on load to ensure proper dimensions are sent to scrollama
      handleResize();

      // 2. setup the scroller passing options
      //    this will also initialize trigger observations
      // 3. bind scrollama event handlers (this can be chained like below)
      scroller.setup({
        step: '#scroll .scroll__text .step',
        offset: 0.33,
        debug: false
        // once: true,
      })
        .onStepEnter(handleStepEnter)


      // setup resize event
      window.addEventListener('resize', handleResize);
    }

    // kick things off
    init();
}
//end of scrolly function

//-----------------//

//adding charts to stack

function buildCitationTimeline(usageData,icebergnumber,overlaynumber) {
      console.log('running ass line')
      console.log(usageData)

      //set up variables
      const margin = { top: 20, right: 20, bottom: 20, left: 20 }
      const height = window.innerHeight - margin.top - margin.bottom
      const width = window.innerWidth - margin.left - margin.right
      var svg = d3.select(overlaynumber)
        .append('svg')
        .attr('class','time-line')
        .attr('width',width)
        .attr('height',height-margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
      var lineData = [ { "x": width*.1,   "y": height*.2},  { "x": width*.9,  "y": height*.2} ]
      var colorScale = d3.scaleOrdinal()
        .domain(['noun','compound','phrase','adjective','suffix','verb','adverb'])
        .range(['#FABD21','#DB2CCA','#8633FF','#DB772C','#F24C3D','green','gray'])

      //filter data and only do line if more than 1 citation
      if (usageData.number_of_citations == 1)
        {
          var citationData = Array(usageData.citations)

          //add circle for each citation  
        var citationCircles = svg.selectAll('.citation-circle')
            .data(citationData)
            .enter().append('circle')
            .attr('cx',width/2)
            .attr('class','citation-circle')
            .attr('cy',height*.2)
            .attr('r',4)
            .attr('opacity',1)
            .attr('text', function (d){
              return d['#text']
            })
            .attr('fill','#F24C3D')
            .attr('id', function (d) {

              if (d.date.length >4)   
                {return 'date' + d.date.slice(0,4)}
              else
                {return 'date' + d.date}
            })

          if (citationData[0].date.length > 4)
            {var yearLabelText = citationData[0].date.slice(0,4)}
          else
            {var yearLabelText = citationData[0].date}
           

        var yearLabelStart = svg.append('g')
          .attr('transform','translate(' + width*.5 +','+ height*.23 + ')')
          .append('text')
          .text(yearLabelText)
          .attr('class','year-label')

          //add the selected citation container
      var citationContainer = d3.select(overlaynumber).append('div')
        .attr('class','citationContainer')
        .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])


      var senseContainer = d3.select(overlaynumber).append('div')
        .attr('class','sense-container')
        .text(usageData.part_of_speech + ": " + usageData.definition)

      var wordContainer = d3.select(overlaynumber).append('h1')
        .attr('class','word-container')
        .style('color', colorScale(usageData.part_of_speech))
        .text(usageData.word)
      } 
      else
        {
          var citationData = usageData.citations

          var x 
          var citationCounter = 0
          for (x of citationData){
            if (x['@first'] == 'yes')
              {citationData = citationData.slice(citationCounter,)}
            citationCounter = citationCounter + 1
          }

          //grab just the dates
          var citationDates = citationData.map(function (d) {return d.date})
          var x
          var indexCounter = 0
            //remove extraneous years
           for (x of citationDates) {
            console.log(x.length)
            if (x.length > 4) {
              var newDate = x.slice(0,4)
              citationDates[indexCounter] = newDate
            }
            else {}
            indexCounter = indexCounter + 1

          }

          //set up scales
      var xPositionScale = d3.scaleLinear()
        .domain([d3.min(citationDates),d3.max(citationDates)])
        .range([width*.1,width*.9])

      //add the timeline 
      var timeLine = svg.append('path')
          //.transition().duration(2000)
          .attr('d',lineFunction(lineData))
          .attr('stroke-width',2)
          .attr('stroke','#333333')

      //add axis labels

      var yearLabelStart = svg.append('g')
        .attr('transform','translate(' + width*.1 +','+ height*.23 + ')')
        .append('text')
          .text(d3.min(citationDates))
          .attr('class','year-label')

      var yearLabelEnd = svg.append('g')
        .attr('transform','translate(' + width*.9 +','+ height*.23 + ')')
        .append('text')
          .text(d3.max(citationDates))
          .attr('class','year-label')
        
        //add circle for each citation  
        var citationCircles = svg.selectAll('.citation-circle')
            .data(citationData)
            .enter().append('circle')
            .attr('cx',function (d) {
              return xPositionScale(d.date)
            })
            .attr('class','citation-circle')
            .attr('cy',height*.2)
            .attr('r',4)
            .attr('opacity',.5)
            .attr('text', function (d){
              return d['#text']
            })
            .attr('fill','#F24C3D')
            .attr('id', function (d) {

              if (d.date.length >4)   
                {return 'date' + d.date.slice(0,4)}
              else
                {return 'date' + d.date}
            })

      //add a slider
      var sliderContainer = d3.select(overlaynumber).append('div')
        .attr('class','slider-container')
        

      var slider = sliderContainer.append('input')
        .attr('type','range')
        .attr('min',d3.min(citationDates))
        .attr('max',d3.max(citationDates))
        .attr('id','rangeSlider')
        .attr('value',d3.min(citationDates))
        .attr('step',1)
        .attr('class','slider')
        .attr('dates',citationDates)
        .attr('oninput','selectCitation(this.value)')
        .attr('onstart','selectCitation(this.value)')


      //add the selected citation container
      var citationContainer = d3.select(overlaynumber).append('div')
        .attr('class','citationContainer')
        .text('(' + citationData[0].date + ') ' + citationData[0]['#text'])


      var senseContainer = d3.select(overlaynumber).append('div')
        .attr('class','sense-container')
        .text(usageData.part_of_speech + ": " + usageData.definition)

      var wordContainer = d3.select(overlaynumber).append('h1')
        .attr('class','word-container')
        .style('color', colorScale(usageData.part_of_speech))
        .text(usageData.word)
    
//end of if/else
      }

//end of function
}

function buildIcebergChart(filename,icebergnumber,overlaynumber) {
      //time to make some charts

      //define the data, run function
    d3.json(filename).then(
    //begin function
    function icebergChart(datapoints) {
      console.log('running ass chart')
      console.log(datapoints)
      var citationsLengths = datapoints.map(function (d) {return d.number_of_citations})
      console.log(datapoints.length)

      //set up variables
      const margin = { top: 20, right: 20, bottom: 20, left: 20 }
      const height = window.innerHeight*2 - margin.top - margin.bottom
      const width = window.innerWidth - margin.left - margin.right
      var svg = d3.select(icebergnumber)
        .append('svg')
        .attr('width',width)
        .attr('height',height*2)
        .attr('class','iceberg')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      //set up scales
      var colorScale = d3.scaleOrdinal()
        .domain(['noun','compound','phrase','adjective','suffix','verb','adverb'])
        .range(['#FABD21','#DB2CCA','#8633FF','#DB772C','#F24C3D','green','gray'])
      var yPositionScale = d3.scaleLinear()
        .domain([d3.max(citationsLengths),d3.min(citationsLengths)])
        .range([0+margin.bottom,height-margin.top])
        .clamp(true)

      console.log('still in business')


      //run force simulation
      var simulation = d3.forceSimulation(datapoints)
        .force("y", d3.forceY(function(d) { return yPositionScale(d.number_of_citations); }).strength(.9))
        .force("x", d3.forceX(function(d) { return width/2; }).strength(.1))
        .force("collide", d3.forceCollide().radius(function(d){ return 20 }))
        .force("center", d3.forceCenter(width/2, height/2))
        .force("manyBody", d3.forceManyBody().strength(-60))
        
      // simulation.start();
      for (var i = 0; i < 600; ++i) simulation.tick();
      simulation.stop();

      console.log('still going')

      //append circle groups to svg
      var circleGroups = svg.selectAll('g')
        .data(datapoints)
        .enter().append('g')
        .attr("x", function(d) { return d.x} )
        .attr("y", function(d) { return d.y} )

      console.log('should be g')

      //add in circles for each usage
      // var usageCircles = circleGroups.append('circle')
      //   .attr('fill', function (d) {
      //     return colorScale(d.part_of_speech)
      //   })
      //   .attr('r', 20)
      //   .attr('cy', function (d) {
      //     return d3.select(this.parentNode).attr('y')
      //   })
      //   .attr('cx', function (d) {
      //     return d3.select(this.parentNode).attr('x')
      //   })
      //   .attr('stroke','#333333')
      //   .attr('opacity', .8)
      //   .attr('id', function(d){ return 'pos' + d.part_of_speech })
      //   .on('mouseover', function(d, i) {
      //     var currentState = this
      //       d3.select(this).style('opacity', 1);
      //   })
      //   .on('mouseout', function(d, i) {
      //     var currentState = this
      //       d3.select(this).style('opacity', .8);
      //   })
      //   .on('click', function (d,i) {
      //     console.log('clicked')
      //     var overlay = d3.select(overlaynumber)
      //       .classed('active',true)
      //       .on('click', d3.select(this).classed('active',false))
      //     var usageData = d3.select(this)['_groups'][0][0]['__data__']
      //     buildCitationTimeline(usageData,icebergnumber,overlaynumber)
      //   })

      //add in circles for each usage
      // var usageCircles = circleGroups.append('rect')
      //   .attr('fill', function (d) {
      //     return colorScale(d.part_of_speech)
      //   })
      //   .attr('width', 40)
      //   .attr('height',20)
      //   .attr('y', function (d) {
      //     return d3.select(this.parentNode).attr('y')
      //   })
      //   .attr('x', function (d) {
      //     return d3.select(this.parentNode).attr('x')
      //   })
      //   .attr('stroke','#333333')
      //   .attr('opacity', .8)
      //   .attr('id', function(d){ return 'pos' + d.part_of_speech })
      //   .on('mouseover', function(d, i) {
      //     var currentState = this
      //       d3.select(this).style('opacity', 1);
      //   })
      //   .on('mouseout', function(d, i) {
      //     var currentState = this
      //       d3.select(this).style('opacity', .8);
      //   })
      //   .on('click', function (d,i) {
      //     console.log('clicked')
      //     var overlay = d3.select(overlaynumber)
      //       .classed('active',true)
      //       .on('click', d3.select(this).classed('active',false))
      //     var usageData = d3.select(this)['_groups'][0][0]['__data__']
      //     buildCitationTimeline(usageData,icebergnumber,overlaynumber)
      //   })

      //add in circles for each usage
      var usageTexts = circleGroups.append('text')
        .style('background-color', function (d) {
          return colorScale(d.part_of_speech)
        })
        .style('font-size', 24)
        .attr('y', function (d) {
          return d3.select(this.parentNode).attr('y')
        })
        .attr('x', function (d) {
          return d3.select(this.parentNode).attr('x')
        })
        .attr('stroke',function (d) {
          return colorScale(d.part_of_speech)
        })
        .attr('fill',function (d) {
          return colorScale(d.part_of_speech)
        })
        .attr('opacity', .8)
        .attr('id', function(d){ return 'pos' + d.part_of_speech })
        .text(function (d) {
          return d.word
        })
        .on('mouseover', function(d, i) {
          var currentState = this
            d3.select(this).style('opacity', 1);
        })
        .on('mouseout', function(d, i) {
          var currentState = this
            d3.select(this).style('opacity', .8);
        })
        .on('click', function (d,i) {
          console.log('clicked')
          var overlay = d3.select(overlaynumber)
            .classed('active',true)
            .on('click', d3.select(this).classed('active',false))
          var usageData = d3.select(this)['_groups'][0][0]['__data__']
          buildCitationTimeline(usageData,icebergnumber,overlaynumber)
        })

        //add in circles for each usage
      var usageTexts = circleGroups.append('text')
        .style('background-color', function (d) {
          return colorScale(d.part_of_speech)
        })
        .style('font-size', 24)
        .attr('y', function (d) {
          return d3.select(this.parentNode).attr('y')
        })
        .attr('x', function (d) {
          return d3.select(this.parentNode).attr('x')
        })
        .attr('stroke',function (d) {
          return colorScale(d.part_of_speech)
        })
        .attr('fill',function (d) {
          return colorScale(d.part_of_speech)
        })
        .attr('opacity', .8)
        .attr('id', function(d){ return 'pos' + d.part_of_speech })
        .text(function (d) {
          return d.word
        })
        .on('mouseover', function(d, i) {
          var currentState = this
            d3.select(this).style('opacity', 1);
        })
        .on('mouseout', function(d, i) {
          var currentState = this
            d3.select(this).style('opacity', .8);
        })
        .on('click', function (d,i) {
          console.log('clicked')
          var overlay = d3.select(overlaynumber)
            .classed('active',true)
            .on('click', d3.select(this).classed('active',false))
          var usageData = d3.select(this)['_groups'][0][0]['__data__']
          buildCitationTimeline(usageData,icebergnumber,overlaynumber)
        })

      // //add in labels
      // var side = 2 * 4 * Math.cos(Math.PI / 4)
      // var dx = 4 - side / 2
    
      // var wordTextLabels = circleGroups.append('foreignObject')
      //   .attr("width", side)
      //   .attr("height", side)
      //   // .attr('transform', 'translate(' + [-dx*2, -dx*2] + ')')
      //   .attr('y', function (d) {
      //     return d3.select(this.parentNode).attr('y')
      //   })
      //   .attr('x', function (d) {
      //     return d3.select(this.parentNode).attr('x')
      //   })
      //   .append("xhtml:span")
      //   .attr('class','usage-labels')
      //   .html(function (d) { return  d.word })

    //end of function
    }).catch(function(error){
         // handle error   
      })
      //end of data read/script
    }

//---------------------///

function buildIcebergTextChart(filename,icebergnumber,overlaynumber) {
      //time to make some charts

      //define the data, run function
    d3.json(filename).then(
    //begin function
    function icebergChart(datapoints) {
      var citationsLengths = datapoints.map(function (d) {return d.number_of_citations})
      console.log(datapoints.length)


      //set up scales
      var colorScale = d3.scaleOrdinal()
        .domain(['noun','compound','phrase','adjective','suffix','verb','adverb'])
        .range(['#FABD21','#DB2CCA','#8633FF','#DB772C','#F24C3D','green','gray'])


      var container = d3.select(icebergnumber)

      //append circle groups to svg
      var spans = container.selectAll('span')
        .data(datapoints)
        .enter().append('span')
        .sort(function(x, y){
   return y.number_of_citations - x.number_of_citations
})
        .attr('class','iceberg-text')
        .attr('opacity',.8)
        .style('color', function (d) {
          return colorScale(d.part_of_speech)
        })
        .text(function(d) { 
          return d.word + ' • ' 
        })
        .on('mouseover', function(d, i) {
          var currentState = this
            d3.select(this).style('opacity', 1);
        })
        .on('mouseout', function(d, i) {
          var currentState = this
            d3.select(this).style('opacity', .8);
        })
        .on('click', function (d,i) {
          console.log('clicked')
          var overlay = d3.select(overlaynumber)
            .classed('active',true)
            .on('click', d3.select(this).classed('active',false))
          var usageData = d3.select(this)['_groups'][0][0]['__data__']
          buildCitationTimeline(usageData,icebergnumber,overlaynumber)
        })

       console.log(d3.select('#iceberg1').style('height')) 

      var leftShape = d3.select('#left-shape1')
        .style('height','101em')
        // .style('height','2000px')
      var rightShape = d3.select('#right-shape1')
        .style('height','101em')

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
  //Run the scroller
  setupScroller()
  //Build charts
  buildIcebergTextChart('assets/data/ass_long_data.json','#iceberg1','#overlay1')
  buildIcebergTextChart('assets/data/fuck_long_data.json','#iceberg2','#overlay2')
  buildIcebergTextChart('assets/data/red_long_data.json','#iceberg3','#overlay3')
  buildIcebergTextChart('assets/data/shit_long_data.json','#iceberg4','#overlay4')
}



export default { init, resize };

