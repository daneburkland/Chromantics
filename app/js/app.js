;(function($){
  var App = function(name) {
    // index for the current slide.
    this.currentIndex = 0;
    this.wrongAnswersCount = new Array;
    this.questionCount = $("#question-count");
    this.questionCopy = $("#question-copy");
    this.randomSuccess = $("#success-message");
    this.hexLabels = $(".hex");
    this.swatches = $(".box");
    this.correctSwatch = $("#expander");
    this.continueButton = $("#continue");
    this.questionContainers = $(".question-container");
    this.answerMessage = $("#answer-message");
    this.answerSource = $("#source");
    this.randomIncorrect = $("#wrong");
    this.questionNames = $(".question-name");
    this.questionScores = $(".question-score");
    this.swatchPaths = $(".swatch-path");
    this.startButton = $("#start-button");
    var outerThis = this;

    // question data.
    this.appData = [
      {name:"Gym", imgs:[], question:"You’re opening a gym. Which color will make your members most productive?", quote:"Objects appear longer under red light and shorter under blue. Because the weights seem lighter in blue environments, athletes can consistently lift XX% more in blue rooms than red.", answerSource:"https://www.questia.com/library/psychology/other-types-of-psychology/psychology-of-color", swatchFills:["#F6302B", "#8F52A2", "#AFD31E", "#0000FF"], answerIndex:3, score:4},
      {name:"Date", imgs:[], question:"You are going on a date and want to look your best. What color should you wear?", quote:"Studies find both men and women find the other sex more attractive when wearing red.", answerSource:"https://www.psychologytoday.com/blog/insight-therapy/201301/red-alert-science-discovers-the-color-sexual-attraction", swatchFills:["#F6302B", "#8F52A2", "#AFD31E", "#0000FF"], answerIndex:0, score:4},
      {name:"Drug", imgs:[], question:"You’re marketing a new alertness drug. What color should you make the pills?", quote:"Studies find orange-colored placebo stimulants are 47% more effective. Similarly, tranquilizers are more effective when either blue or green.", answerSource:"http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2359128/", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:1, score:4},
      {name:"Toy", imgs:[], question:"You’re designing a toy for toddlers. Which of the following colors should you make it? ", quote:"Children are naturally attracted to bright colors because rods are more developed at birth than cones. That means babies see bright colors more easily.", answerSource:"http://news.bbc.co.uk/2/hi/health/4474725.stm", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:1, score:4},
      {name:"Cardiac rehab", imgs:[], question:"You’re the lead physician at a new cardiac rehab facility. You arrive for your first day of work, and immediately insist the walls be repainted. What color are they?", quote:"Studies show blood pressure and heart rates are consistently XX% higher in red rooms.", answerSource:"", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:0, score:4},
      {name:"Restaurant", imgs:[], question:"You’re the general manager of a hip new restaurant. Your investors say you can design the interior however you want, as long as you don’t paint the walls one particular color. Which color?", quote:"Nature has very few naturally blue foods. As such, humans don’t associate the color with hunger. For greater sales, paint your walls green or other natural earth tones.", answerSource:"http://personal.stevens.edu/~rchen/creativity/impact%20of%20color%20on%20marketing.pdf", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:3, score:4},
      {name:"Hospital walls", imgs:[], question:"Your hospital walls need to be repainted. What color should you choose?", quote:"Research suggests people in green rooms or rooms with lots of plants experience less stress and can tolerate more physical pain than a control group.", answerSource:"http://public.wsu.edu/~lohr/hih/pain/", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:3, score:4},
      {name:"Financial guru", imgs:[], question:"You’re a well respected financial guru, and are about to launch a new 3am money management program on basic color. What color tie should you wear? ", quote:"Purple is historically associated with royalty because of the historical cost and rarity of the plants that produced the dye. In modern times, purple is still associated with luxury and financial success.", answerSource:"", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:0, score:4},
      {name:"Social Networking", imgs:[], question:"You’re launching a new social networking platform. What color logo should you use?", quote:"Facebook, Twitter, LinkedIn. All use blue color schemes. Why? Studies show 60% of the world identifies blue as their favorite color. Evolutionary biologists theorize this traces back to our “savannah days”, when blue signaled good weather and clear water. Today, blue is associated with trust, honesty and dependability.", answerSource:"", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:2, score:4},
      {name:"Social Networking", imgs:[], question:"You’re launching a new social networking platform. What color logo should you use?", quote:"Facebook, Twitter, LinkedIn, X and Y. All have primarily use blue color schemes. Why? Studies show 60% of the world identifies blue as their favorite color. Evolutionary biologists theorize this traces back to our “savannah days”, when blue signaled good weather and clear water. Today, blue is associated with trust, honesty and dependability.", answerSource:"", swatchFills:["#F6302B", "#8F52A2", "#0000FF", "#AFD31E"], answerIndex:2, score:4},
    ]


    // show splash screen
    this.showSplashScreen = function() {
      this.questionContainers.each(function() {
        $(this).hide();
      });
      $(".question-counter").hide();
      this.swatchPaths.each(function(el) {
        $(this).css( {stroke: outerThis.appData[0].swatchFills[el]} );
      })
    };

    this.hideSplashScreen = function() {
      this.startButton.hide();
      this.swatches.each(function() {
        $(this).removeClass("box-splash");
      }).delay(500).queue(function(next) {
        $(".main").removeClass("main-splash");
        $(".question-container").each(function() {
          $(this).show();
        });
        $(".question-counter").show();
        // hide the path strokes
        $(".swatch-path").each(function(el) {
          $(this).css( {"stroke-width": 0} );
        });
        // hide the start button
        next();
      })
    }

    // random success messages for correct answers
    this.getRandomSuccess = function(){
      var s = [
        "Nice!", "Corrrrect!", "Yup!", "That's what we were thinking!", "Nailed it!", "Mmmhmmm!"
      ];
      return s[ Math.round(Math.random()*(s.length-1)) ];
    };
    // random incorrect note
    this.getRandomIncorrect = function(){
      var i = [
        "Oof!", "Try Again", "Give it another shot!", "This color? For that?!"
      ];
      return i[ Math.round(Math.random()*(i.length-1)) ];
    };

    // show end screen
    this.showEndScreen = function() {
      // hide the unneccessary elements
      this.questionContainers.hide();
      $(".swatches").hide();
      $(".question-counter h2").hide();
      // show the end screen elements
      $(".end-screen").each(function() {
        $(this).show();
      })
      // Change 'Question' to 'Scorecard'
      $(".question-counter h3").html('Scorecard');
      // create question data variable
      var questionData = outerThis.appData;
      // set the background to white
      $(".main").css( {"background": "#fff"});
      this.questionNames.each(function(el) {
        $(this).html(el+1 + ".<span> " + questionData[el].name + "</span>");
      })
      // create total score variable
      var totalScore = 0;
      this.questionScores.each(function(el) {
        // calculate total score
        totalScore += questionData[el].score;
        $(this).html(questionData[el].score);
        $(this).css( {background: questionData[el].swatchFills[questionData[el].answerIndex]} );
      })
      // show the total score
      $("#score").html(totalScore);
    }

    // go to next question
    this.nextQuestion = function(){
      var newIndex = this.currentIndex + 1;
      this.continueButton.hide().delay(5).queue(function(next) {
        $(this).show();
        next();
      });
      this.continueButton.removeClass('continue-button-visible');
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
      // hide the answer messages
      this.questionCopy.show();
      this.randomSuccess.hide();
      this.answerMessage.hide();
      this.answerSource.hide();
      // resize the question containers
      this.questionContainers.each(function(el) {
        $(this).removeClass('expanded-message');
      })
      // size down the expanded swatch
      this.correctSwatch.removeClass("box--sizeup");
      // expand the collapsed swatches
      $(".box").each(function(el) {
        $(this).removeClass("box--close");
        $(this).find("path").attr( {d: "M273,273c0,0-55.8,0-123,0c-78.2,0-123,0-123,0s0-37.7,0-123c0-70.064,0-123,0-123s45,0,123,0 c85,0,123,0,123,0s0,38.43,0,123C273,229.646,273,273,273,273z"});
      });
      // position the expanding swatch
      if (correctSwatchIndex == 3) {
        this.correctSwatch.insertAfter(this.swatches[correctSwatchIndex]);
        console.log('placing 3');
      } else if (correctSwatchIndex == 0){
        this.correctSwatch.insertBefore(this.swatches[correctSwatchIndex]);
        console.log('placing 2');
      } else {
        this.correctSwatch.insertBefore(this.swatches[correctSwatchIndex + 1]);
        console.log('placing 0');
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
    }

    // show the question
    this.showQuestion = function(index){      
      if(index < 0 || index > this.appData.length-1) return;
      this.currentIndex = index;
      this.resetSwatches(this.currentIndex);
      // show the pagination
      this.questionCount.html( this.currentIndex+1 );
      // show the question
      this.questionCopy.html(this.appData[this.currentIndex].question);
      this.questionCopy.show();
    };

    // advance to second screen of question
    this.showCorrectScreen = function(){
      var questionData = this.appData[this.currentIndex];
      this.continueButton.addClass('continue-button-visible');
      this.questionContainers.each(function(el) {
        $(this).addClass('expanded-message');
      })
      $("#blurred-background").css( "background-image", function() {
        return  'url(' + "'" + '../app/img/' + (outerThis.currentIndex+1) + '_answer.jpg' + "')" ;
      });
      console.log('url(' + "'" + '../img/' + (this.currentIndex+1) + '_answer.jpg' + "')");
      this.questionCopy.hide();
      this.randomSuccess.html(this.getRandomSuccess());
      this.randomSuccess.show();
      this.answerMessage.html(questionData.quote);
      this.answerMessage.show();
      this.answerSource.attr("href", questionData.answerSource);
      this.answerSource.show();

    };

    // submit user answer.
    this.submitAnswer = function(guess) {
      var currentSwatchArray = $(".box");
      var guessIndex = currentSwatchArray.index(guess);
      var questionData = this.appData[this.currentIndex];
      console.log(guessIndex);
      console.log(questionData.answerIndex);
  
      if(guessIndex === questionData.answerIndex){
        this.randomIncorrect.html("");
        this.randomSuccess.css( {color: questionData.swatchFills[guessIndex]} );
        console.log("correct");
        this.showCorrectScreen();
      } else{
        console.log("incorrect");
        questionData.score -= 1;
        this.randomIncorrect.css( {color: questionData.swatchFills[guessIndex]} );
        this.randomIncorrect.html(this.getRandomIncorrect());
      }
    };
  };
  
  $(document).ready(function(){
    var colorApp = new App();
    colorApp.showSplashScreen();
    // begin game
    $("#start-button").click(function(){
      colorApp.hideSplashScreen();
      colorApp.showQuestion(0);
    });
    // next button function
    $("#continue").click(function(e){
      colorApp.nextQuestion();
    });
    // submit button function
    $(".box").click(function(e){
      colorApp.submitAnswer($(this));
    });
  });

})(jQuery);