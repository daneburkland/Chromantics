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
    this.correctCopy = $("#correct-copy");
    this.displayedScore = $("#displayed-score");
    var outerThis = this;

    // question data.
    this.appData = [
      {name:"Drug", imgs:[], question:"You’re developing a new alertness drug. What color should you make the pills?", quote:"Studies find orange-colored placebo stimulants are 47% more effective than other colors. Similarly, tranquilizers are more effective when either blue or green.", answerSourceName: "The Placebo: A Reader", answerSource:"https://books.google.com/books?id=8UMDAAAAQBAJ&pg=PA114&lpg=PA114&dq=buckalew+orange+stimulant&source=bl&ots=x7FKPq5xqM&sig=RpGlw3MP38uuxsk3Pxr5DcvVhI4&hl=en&sa=X&ei=JBYjVbvwJMTjsASQyIDgBw&ved=0CDAQ6AEwAg#v=onepage&q&f=false", swatchFills:["#712F78", "#3DDCF2", "#52FF62", "#F75A00"], answerIndex:3, score:3},
      {name:"Gym", imgs:[], question:"You’re opening a gym. Which color will make your members most productive?", quote:"Objects appear longer under red light and shorter under blue. Because the weights seem lighter in blue environments, athletes can consistently lift more in blue rooms than in red.", answerSourceName: "Questia.com", answerSource:"https://www.questia.com/library/psychology/other-types-of-psychology/psychology-of-color", swatchFills:["#4444CC", "#FF8718", "#EB1821", "#E84197"], answerIndex:0, score:3},
      {name:"Date", imgs:[], question:"You’re going on a date and want to look your best. What color should you wear?", quote:"Studies show both men and women find the other sex more attractive when wearing red.", answerSourceName: "Psychologytoday.com", answerSource:"https://www.psychologytoday.com/blog/insight-therapy/201301/red-alert-science-discovers-the-color-sexual-attraction", swatchFills:[ "#34BEDA", "#B40406", "#66B356", "#FFD90F"], answerIndex:1, score:3},
      {name:"Toy", imgs:[], question:"You’re designing a toy for toddlers. Which of the following colors should you make it?", quote:"Children are naturally attracted to bright colors because they have more rods at birth than cones. That means babies see bright colors more easily.", answerSourceName: "University of Kentucky", answerSource:"http://www2.ca.uky.edu/hes/fcs/factshts/HF-LRA.151.PDF", swatchFills:["#32F50D", "#671073", "#8A0F12", "#2790B0"], answerIndex:0, score:3},
      {name:"Cardiac rehab", imgs:[], question:"You’re the lead physician at a new cardiac rehab facility. You arrive for your first day of work, and immediately insist the walls be repainted. What color were they?", quote:"Studies show heart rates are consistently higher in red rooms.", answerSourceName: "Color: Research and Application", answerSource:"http://onlinelibrary.wiley.com/doi/10.1002/col.21949/abstract", swatchFills:["#04C4BB", "#D41B29", "#F7C6F3", "#E6ED07"], answerIndex:1, score:3},
      {name:"Restaurant", imgs:[], question:"You’re the general manager of a new restaurant. Your investors say you can design the interior however you want, as long as you don’t paint the walls one particular color. Which color?", quote:"Nature has very few naturally blue foods, so humans don’t associate the color with hunger. For greater sales, paint your walls red or other natural earth tones.", answerSourceName: "", answerSource:"http://personal.stevens.edu/~rchen/creativity/impact%20of%20color%20on%20marketing.pdf", swatchFills:["#F6312B", "#8F52A3", "#0000FF", "#B0D41E"], answerIndex:2, score:3},
      {name:"Hospital walls", imgs:[], question:"Your hospital walls need to be repainted. What color should you choose?", quote:"Research suggests people in green rooms or rooms with lots of plants experience less stress and can tolerate more physical pain than a control group.", answerSourceName: "Washington State Univerity", answerSource:"http://public.wsu.edu/~lohr/hih/pain/", swatchFills:["#47A94B", "#69D2E7", "#D7217E", "#EDDE45"], answerIndex:0, score:3},
      {name:"Financial guru", imgs:[], question:"You’re a well respected financial guru about to launch a new money management TV show. What color tie should you wear?", quote:"Purple is historically associated with royalty because of the cost and rarity of obtaining the specific breed of sea snails used to produce the color. In modern times, purple is still associated with luxury and financial success.", answerSourceName: "Wikipedia: Tyrian Purple", answerSource:"http://en.wikipedia.org/wiki/Tyrian_purple", swatchFills:["#0910B9", "#EE2012", "#9061C2", "#F8D518"], answerIndex:0, score:3},
      {name:"Social Networking", imgs:[], question:"You’re launching a new social networking platform. What color logo should you use?", quote:"Studies show 40% of people rate blue as their favorite color. Evolutionary biologists theorize this traces back to our “savannah days”, when blue signaled good weather and clear water. Today, blue is associated with trust, honesty and dependability, and is the color of choice for tech companies like Facebook, Twitter, LinkedIn, Instagram, etc.", answerSourceName: "Color and Design", answerSource:"https://books.google.com/books?id=sdNBAgAAQBAJ&pg=PA188&lpg=PA188&dq=blue+color+favorite+world+percent&source=bl&ots=PgtvUB3bpg&sig=5zBgvz3SqLOsWrcFUpFPQJRqzhk&hl=en&sa=X&ei=w_AlVbaWE4XssAXd5YHABg&ved=0CCwQ6AEwAg#v=onepage&q=blue%20color%20favorite%20world%20percent&f=false", swatchFills:[ "#E73525", "#55ACEE", "#A1C820", "#F38630"], answerIndex:2, score:3},
      {name:"Productivity", imgs:[], question:"You work in the IT department of a large corporation. The brass tell you to improve productivity company-wide. What color should you make every workers’ desktop wallpaper?", quote:"A recent study found that a solid red computer wallpaper improved performance on detail-oriented computer tasks, likely through avoidance motivation because of red’s association with danger and mistakes.", answerSourceName: "Color Psychology and Graphic Design Applications", answerSource:"http://digitalcommons.liberty.edu/cgi/viewcontent.cgi?article=1118&context=honors", swatchFills:["#8F52A2", "#0000FF", "#F6302B", "#AFD31E"], answerIndex:2, score:3},
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

    
    this.nextQuestion = function(){
      var newIndex = this.currentIndex + 1;
      this.continueButton.hide().delay(5).queue(function(next) {
        $(this).show();
        next();
      });
      this.continueButton.removeClass('continue-button-visible');
      if(newIndex > this.appData.length-1){
        this.showEndScreen();
      } else {
        this.showQuestion(newIndex);
      }
    };
    
    this.resetSwatches = function(index) {
      var correctSwatchIndex = this.appData[index].answerIndex;
      var swatchFillArray = this.appData[index].swatchFills;
      // remore the blurred background mask transition
      $("#mask").css({"transition": "none 0s"});
      // reset the background images
      $("#main").css( "background-image", function() {
        return  'url(' + "'" + '../app/img/' + (outerThis.currentIndex+1) + '.jpg' + "')" ;
      });
      $("#blurred-background").css( "background-image", function() {
        return  'url(' + "'" + '../app/img/' + (outerThis.currentIndex+1) + '.jpg' + "')" ;
      });
      // resize hex type
      this.hexLabels.css({"font-size": "3vh"});
      // remove the background image on correct swatch and reset the svg's opacity
      this.correctSwatch.css({"background-image": "none"}).find("svg").css({"opacity": 1});
      $(".box--collapser").show();
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
      // reset the displayed score opacity
      outerThis.displayedScore.css({opacity: 1, "font-size": "15vh"}).hide();

    }

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
      $("#blurred-background").css( "background-image", function() {
        return  'url(' + "'" + '../app/img/' + (outerThis.currentIndex+1) + '_answer.jpg' + "')" ;
      });
      this.hexLabels.css({"font-size": "6vh"});
      this.correctCopy.hide();
      this.correctCopy.css({padding: 0});
      this.correctCopy.addClass("question-copy-above");
      this.questionCopy.hide();
      $(".box--collapser").hide().delay(1).queue(function(next) {
        outerThis.correctCopy.show();
        next();
      }).delay(700).queue(function(next) {
        $("#mask").css({"transition": "all .4s ease-in-out"});
        outerThis.correctCopy.css({padding:   "15px"});
        outerThis.continueButton.addClass('continue-button-visible');
        outerThis.correctSwatch.css( "background-image", function() {
          return  'url(' + "'" + '../app/img/' + (outerThis.currentIndex+1) + '_answer.jpg' + "')" ;
        });
        $(".box--sizeup svg").css({opacity: 0});
        outerThis.randomSuccess.html(outerThis.getRandomSuccess());
        outerThis.randomSuccess.show();
        outerThis.answerMessage.html(questionData.quote);
        outerThis.answerMessage.show();
        outerThis.answerSource.attr("href", questionData.answerSource);
        outerThis.answerSource.show();
        outerThis.correctCopy.removeClass("question-copy-above");
        next();
      });
    };

    // submit user answer.
    this.submitAnswer = function(guess) {
      var currentSwatchArray = $(".box");
      var guessIndex = currentSwatchArray.index(guess);
      var questionData = this.appData[this.currentIndex];
      this.displayedScore.css({color: questionData.swatchFills[questionData.answerIndex]});
      console.log(questionData.swatchFills[questionData.answerIndex]);
      this.displayedScore.html(function() {
        return '+' + questionData.score;
      });
  
      if(guessIndex === questionData.answerIndex){
        this.randomIncorrect.html("");
        if (questionData.score > 0) {
          this.displayedScore.show().delay(50).queue(function(next) {
            outerThis.displayedScore.css({opacity: 0, "font-size": "35vh"});
            next();
          });
        };
        this.randomSuccess.css( {color: questionData.swatchFills[guessIndex]} );
        console.log("correct");
        this.showCorrectScreen();
      } else{
        console.log("incorrect");
        questionData.score -= 1;
        this.displayedScore.html(function() {
          return '+' + questionData.score;
        });
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
      colorApp.showQuestion(0);
      colorApp.hideSplashScreen();
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

  // animate the title "Chromantics" colors
  function animateTitleColor(i) {
      $(".title h1").css("color", function() {
        return 'hsl(' + i + ', 100%, 50%)';
      });
      setTimeout(function() {
          animateTitleColor(++i)
      }, i);
  }
  animateTitleColor(0);
  function animateSubtitleColor(i) {
      $(".title h3").css("color", function() {
        return 'hsl(' + i + ', 100%, 50%)';
      });
      setTimeout(function() {
          animateSubtitleColor(++i)
      }, i);
  }
  animateSubtitleColor(180);

})(jQuery);

window.setInterval(function(){
  $("#mask").height($("#question-container").height());
}, 0.1);

