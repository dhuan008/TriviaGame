// Global Variables
// Time for each question
var questionTime = 5;

// Trivia Game Object
var trivia = {
    questions: [{
        question: "With DEP(Data Execution Prevention) defense enabled, which of the following becomes impossible?",
        choices: ["Overwriting the return address on the stack", "Injecting shellcode onto the stack and execute it by jumping to it", "Finding a useful gadget to jump to in Return Oriented Programming", "Overwriting a function pointer on the stack"],
        answer: 1
    }, {
        question: "What does the acronyom (BROP) stand for? (In the context of computer security)",
        choices: ["Brilliant Return Oriented Programming", "Bioinfromatics Resource Opertational Program", "Blind Return Oriented Programming", "Bitwise Regional Occupational Program"],
        answer: 2
    }, {
        question: "In a Return Oriented Programming attack, which register now plays the role similar to that of the instruction pointer?",
        choices: ["EBP", "EAX", "ESP", "EDC"],
        answer: 2
    }, {
        question: "Which of the following decribes a denial of service attack?",
        choices: ["It cannot be detected", "It always happens over a network", "It can stop users from accessing a webserver", "It cannot happen over a network"],
        answer: 2
    }, {
        question: "How does a blind ROP attack determine if a code sequence contains the desired gadget?",
        choices: ["It leverages feedback about wherther a server has crashed or not", "It learns the address of the gadget by obtaining a copy of the binary beforehand", "it guesses if the root password is 'password'", "It sends a blind plishing email to the target's users and obtians user access"],
        answer: 0
    }],

    // Variables
    userChoice: "",
    current: 0,
    timeLeft: questionTime,
    correct: 0,
    wrong: 0,
    timerID: "",
    thisItem: "",

    // Methods
    // Prepares the screen and starts the game
    start: function () {
        trivia.reset();
        $("#start").hide();
        $("#toShow").removeClass("d-none");
        trivia.ask();
    },

    // Reinitializes the game variables and removes previous game results
    reset: function () {
        trivia.userChoice = "";
        trivia.current = 0;
        trivia.correct = 0;
        trivia.wrong = 0;
        // Removes previous game results and hides
        $("#results").empty().addClass("d-none");
    },

    ask: function () {
        // Updates variable to store current question object
        // If here to determine which quiz to take
        trivia.thisItem = trivia.questions[trivia.current];

        // Checks if there are still questions remaining in the array
        if (trivia.questions[trivia.current]) {
            // Displays time remaining
            $("#timer").html("Time remaining: " + trivia.timeLeft + " seconds");

            // Displays the current question
            $("#question").html(trivia.thisItem.question);

            // Array to hold options to choose from
            var choiceArr = trivia.thisItem.choices;

            // Creates the options with attributes and displays them
            for (var i = 0; i < choiceArr.length; i++) {
                var button = $('<button>');
                button.text(choiceArr[i]);
                button.attr('data-id', i);
                button.addClass("btn btn-outline-light m-1");
                $("#choices").append(button);
                $("#choices").append("<br>");
            }

            // Counts down every 1 sec by calling timer method
            trivia.timerID = setInterval(trivia.timer, 1000);
        }
        // Else display the results of the quiz
        else {
            // Hide the Game Box
            $("#toShow").addClass("d-none");

            // Div to hold results
            var results = $('<div>');
            
            // Number of unanswered questions
            var unanswered = trivia.questions.length - (trivia.correct + trivia.wrong);

            // Add data to results
            results.addClass("text-center mb-3 py-3 border border-light");
            results.append("Correct: " + trivia.correct);
            results.append("<br>Wrong: " + trivia.wrong);
            results.append("<br>Unanswered: " + unanswered );
            
            // Append results to results div and show
            $("#results").append(results).removeClass("d-none");

            // Change start button text to restart and show it
            $("#start .btn").text("Restart");
            $("#start").show();
        }

    },

    // Increments to the next function
    next: function () {
        // Resets timer
        trivia.resetTimer()

        // Increment current question
        trivia.current++;

        // Ask the next question in 3 seconds
        setTimeout(function () {
            trivia.clear();
            trivia.ask();
        }, 3000)
    },

    // Readies the timer for the next question
    resetTimer: function () {
        // Clears the previous timer
        clearInterval(trivia.timerID);

        // Resets time of the timer
        trivia.timeLeft = questionTime;
    },

    // Keeps track of how much time left on a question
    timer: function () {
        // Decreases time every sec
        trivia.timeLeft--;

        // If timer runs out got to the next question immediately else update time left display
        if (trivia.timeLeft <= 0) {
            setTimeout(function () {
                trivia.clear();
                $("#choices").html("The correct answer was <br><br><b><h4>" + trivia.thisItem.choices[trivia.thisItem.answer] + "</h4></b>");
                trivia.next();
            });
        }
        else {
            // Displays time remaining
            $("#timer").html("Time remaining: " + trivia.timeLeft + " seconds");
        }
    },

    // Determines if the user choice is correct
    evaluate: function () {
        if (trivia.userChoice == trivia.thisItem.answer) {
            // Increment number of correct answers
            trivia.correct++;

            // Clear Game Box
            trivia.clear();

            // Displays correct
            $("#choices").text("Correct!");
        }
        else {
            // Increment number of wrong answers
            trivia.wrong++;

            // Clear Game Box
            trivia.clear();

            // Displays the correct answer
            $("#choices").html("Wrong! The correct answer was <br><br><b><h4>" + trivia.thisItem.choices[trivia.thisItem.answer] + "</h4></b>");
        }
        // Gets the next question
        trivia.next();
    },

    // Empties the Game Box display
    clear: function () {
        $("#timer").empty();
        $("#question").empty();
        $("#choices").empty();
    }
};

// Shorthand document ready
$(function () {
    $("#start").on('click', function () {
        trivia.start();
    });

    $("#choices").on("click", "button", function () {
        trivia.userChoice = $(this).data("id");

        trivia.evaluate();
        
    });
});