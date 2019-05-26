// Global Variables
// Time for each question
var questionTime = 15;

// Trivia Game Object
var trivia = {
    // Html Questions
    htmlQuiz: [{
        question: "Choose the correct tag for the largest heading in HTML",
        choices: ["h6", "head", "h1", "h0"],
        answer: 2
    }, {
        question: "What happens if the doctype is not included in the start of a HTML document?",
        choices: ["Browser finds the document in quirky mode", "Browser stops working", "Browser crashes after showing the page"],
        answer: 0
    }, {
        question: "Which of the following is true of iframes?",
        choices: ["Divides the page into two sections", "Is used to create ajax frame", "Helps include one webpage into another", "A video on a iPhone or iPod"],
        answer: 2
    }, {
        question: "How many heading levels does HTML have?",
        choices: ["7", "6", "5", "1"],
        answer: 1
    }, {
        question: "What does HTML stand for?",
        choices: ["Hyperlinks and Text Markup Language", "Hot Text Made Live", "HyperText Markup Language"],
        answer: 2
    }, {
        question: "All HTML tags come in a pair. True of False?",
        choices: ["True", "False"],
        answer: 1
    }, {
        question: "How do you insert a copyright symbol on a browser page?",
        choices: ["&copy", "&#196", "&copyright"],
        answer: 0
    }, {
        question: "Can a single text link point to two different web pages?",
        choices: ["Yes", "No"],
        answer: 1
    }, {
        question: "Default size for a text field is around _______ characters",
        choices: ["14", "26", "12", "13"],
        answer: 3
    }, {
        question: "Can a HTML tag point to a different section on the same page?",
        choices: ["No", "Yes"],
        answer: 1
    }],

    // Javascript questions
    javascriptQuiz: [{
        question: "In JavaScript, how can you get the total number of arguments passed to a function",
        choices: ["Using the args.length property", "Using the arguments.length property", "Using the arr.length property", "Using the object.length property"],
        answer: 1
    }, {
        question: "The external JavaScript file must contain the script tag. True or false?",
        choices: ["True", "False"],
        answer: 1
    }, {
        question: "How are functions called in Javascript?",
        choices: ["call myFunc();", "call function myFunc();", "myFunc();", "function myFunc();"],
        answer: 2
    }, {
        question: "In JavaScript, what is the method used to remove whitespace from the beginning and end of any string?",
        choices: ["strip()", "trim()", "cut()", "concat()"],
        answer: 1
    }, {
        question: "JavaScript is an __________ language.",
        choices: ["european", "ISP", "compiled", "interpreted"],
        answer: 3
    }, {
        question: "If p is not defined, what would be the result of console.log(p)?",
        choices: ["Zero", "Null", "Reference Error", "Undefined"],
        answer: 2
    }, {
        question: "Which of the following is not a valid Javascript variable name?",
        choices: ["_javaScript", "javaScript", "2java", "None of the above"],
        answer: 2
    }, {
        question: "What is the alternative name for JavaScript?",
        choices: ["LimeScript", "ECMAScript", "TypeScript", "CoffeeScript"],
        answer: 1
    }, {
        question: "Which of the following correctly appends a value to the end of the JavaScript array",
        choices: ["arr[arr.length]=value", "arr[arr.length+1]=value", "arr[arr.length-1]=value", "arr[arr.length] = new Array()"],
        answer: 0
    }, {
        question: "What is the return value of a function without a return statement?",
        choices: ["void", "It will throw a error", "-1", "Undefined"],
        answer: 3
    }],

    // Into to Computer Security Questions
    securityQuiz: [{
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
        choices: ["It leverages feedback about whether a server has crashed or not", "It learns the address of the gadget by obtaining a copy of the binary beforehand", "it guesses if the root password is 'password'", "It sends a blind plishing email to the target's users and obtians user access"],
        answer: 0
    }],

    // Variables
    userChoice: "",
    quizType: "",
    current: 0,
    timeLeft: questionTime,
    correct: 0,
    wrong: 0,
    timerID: "",
    thisItem: "",
    quizLength: 0,
    quizTitle: "Trivia Game",

    // Methods
    // Determines which quiz to take and updates question
    updateQuiz: function () {

        if (trivia.quizType == "security") {
            // Updates current quiz question object
            trivia.thisItem = trivia.securityQuiz[trivia.current];

            // Only update quiz length once
            if (trivia.current == 0) {
                // Stores the quiz length
                trivia.quizLength = trivia.securityQuiz.length;
            }
        }
        else if (trivia.quizType == "html") {
            // Updates current quiz question object
            trivia.thisItem = trivia.htmlQuiz[trivia.current];

            // Only update quiz length once
            if (trivia.current == 0) {
                // Stores the quiz length
                trivia.quizLength = trivia.htmlQuiz.length;
            }
        }
        else {
            // Updates current quiz question object
            trivia.thisItem = trivia.javascriptQuiz[trivia.current];

            // Only update quiz length once
            if (trivia.current == 0) {
                // Stores the quiz length
                trivia.quizLength = trivia.javascriptQuiz.length;
                // If no quiz selected default JavaScript
                $("#quizTitle").text("JavaScript Quiz");
            }
        }
    },

    // Prepares the screen and starts the game
    start: function () {
        trivia.reset();
        $("#start").hide();
        $("#menu").hide();
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

    // Displays question to ask
    ask: function () {
        // Update the question 
        trivia.updateQuiz();

        // Checks if there are still questions remaining in the array
        if (trivia.thisItem) {
            // Displays time remaining
            $("#timer").html("Time remaining: " + trivia.timeLeft + " seconds");

            // Displays the current question
            $("#question").html("<h5>" + trivia.thisItem.question + "</h5>").addClass("text-center");

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
            // Clear previous timer
            clearInterval(trivia.timerID);
            trivia.displayResults();
        }
    },

    // Display Results
    displayResults: function () {
        // Hide the Game Box
        $("#toShow").addClass("d-none");

        // Div to hold results
        var results = $('<div>');

        // Number of unanswered questions
        var unanswered = trivia.quizLength - (trivia.correct + trivia.wrong);

        // Add data to results
        results.addClass("text-center mb-3 py-3 border border-light");
        results.append("Correct: " + trivia.correct);
        results.append("<br>Wrong: " + trivia.wrong);
        results.append("<br>Unanswered: " + unanswered);

        // Append results to results div and show
        $("#results").append(results).removeClass("d-none");

        // Change start button text to restart and show it
        $("#start .btn").text("Restart");
        $("#start").show();

        // Show quiz selector
        $("#menu").show();
    },

    // Increments to the next function
    next: function () {
        // Resets timer
        trivia.resetTimer()

        // Increment current question
        trivia.current++;

        // Ask the next question in 2 seconds
        setTimeout(function () {
            trivia.clear();
            trivia.ask();
        }, 2000)
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
            if (trivia.timeLeft <= 5) {
                $("#timer").html("Time remaining: <span>" + trivia.timeLeft + "</span> seconds");
            }
            else {
                // Displays time remaining
                $("#timer").html("Time remaining: " + trivia.timeLeft + " seconds");
            }
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
            $("#choices").text("Correct!").addClass("h3 text-success");
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

    setQuizTitle: function () {
        if (trivia.quizType == "security") {
            $("#quizTitle").text("CyberSecurity Quiz");
        }
        else if (trivia.quizType == "javascript") {
            $("#quizTitle").text("JavaScript Quiz");
        }
        else if (trivia.quizType == "html") {
            $("#quizTitle").text("HTML Quiz");
        }

    },

    // Empties the Game Box display
    clear: function () {
        $("#timer").empty();
        $("#question").empty();
        $("#choices").empty().removeClass("h3 text-success");
    }
};


// Shorthand document ready
$(function () {

    // Start quiz when clicked
    $("#start button").on('click', function () {
        trivia.start();
    });

    // Select which quiz to take
    $("#menu").on("click", "button", function () {
        trivia.quizType = $(this).data("type");
        trivia.setQuizTitle();
    });

    // Get user choice and evaluate it
    $("#choices").on("click", "button", function () {
        trivia.userChoice = $(this).data("id");
        trivia.evaluate();
    });
});