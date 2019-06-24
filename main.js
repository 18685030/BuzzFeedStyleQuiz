var Quiz = function() {
  var self = this;
  this.init = function() {
    self._bindEvents();
  }

  this.correctAnswers = [{
    question: 1,
    answer: 'Y'
  }, {
    question: 2,
    answer: 'Y'
  }, {
    question: 3,
    answer: 'Y'
  }, {
    question: 4,
    answer: 'Y'
  }, {
    question: 5,
    answer: 'Y'
  }, {
    question: 6,
    answer: 'Y'
  }, {
    question: 7,
    answer: 'Y'
  }, {
    question: 8,
    answer: 'Y'
  }, {
    question: 9,
    answer: 'Y'
  },]

  this._pickAnswer = function($answer, $answers) {
    $answers.find('.quiz-answer').removeClass('active');
    $answer.addClass('active');
  }
  this._calcResult = function() {
    var numberOfCorrectAnswers = 0;
    $('ul[data-quiz-question]').each(function(i) {
      var $this = $(this),
        chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer'),
        correctAnswer;

      for (var j = 0; j < self.correctAnswers.length; j++) {
        var a = self.correctAnswers[j];
        if (a.question == $this.data('quiz-question')) {
          correctAnswer = a.answer;
        }
      }

      if (chosenAnswer == correctAnswer) {
        numberOfCorrectAnswers++;

        // highlight this as correct answer
        $this.find('.quiz-answer.active').addClass('correct');
      } else {
        $this.find('.quiz-answer[data-quiz-answer="' + correctAnswer + '"]').addClass('correct');
        $this.find('.quiz-answer.active').addClass('incorrect');
      }
    });
    if (numberOfCorrectAnswers == 0) {
      return {
        code: 'bad',
        text: 'you got 0 answers correct.'
      };
    } else if (numberOfCorrectAnswers == 1) {
      return {
        code: 'bad',
        text: 'You got 2 answers correct!'
      };
      } else if (numberOfCorrectAnswers == 2) {
      return {
        code: 'bad',
        text: 'You got 2 answers correct!'
      };
    } else if (numberOfCorrectAnswers == 3) {
      return {
        code: 'bad',
        text: 'You got 3 answers correct'
      };
      } else if (numberOfCorrectAnswers == 4) {
      return {
        code: 'mid',
        text: 'You got 4 answers correct'
      };
    } else if (numberOfCorrectAnswers == 5) {
      return {
        code: 'mid',
        text: 'You got 5 answers correct'
      };
      } else if (numberOfCorrectAnswers == 6) {
      return {
        code: 'mid',
        text: 'You got 6 answers correct'
      };
      } else if (numberOfCorrectAnswers == 7) {
      return {
        code: 'good',
        text: 'You got 7 answers correct'
      };
      } else if (numberOfCorrectAnswers == 8) {
      return {
        code: 'good',
        text: 'You got 8 answers correct'
      };
      } else if (numberOfCorrectAnswers == 9) {
      return {
        code: 'good',
        text: 'You got all answers correct'
    };
    }
  }
  // Checks if all the 9 answers have been completed
  this._isComplete = function() {
    var answersComplete = 0;
    $('ul[data-quiz-question]').each(function() {
      if ($(this).find('.quiz-answer.active').length) {
        answersComplete++;
      }
    });
    if (answersComplete >= 9) {
      return true;
    } else {
      return false;
    }
  }
  // Shows the answer
  this._showResult = function(result) {
    $('.quiz-result').addClass(result.code).html(result.text);
  }

  this._bindEvents = function() {
    $('.quiz-answer').on('click', function() {
      var $this = $(this),
        $answers = $this.closest('ul[data-quiz-question]');
      self._pickAnswer($this, $answers);
      if (self._isComplete()) {


        // scroll to answer section
        $('html, body').animate({
          scrollTop: $('.quiz-result').offset().top
        });

        self._showResult(self._calcResult());
        $('.quiz-answer').off('click');

      }
    });
  }
}
var quiz = new Quiz();
quiz.init();