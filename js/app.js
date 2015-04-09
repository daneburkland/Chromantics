;(function($){
  var App = function(name) {
    // index for the current slide.
    this.currentIndex = 0;
    this.wrongAnswersCount = new Array;
    this.questionCount = $("#question-count");
    this.questionCopy = $("#question-copy");
    this.hexLabels = $(".hex");
    this.swatches = $(".box");
    this.correctSwatch = $("#expander");
    this.continueButton = $("#continue");
    var outerThis = this;
    //set the initial swatch order for later reordering
    this.swatches.each(function(el) {
      $(this).data("order", el);
    });


    // question data.
    this.appData = [
      {name:"Gym", imgs:[], question:"You’re opening a gym. Which color will make your members most productive?", quote:"Objects appear longer under red light and shorter under blue. Because the weights seem lighter in blue environments, athletes can consistently lift XX% more in blue rooms than red.", source:"https://www.questia.com/library/psychology/other-types-of-psychology/psychology-of-color", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:0, score:4},
      {name:"Date", imgs:[], question:"You are going on a date and want to look your best. What color should you wear?", quote:"Studies find both men and women find the other sex more attractive when wearing red.", source:"https://www.psychologytoday.com/blog/insight-therapy/201301/red-alert-science-discovers-the-color-sexual-attraction", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:1, score:4},
      {name:"Drug", imgs:[], question:"You’re marketing a new alertness drug. What color should you make the pills?", quote:"Studies find orange-colored placebo stimulants are 47% more effective. Similarly, tranquilizers are more effective when either blue or green.", source:"http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2359128/", swatchFills:[], answerIndex:2, score:4},
      {name:"Toy", imgs:[], question:"You’re designing a toy for toddlers. Which of the following colors should you make it? ", quote:"Children are naturally attracted to bright colors because rods are more developed at birth than cones. That means babies see bright colors more easily.", source:"http://news.bbc.co.uk/2/hi/health/4474725.stm", swatchFills:[], answerIndex:3, score:4},
      {name:"Cardiac rehab", imgs:[], question:"You’re the lead physician at a new cardiac rehab facility. You arrive for your first day of work, and immediately insist the walls be repainted. What color are they?", quote:"Studies show blood pressure and heart rates are consistently XX% higher in red rooms.", source:"", swatchFills:[], answerIndex:2, score:4},
      {name:"Restaurant", imgs:[], question:"You’re the general manager of a hip new restaurant. Your investors say you can design the interior however you want, as long as you don’t paint the walls one particular color. Which color?", quote:"Nature has very few naturally blue foods. As such, humans don’t associate the color with hunger. For greater sales, paint your walls green or other natural earth tones.", source:"http://personal.stevens.edu/~rchen/creativity/impact%20of%20color%20on%20marketing.pdf", swatchFills:[], answerIndex:2, score:4},
      {name:"Hospital walls", imgs:[], question:"Your hospital walls need to be repainted. What color should you choose?", quote:"Research suggests people in green rooms or rooms with lots of plants experience less stress and can tolerate more physical pain than a control group.", source:"http://public.wsu.edu/~lohr/hih/pain/", swatchFills:[], answerIndex:2, score:4},
      {name:"Financial guru", imgs:[], question:"You’re a well respected financial guru, and are about to launch a new 3am money management program on basic color. What color tie should you wear? ", quote:"Purple is historically associated with royalty because of the historical cost and rarity of the plants that produced the dye. In modern times, purple is still associated with luxury and financial success.", source:"", swatchFills:[], answerIndex:2, score:4},
      {name:"date", imgs:[], question:"You’re launching a new social networking platform. What color logo should you use?", quote:"Facebook, Twitter, LinkedIn, X and Y. All have primarily use blue color schemes. Why? Studies show 60% of the world identifies blue as their favorite color. Evolutionary biologists theorize this traces back to our “savannah days”, when blue signaled good weather and clear water. Today, blue is associated with trust, honesty and dependability.", source:"", swatchFills:[], answerIndex:2, score:4},
      {name:"date", imgs:[], question:"", quote:"", source:"", swatchFills:[], answerIndex:2, score:4},
    ]


    // go to next question
    this.nextQuestion = function(){
      var newIndex = this.currentIndex + 1;
      $("#continue").css( {display: "none", top: "150%"} );
      $("#continue").css( {display: "inline-block"} );
      if(newIndex > this.appData.length-1){
        this.showEndScreen();
      }else{
        this.showQuestion(newIndex);
      }
    };
    // reorder and restyle the swatches
    this.resetSwatches = function(index) {
      var correctSwatchIndex = this.appData[index].answerIndex;
      var swatchFillArray = this.appData[index].swatchFills;

      // size down the expanded swatch
      this.correctSwatch.removeClass("box--sizeup");
      // expand the collapsed swatches
      $(".box").each(function(el) {
        $(this).removeClass("box--close");
        $(this).find("path").attr( {d: "M273,273c0,0-55.8,0-123,0c-78.2,0-123,0-123,0s0-37.7,0-123c0-70.064,0-123,0-123s45,0,123,0 c85,0,123,0,123,0s0,38.43,0,123C273,229.646,273,273,273,273z"});
      });
      // position the expanding swatch
      if (correctSwatchIndex == 0) {
        this.correctSwatch.insertBefore(this.swatches[correctSwatchIndex]);
      } else if (correctSwatchIndex == 3) {
        this.correctSwatch.insertAfter(this.swatches[correctSwatchIndex]);
      } else {
        this.correctSwatch.insertBefore(this.swatches[correctSwatchIndex+1]);
        console.log(this.swatches[4]);
      }
      // reorder and restyle the swatches
      this.swatches = $(".box");
      this.swatches.each(function(el) {
        var leftOffset = (el*25).toString();

        $(this).css("left", leftOffset+"%")
        $(this).find("svg").css( {fill: swatchFillArray[el]} );
        $(this).find("span.hex").text( swatchFillArray[el] );
      });
      // set the continue button background color
      $("#continue").css( {"background-color": swatchFillArray[correctSwatchIndex]} );
      // hide the continue button
      $("#continue").css( {top: "150%"});

    }

    // show the question
    this.showQuestion = function(index){      
      
      if(index < 0 || index > this.appData.length-1) return;
      this.currentIndex = index;
      /*this.wrongAnswersCount[this.currentIndex] = 0;*/
      this.resetSwatches(this.currentIndex);
      // show the pagination
      this.questionCount.html( this.currentIndex+1 );
      // show the question
      this.questionCopy.html(this.appData[this.currentIndex].question);

      // clear the feedback
/*      $("#feedback").html("");
      $("#feedback").css("display","none");
      //
      $("#website_name").val("");*/
    };
    // advance to second screen of question
    this.showCorrect = function(){
      $("#continue").css( {top: "25%"} );
    };
    // submit user answer.
    this.submitAnswer = function(guess) {
      $("#continue").css( {display:"inline-block"} );
      var currentSwatchArray = $(".box");
      var guessIndex = currentSwatchArray.index(guess);
      var questionData = this.appData[this.currentIndex];
  
      if(guessIndex === questionData.answerIndex){
        console.log("correct");
        this.showCorrect();
      }else{
        console.log("incorrect");
        questionData.score -= 1;
        console.log(questionData.score);


/*        this.wrongAnswersCount[this.currentIndex]++;
        var msg = "<h2>Wrong answer!</h2> <br/>"+this.appData[this.currentIndex].quote;
        if( this.wrongAnswersCount[this.currentIndex] > 1 ) msg =  "<h2>Wrong answer!</h2> <br/>"+this.getRandomBanter();*/
        /*this.showFeedbackAlert( msg );*/
      }
    };
  };
  
  $(document).ready(function(){

    var colorApp = new App();
    colorApp.showQuestion(0);

    // next button function
    $("#continue").click(function(e){
      colorApp.nextQuestion();
    });
    // submit button
    $(".box").click(function(e){
      colorApp.submitAnswer($(this));
    });
  });
})(jQuery);