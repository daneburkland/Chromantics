;(function($){
  var App = function(name) {
    // index for the current slide.
    this.currentIndex = 0;
    this.wrongAnswersCount = new Array;
    this.questionCount = $("#question-count");
    this.questionCopy = $("#question-copy");
    this.hexLabels = $(".hex");

    // question data.
    this.appData = [
      {name:"Gym", imgs:[], question:"You’re opening a gym. Which color will make your members most productive?", quote:"Objects appear longer under red light and shorter under blue. Because the weights seem lighter in blue environments, athletes can consistently lift XX% more in blue rooms than red.", source:"https://www.questia.com/library/psychology/other-types-of-psychology/psychology-of-color", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:2, wrongAnswer:[]},
      {name:"Date", imgs:[], question:"You are going on a date and want to look your best. What color should you wear?", quote:"Studies find both men and women find the other sex more attractive when wearing red.", source:"https://www.psychologytoday.com/blog/insight-therapy/201301/red-alert-science-discovers-the-color-sexual-attraction", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:2, wrongAnswer:[]},
      {name:"Drug", imgs:[], question:"You’re marketing a new alertness drug. What color should you make the pills?", quote:"Studies find orange-colored placebo stimulants are 47% more effective. Similarly, tranquilizers are more effective when either blue or green.", source:"http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2359128/", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"Toy", imgs:[], question:"You’re designing a toy for toddlers. Which of the following colors should you make it? ", quote:"Children are naturally attracted to bright colors because rods are more developed at birth than cones. That means babies see bright colors more easily.", source:"http://news.bbc.co.uk/2/hi/health/4474725.stm", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"Cardiac rehab", imgs:[], question:"You’re the lead physician at a new cardiac rehab facility. You arrive for your first day of work, and immediately insist the walls be repainted. What color are they?", quote:"Studies show blood pressure and heart rates are consistently XX% higher in red rooms.", source:"", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"Restaurant", imgs:[], question:"You’re the general manager of a hip new restaurant. Your investors say you can design the interior however you want, as long as you don’t paint the walls one particular color. Which color?", quote:"Nature has very few naturally blue foods. As such, humans don’t associate the color with hunger. For greater sales, paint your walls green or other natural earth tones.", source:"http://personal.stevens.edu/~rchen/creativity/impact%20of%20color%20on%20marketing.pdf", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"Hospital walls", imgs:[], question:"Your hospital walls need to be repainted. What color should you choose?", quote:"Research suggests people in green rooms or rooms with lots of plants experience less stress and can tolerate more physical pain than a control group.", source:"http://public.wsu.edu/~lohr/hih/pain/", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"Financial guru", imgs:[], question:"You’re a well respected financial guru, and are about to launch a new 3am money management program on basic color. What color tie should you wear? ", quote:"Purple is historically associated with royalty because of the historical cost and rarity of the plants that produced the dye. In modern times, purple is still associated with luxury and financial success.", source:"", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"date", imgs:[], question:"You’re launching a new social networking platform. What color logo should you use?", quote:"Facebook, Twitter, LinkedIn, X and Y. All have primarily use blue color schemes. Why? Studies show 60% of the world identifies blue as their favorite color. Evolutionary biologists theorize this traces back to our “savannah days”, when blue signaled good weather and clear water. Today, blue is associated with trust, honesty and dependability.", source:"", swatchFills:[], answerIndex:2, wrongAnswer:[]},
      {name:"date", imgs:[], question:"", quote:"", source:"", swatchFills:[], answerIndex:2, wrongAnswer:[]},
    ]

    // go to next question
/*    this.nextQuestion = function(){
      var newIndex = this.currentIndex + 1;
      if(newIndex > this.appData.length-1){
        this.showEndScreen();
      }else{
        this.showQuestion(newIndex);
        this.showGuessForm();
      }
    };*/
    // show the question
    this.showQuestion = function(index){      
      if(index < 0 || index > this.appData.length-1) return;
      this.currentIndex = index;
      this.wrongAnswersCount[this.currentIndex] = 0;
/*      $("#img_container").html( "<img src='./images/"+this.appData[this.currentIndex].imgs[0]+"' />");*/
      // show the pagination
      this.questionCount.html( this.currentIndex+1 );
      // show the question
      this.questionCopy.html(this.appData[this.currentIndex].question);
      // show the hex values
      var outerThis = this;
      this.hexLabels.each(function(el) {
        console.log(this);
        $(this).text(outerThis.appData[outerThis.currentIndex].swatchFills[el]);
      });
      // clear the feedback
/*      $("#feedback").html("");
      $("#feedback").css("display","none");
      //
      $("#website_name").val("");*/
    };
    // advance to second screen of question
/*    this.advanceQuestion = function(){
      $("#img_container").html( "<img src='./images/"+this.appData[this.currentIndex].imgs[1]+"' />");
      this.showNextButton();
    };*/
    // submit user answer.
/*    this.submitAnswer = function(answer) {
      var answer = answer.toLowerCase();
      var correct = false;
      var acceptables = this.appData[this.currentIndex].acceptable;
      var n = acceptables.length;
      for(var i=0; i<n; i++) if(answer == acceptables[i]) correct=true;     
      if(correct){
        this.appData[this.currentIndex].value="Yes";
        this.advanceSlide();
      }else{
        this.wrongAnswersCount[this.currentIndex]++;
        var msg = "<h2>Wrong answer!</h2> <br/>"+this.appData[this.currentIndex].quote;
        if( this.wrongAnswersCount[this.currentIndex] > 1 ) msg =  "<h2>Wrong answer!</h2> <br/>"+this.getRandomBanter();
        this.showFeedbackAlert( msg );
      }
    };*/
    // show the next button, hide the form submission
/*    this.showNextButton = function(){
      if(this.currentIndex == this.appData.length-1){
        $("#next-button").html("Congrats! Click here to see your results now.");
      }
      $("#next-button").css("display","block");
      $("#guess-form").css("display","none");
    };*/



    // reset
/*    this.reset = function(){
      this.currentIndex = -1;
      this.wrongAnswersCount = new Array;
      // return values to no
      var n = this.appData.length;
      for(var i=0; i<n; i++) this.appData[i].value = "No";
      // next slide
      this.nextSlide();
    };*/
  };
  
  $(document).ready(function(){
    var colorApp = new App();
    colorApp.showQuestion(0);
    // submit form function 
    $("#guess-form").submit(function(e){
      e.preventDefault();
      var answer = $("#website_name").val();
      wireframeApp.submitAnswer(answer);
    });
    // next button function
    $("#next-button").click(function(e){
      wireframeApp.nextSlide();
    });
    // next button function
    $("#skip-button").click(function(e){
      wireframeApp.skip();
    });
    // submit button
    $("#go-button").click(function(e){
      $("#guess-form").submit();
    });
  });
})(jQuery);