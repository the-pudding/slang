var stepperTriggered = false;
var ready = false;
var chartsBuilt = false;

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
      if(d3.select(this).classed("tap--left") && ready){
        currentStep = currentStep - 1
        switchStep(currentStep)
        d3.event.stopPropagation()
      }
      else if(ready) {
        currentStep = currentStep + 1
        switchStep(currentStep)
      }
    })
  // var tapRight = d3.select('svg.tap--right')
  //   .on('click', function () {
  //   })



  var tapDown = d3.select('svg.tap--final')
    .on('click', function () {
      currentStep = currentStep + 1
      switchStep(currentStep)
      document.querySelector('.step').scrollIntoView({ behavior: 'smooth' })
    })


   // define each step
  function step0() {

    var entirePage = d3.select('.stepper')
      .on('click', function (d) {
        if(ready){
          currentStep = currentStep + 1
          switchStep(currentStep)
        }
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

    if (stepsClicked === 1) {
     splitSubtitle1()
    }

    highlightSubtitle1()


    d3.select('.subtitle.subtitle1').classed('active',true)
    d3.select('.subtitle.subtitle1')
      .style('opacity',0)
    d3.select('.subtitle.subtitle1').transition()
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

    //resize overlay based on video size
     function getRenderedSize(contains, cWidth, cHeight, width, height, pos){
    var oRatio = width / height,
          cRatio = cWidth / cHeight;
      return function() {
        if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
          this.width = cWidth;
          this.height = cWidth / oRatio;
        } else {
          this.width = cHeight * oRatio;
          this.height = cHeight;
        }
        this.left = (cWidth - this.width)*(pos/100);
        this.right = this.width + this.left;
        return this;
      }.call({});
    }

    function getImgSizeInfo(img) {
      var pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');
      return getRenderedSize(true,
                             img.width,
                             img.height,
                             img.naturalWidth,
                             img.naturalHeight,
                             parseInt(pos[0]));
    }

   var img = document.getElementsByTagName('img')[0]
   var img_sizes = getImgSizeInfo(img)
   var body = document.getElementsByTagName('body')[0]

  if (body.classList.contains('is-mobile')) {
    d3.select('.pause-overlay')
    .style('opacity',1)

  } else {

    d3.select('.pause-overlay')
      // .style('height',img_sizes.height + 'px')
      // .style('width',img_sizes.width + 'px')
      .style('opacity',1);
    // d3.select('.script-container')
    //   .style('height',img_sizes.height + 'px')
    //   .style('width',img_sizes.width*.9 + 'px');
  }


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

    d3.selectAll('.sentence-word').classed('highlighted',false);

    var highlightTimes = [.1,.3,.5,.7,1.0,1.3,1.8,2,2.3,
    3.7,3.9,
    5.5,5.7,6,6.1,6.4,6.5,6.9,7.1,7.2,7.4,
    8.2,8.5,8.6,8.7,9.8,9.9,10.1,11.1]
    var video = d3.select('video.ismo.step3')['_groups'][0][0]

    highlightWordsStaggered(video,highlightTimes)


   //play the second video
   d3.select('video.ismo.step3')['_groups'][0][0].play()
  //pause the third video on clickback
   d3.select('video.ismo.step4')['_groups'][0][0].pause()
   d3.select('video.ismo.step4')['_groups'][0][0].currentTime = 0

  }

  function step4() {

    //scroll back to top of text on clickback
    setTimeout(function() {
        var i = -10;
        var int = setInterval(function() {
          document.getElementsByClassName('script-container')[0].scrollTo(0, i);
          i -= 10;
          if (i <= -200) clearInterval(int);
        }, 20);
    }, 1000);

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

    if (stepsClicked === 4) {
     splitSentence()
    }

    d3.selectAll('.sentence-word').classed('highlighted',false);

    //
    // d3.selectAll('.highlighted').transition()
    //   .duration(250)
    //   .on('start', function (d) {
    //     d3.select(this).classed('highlighted',false)
    //   })

    var highlightTimes = [.7,.9,1.1,1.2,1.3,1.5,1.7,1.9,2,
    2.6,2.9,3.1,3.3,3.7,
    3.8,4.2,4.5,4.7]
    var video = d3.select('video.ismo.step4')['_groups'][0][0]

    highlightWordsStaggered(video,highlightTimes)
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

   d3.select('.script-container').transition()
    .duration(1000)
    .style('opacity',1)

   //deselect active text on clickback/clickthrough
    d3.selectAll('.script-line').classed("active",false)

   //select active text
    d3.selectAll('.script-line')
      .filter(function (d) {
        return d.step_used == 'step4'
      })
      .classed('active',true)


      //Reactivate right click buttons on clickback
      d3.select(".tap.tap--right").classed("active", true).style("display",null).style("opacity",null)
      d3.select(".tap.tap--left").classed("active", true)



      //Move left tap to top corner

    //Deactivate final click button on clickback
      d3.select(".tap.tap--final").classed("active", false)
      d3.select(".tap.tap--final").transition()
        .style('opacity','0')

    if (stepsClicked === 5) {
     splitSentence()
    }

    //highlight instances of ass
    highlightAss()

    //reset text color on clickback
      d3.selectAll('#ass-instance')
        .transition()
        .duration(250)
        .style('color','rgba(186,186,186,0.4)')
          .transition()
          .duration(1000)
          .style('color','#00fff3')


      d3.selectAll('.sentence-word').classed('highlighted',false);


    // d3.selectAll('.highlighted').transition()
    //   .duration(250)
    //   .on('start', function (d) {
    //     d3.select(this).classed('highlighted',false)
    //   })

    //scroll to offscreen text
    setTimeout(function() {
        var i = 10;
        var int = setInterval(function() {
          document.getElementsByClassName('script-container')[0].scrollTo(0, i);
          i += 10;
          if (i >= 400) clearInterval(int);
        }, 20);
    }, 13000);

    var highlightTimes = [.1,.3,.5,1.4,2.8,3,4,4.2,5,5.1,5.3,5.5,5.7,5.9,6.2,
    7.1,8,9.5,9.7,10.5,
    11.2,11.7,11.9,12.1,
    12.7,12.9,13.1,13.3,13.5,13.7,13.7,14.4,15.5,15.7,15.9,16.2,16.5,16.5,
    17,17.2,17.4,17.6,17.8,18.6,18.8,19,19.2,19.4,19.6,20,
    20.2,20.3,20.4,20.5,20.8,21,21.3,24,24.2,24.5,24.8]
    var video = d3.select('video.ismo.step5')['_groups'][0][0]

    highlightWordsStaggered(video,highlightTimes)

    //reset auto scroll on clickback
    stepperTriggered = false

    //deactivate following sections on clickback
    d3.select('.scroll').classed('active',false)
        // .attr('display','inline')
      d3.select('.stack').classed('active',false)

      d3.select('footer').style('display','none')

  }

  function step6() {

   stepsClicked = stepsClicked + 1
    //stop the fourth video
   d3.select('video.ismo.step5')['_groups'][0][0].pause()
   d3.select('video.ismo.step5')['_groups'][0][0].currentTime = 0
   //play the fifth video
   d3.select('video.ismo.step6')['_groups'][0][0].play()

   //deselect active text on clickback/clickthrough
    window.setTimeout(function(d){ d3.selectAll('.script-line').classed("active",false) },500)

    d3.select('.script-container').transition()
      .duration(1000)
      .style('opacity',0)

    //scroll back to top of text
    setTimeout(function() {
        var i = -10;
        var int = setInterval(function() {
          document.getElementsByClassName('script-container')[0].scrollTo(0, i);
          i -= 10;
          if (i <= -200) clearInterval(int);
        }, 20);
    }, 1000);

    // d3.select('.script-container').classed('active',false)

    if (stepsClicked === 6) {
     splitSubtitle6()
    }

    highlightSubtitle6()


    d3.select('.subtitle.subtitle6').classed('active',true)
    d3.select('.subtitle.subtitle6')
      .style('opacity',0)
    d3.select('.subtitle.subtitle6').transition()
      .delay(400)
      .duration(150)
      .style('opacity',1)

    window.setTimeout(function(d){


      if(!stepperTriggered){
        d3.transition()
            .delay(0)
            .duration(1200)
            .tween("scroll", scrollTween(window.innerHeight));

        function scrollTween(offset) {
          stepperTriggered = true;
          return function() {
            var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
            return function(t) { scrollTo(0, i(t)); };
          };
        }
      }

      d3.select('.scroll').classed('active',true)
        .attr('display','inline')
      d3.select('.stack').classed('active',true)

      d3.select('footer').style('display','block')

      //deselect active text on clickback/clickthrough
      // d3.selectAll('.script-line').classed("active",false)

      //activate tap back button

      if (chartsBuilt == false) {
        buildIcebergTextList('assets/data/ass_ismo_citations_censored.json','#iceberg0','#overlay0')
        buildIcebergTextChart('assets/data/ass_long_data_censored.json','#iceberg1','#overlay1')
        buildIcebergTextChart('assets/data/fuck_long_data_censored.json','#iceberg2','#overlay2')
        buildIcebergTextChart('assets/data/dog_long_data_censored.json','#iceberg3','#overlay3')
        buildIcebergTextChart('assets/data/shit_long_data_censored.json','#iceberg4','#overlay4')
        chartsBuilt = true
        d3.json('assets/data/ass_long_data_censored.json').then(function(d){
          setupAssLine(d[186].citations,d3.select("#graphic2"))
        })
        .catch(function(error){
           // handle error
        })

      }


      var tapBack = d3.select('svg.tap--back')
        .on('click', function () {
          currentStep = currentStep - 1
          switchStep(currentStep)
        })

      d3.select('svg.tap--back')
        .classed('active',true)

      //pause the fifth video

      // d3.select('video.ismo.step6')['_groups'][0][0].pause()

    },3500)

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
    }

  //highlight words
  function highlightWords(durationModifier) {

    d3.selectAll('.sentence-word').classed('highlighted',false);


     // d3.selectAll('.highlighted').transition()
     //  .duration(250)
     //  .on('start', function (d) {
     //    d3.select(this).classed('highlighted',false)
     //  })

   var videoLength = d3.select('.stepper__video.active>video')['_groups'][0][0]['duration']
   var numberWords = d3.selectAll('.script-line.active >span').size()
   var durationBetween = videoLength / numberWords

   d3.selectAll('.script-line.active >span')
      .transition("highlights")
      .duration(0)
      .delay(0)
      ;

   d3.selectAll('.script-line.active >span')
      .transition("highlights")
      .duration(0)
      .delay(function(d,i){ return i * 1000 * (durationBetween*durationModifier) })
      .attr('scrollTop',0)
      .on("start",function(d){
        d3.select(this).classed("highlighted",true);
      })
  }

  function highlightWordsStaggered(video,highlightTimes) {
    d3.selectAll('.sentence-word').classed('highlighted',false);

    var highlightInterval = setInterval(function () {

      //d3.selectAll('.sentence-word').classed('highlighted',false);

      d3.selectAll('.script-line.active >span').transition()
        .duration(0)
        .on('start',function (d,i) {
          if (video.currentTime > highlightTimes[i]) {
              d3.select(this).classed('highlighted',true)
          }
        })

        if(video.currentTime == video.duration){
          clearInterval( highlightInterval )
        }

        //setTimeout(function( ) { clearInterval( highlightInterval ); }, video.duration * 1000)

    },100)

  }

  // split sentences by word
  function splitSubtitle1() {
    var sentences = document.getElementsByClassName('subtitle subtitle1')
    var x
      for (x of sentences) {
        x.innerHTML = "<span>".concat(x.innerHTML)
        x.innerHTML = x.innerHTML.replace(/ /g,"</span> <span>")
        x.innerHTML = x.innerHTML.slice(0,-7)
        d3.selectAll('.subtitle.subtitle1 >span').classed('sentence-word',true)
      }
    }

  function highlightSubtitle1() {
    var videoLength = d3.select('.stepper__video.active>video')['_groups'][0][0]['duration']
     var numberWords = d3.selectAll('.subtitle.subtitle1 >span').size()
     var durationBetween = videoLength / numberWords

     d3.selectAll('.subtitle.subtitle1 >span')
      .transition().duration(0)
      .style('opacity',0)
        .transition().duration(500)
        .delay(function(d,i){ return i * 1000 * (durationBetween*.69) })
        .style('opacity',1)
  }

  // split sentences by word
  function splitSubtitle6() {
    var sentences = document.getElementsByClassName('subtitle6')
    var x
      for (x of sentences) {
        x.innerHTML = "<span>".concat(x.innerHTML)
        x.innerHTML = x.innerHTML.replace(/ /g,"</span> <span>")
        x.innerHTML = x.innerHTML.slice(0,-7)
        d3.selectAll('.subtitle6 >span').classed('sentence-word',true)
      }
    }

  function highlightSubtitle6() {
    var videoLength = d3.select('.stepper__video.active>video')['_groups'][0][0]['duration']
     var numberWords = d3.selectAll('.subtitle6 >span').size()
     var durationBetween = videoLength / numberWords

     d3.selectAll('.subtitle6 >span')
      .transition().duration(0)
      .style('opacity',0)
        .transition().duration(500)
        .delay(function(d,i){ return i * 1000 * (durationBetween*.69) })
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
        x.innerHTML = x.innerHTML.replace(/ass,/g,' <span id="ass-instance">ass</span>,');
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
        // x.innerHTML = x.innerHTML.replace(/ ass,/g,' <span id="ass-instance">ass</span>,');
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
d3.csv('assets/data/ismo_script_final.csv').then(
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

  var x;
  if (datapoints.length > 1) {
  for (x of datapoints) {
    if (Array.isArray(x.date)) {
      var cleanDate = ''
      cleanDate = x.date[0]
      x.date = cleanDate
    }
  }}

  else {
    if (Array.isArray(datapoints.date)) {
      var cleanDate = ''
      cleanDate = datapoints.date[0]
      datapoints.date = cleanDate
    }
  }

  if (datapoints.length > 1) {
    var citationData = datapoints.filter(function (d) {return (d['#text'] !== undefined && d['#text'] != 'in' && d['#text'] != 'questionaire' && d['#text'] != 'in questionaire' && d['#text'] != '[Internet]') });
  }


  if (typeof citationData !== 'undefined' && citationData.length > 1) {
    //var citationData = datapoints.filter(function (d) {return (d['#text'] !== undefined && d['#text'] != 'in' && d['#text'] != 'questionaire' && d['#text'] != '[Internet]') });

    var viewportWidth = document.getElementById('content').offsetWidth;

    //set up variables
    let margin = { top: 20, right: 26, bottom: 20, left: 26 }
    const height = (window.innerHeight - margin.top - margin.bottom) / 2
    // const width = Math.min(viewportWidth,550) - margin.left - margin.right

    let width;
    if(container.classed("overlay-container")){
      width = 328 - margin.left - margin.right;
    } else {
      if(viewportWidth < 550){
        margin.left = 60;
        margin.right = 60;
        width = viewportWidth - margin.left - margin.right
      }
      else {
        width = 550 - margin.left - margin.right
      }
    }

    var citationContainerWrapper = container.append('div')
      .attr('class','citationContainer')

    var citationContainer = citationContainerWrapper
      .append("div")
      .attr("class","citation-wrapper")

    var svg = container
      .append('svg')
      .attr('class','time-line')
      .attr('width',width+margin.left+margin.right)
      .attr('height',height+margin.bottom+margin.top)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var sliderContainer = container.append('div')
      .attr('class','slider-container')

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
    var citationText = citationData[0]['#text']
    if (citationData[0]['#text'].slice(0,2) == 'in') { citationText = citationData[0]['#text'].slice(2,) };

    var firstCitation = citationContainer.html("<span>"+citationData[0].date + ' ('+citationData[0].aut+', '+citationData[0].tit+')</span> &ldquo;' + citationText+'&rdquo;')

    if(!container.classed("overlay-container")){
      citationContainer.style("min-height",80+"px");
    }

    sliderContainer
      .on("touchmove",function(e){
        d3.event.stopPropagation();
      })
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
        .on("click",function(){
          d3.event.stopPropagation();
        })
        .on("touchmove",function(e){
          d3.event.stopPropagation();
        })

        // .on("touchstart touchmove",function(e){
        //   e.stopPropagation();
        //   e.preventDefault();
        //   d3.event.stopPropagation();
        // })
        .on("input",function(d){
          d3.event.stopPropagation();

          var value = d3.select(this).property("value")

          var dates = citationDates.map(function(d){
            return +d;
          })

          var selected = dates.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);

          citationCircles.classed("active",function(d){
            if(+d.date == selected){
              var text = d["#text"];


              if (d['#text']== 'in') { text = d['#text'].concat(d.tit)};


              citationContainer
                .html("<span>"+selected + ' ('+d.aut+', '+d.tit+')</span> &ldquo;' + text+'&rdquo;')
                //.text('(' + selected + ') ' + text)

              return true;
            }
            return false;
          })

          citationContainerWrapper.classed("overflow-citation",false);
          citationContainerWrapper.classed("overflow-citation-expand",false)

          if(citationContainer.node().offsetHeight > 80){
            citationContainerWrapper.classed("overflow-citation",true);
            citationContainerWrapper.classed("overflow-citation-expand",false);

            citationContainerWrapper.on("click",function(d){
              d3.event.stopPropagation()

              citationContainerWrapper.classed("overflow-citation-expand",true);
            })
          }

        })

    if(citationContainer.node().offsetHeight > 80){
      citationContainerWrapper.classed("overflow-citation",true);
      citationContainerWrapper.on("click",function(d){
        d3.event.stopPropagation()

        citationContainerWrapper.classed("overflow-citation-expand",true);
      })
    }

  }

  else if (typeof citationData !== 'undefined' && citationData.length == 1) {

    var citationData = datapoints;

    var citationContainer = container.append('div')
      .attr('class','citationContainer')
      .append("div")
      .attr("class","citation-wrapper")


    citationContainer
      .html(+"<span>"+citationData[0].date + ' ('+citationData[0].aut+', '+citationData[0].tit+')</span> &ldquo;' + citationData[0]['#text']+'&rdquo;')


      //.text('(' + citationData[0].date + ') ' + citationData[0]['#text'])

  }

  else {

    var citationData = datapoints;

    if (typeof citationData.date !== 'undefined' && typeof citationData['#text'] !== 'undefined') {
    var citationContainer = container.append('div')
      .attr('class','citationContainer')
      .append("div")
      .attr("class","citation-wrapper")
      .html("<span>"+citationData.date + ' ('+citationData.aut+', '+citationData.tit+')</span> &ldquo;' + citationData['#text']+'&rdquo;')

      //.text('(' + citationData.date + ') ' + citationData['#text'])
    }

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


var colorScaleNew = d3.scaleOrdinal()
  .domain(['noun','compound','phrase','adjective','suffix','verb','adverb'])
  .range(['#2e7d21','#bd22ae','#8633FF','#986210','#dc2919','#1e77bd','#676767'])

function buildIcebergTextChart(filename,icebergnumber,overlaynumber) {
      //time to make some charts

      //define the data, run function
    d3.json(filename).then(
    //begin function
    function icebergChart(datapoints) {
      var citationsLengths = datapoints.map(function (d) {return d.number_of_citations})



      //set up scales

      //var colorScaleNew = d3.scaleLinear().domain([0,nested.length-1]).range(["#750082","#bf5d1c"])


      var container = d3.select(icebergnumber)
      var legend = null;

      container.each(function(){
        legend = d3.select(this.parentNode).append("div").attr("class","legend");
      });



      legend
        .append("p")
        .text("Sorted by first citation date. Parts of speech:")

      legend.append("div")
        .attr("class","legend-parts")
        .selectAll("p")
        .data(colorScaleNew.domain())
        .enter()
        .append("p")
        .text(function(d){
          return d
        })
        .style("color",function(d){
          return colorScaleNew(d);
        })
        ;




      var nestedByDecade = d3.nest().key(function(d){
        var dateFirst = null;
        if(Array.isArray(d.first_citation_date)){
          dateFirst = +d.first_citation_date[0];
          // console.log(dateFirst);
        }else{
          dateFirst = +d.first_citation_date;
        }
        return Math.floor(dateFirst/10)*10;
      })
      .sortKeys(function(a,b){
        return a - b;
      })
      .entries(datapoints);

      var nested = d3.nest().key(function(d){

        return d.part_of_speech;
      })
      .entries(datapoints).map(function(d){ return d.key});





      //append span groups to svg
      var decade = container.append("div").attr("class","wrapper").selectAll('div')
        .data(nestedByDecade)
        .enter()
        .append('div')
        .attr("class","decade")

      decade.append("p")
        .attr("class","decade-label")
        .text(function(d){
          return d.key;
        })

      var spans = decade
        .selectAll(".iceberg-text")
        .data(function(d){
          return d.values;
        })
        .enter()
        .append("div")
        // .sort(function(x, y){
        //   return y.number_of_citations - x.number_of_citations
        // })
        .attr('class','iceberg-text')

      spans.append("div")
        .attr("class","default-container")
        .html(function(d) {
          var partOfSpeech = d.part_of_speech;
          if(partOfSpeech == "sfx"){
            partOfSpeech = "suffix";
          }
          var color = colorScaleNew(partOfSpeech);
          return "<p><span style='color:"+color+";'>"+d.word + "</span>»</p> "//"<span>" +d.definition + '</span>'
        })
        .on("click",function(d){
          overlays.classed("overlay-container-active",false);

          d3.select(this.parentNode).select(".overlay-container").classed("overlay-container-active",true);
        })

      container.on("click",function(){
        //overlays.classed("overlay-container-active",false);
      })

      var overlays = spans.append("div")
        .attr("class","overlay-container")
        .each(function(d){

          var word = d.word;
          var definition = d.definition;
          var part = d.part_of_speech;

          d3.select(this).append("p")
            .html(function(){
              return "<p><span>"+word+":</span>"+definition+", "+part+"</p>";
            })

          var data = d.citations
          var container = d3.select(this);
          setupAssLine(data,container)
        })
        .on("click",function(d){
          overlays.classed("overlay-container-active",false);
        })


      //add click to reveal
      // var reveal_counter = 0
      // var reveals = spans.append('span')
      //   .attr('class','reveal-click')
      //   .on('click', function (d) {
      //   })
      //   .text("Reveal Citations");

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

    //end of function
    }).catch(function(error){
         // handle error
      })
      //end of data read/script
    }

//run functions
function init() {
  //Run the stepper
  setupStepper()
  //Build charts moved to last step of stepper


  var videos = d3.selectAll("video");
  var size = videos.size();
  var count = 0;
  videos.each(function(d,i){
    d3.select(this).node().addEventListener('canplaythrough', () => {
        count = count + 1;
        if(count == size){
          ready = true;
          d3.select(".tap--first").text("TAP ANYWHERE TO FIND OUT");
        }
    });


    // fallback 5s loading time
    setTimeout(function(){
      ready = true;
      d3.select(".tap--first").text("TAP ANYWHERE TO FIND OUT");
    }, 5000);

  })

  document.addEventListener('touchmove', function (e) {if(e.target.id != 'rangeSLider'){e.preventDefault(); }}, false);

}



export default { init, resize };
