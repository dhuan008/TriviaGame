
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
    timeLeft: 30,
    correct: 0,
    wrong: 0,
    timerID: "",
    thisItem: "",

    // Methods
    start: function () {
        trivia.reset();
        $("#start").hide();
        $("#toShow").removeClass("d-none");
        trivia.ask();
    },

    reset: function () {
        trivia.userChoice = "";
        trivia.current = 0;
        trivia.correct = 0;
        trivia.wrong = 0;
    },

    ask: function () {
        console.log("Ask: entered");

        // Updates variable to store current question object
        trivia.thisItem = trivia.questions[trivia.current];
        console.log("thisItem: " + trivia.thisItem);

        // Checks if there are still questions remaining in the array
        if (trivia.questions[trivia.current]) {
            // Displays time remaining
            $("#timer").html("Time remaining: " + trivia.timeLeft + " seconds");

            console.log("Ask: Current Loop: " + trivia.current + "first if entered");

            // Displays the current question
            $("#question").html(trivia.thisItem.question);
            console.log("Ask: Current Question: " + trivia.thisItem.question);

            // Array to hold options to choose from
            var choiceArr = trivia.thisItem.choices;
            //console.log("ask: " + choiceArr);

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
            console.log("TimerID: " + trivia.timerID);
        }
        else {
            console.log("Ask: Else entered");
            var temp = $('<div>');
            temp.text("Unanswered: " + trivia.questions.length - (trivia.correct - trivia.wrong));
            $("#toShow").addClass("d-none");
            $("#start").prepend(temp);

            $("#start .btn").text("Restart");
            $("#start").show();
        }

    },

    next: function () {
        clearInterval(trivia.timerID);
        trivia.clear();
        trivia.current++;
        trivia.timeLeft = 30;
        // Ask the next question in 1 second
        setTimeout(function () {
            trivia.ask();
            console.log("Next: Ask called")
        }, 3000)
    },

    // Keeps track of how much time left on a question
    timer: function () {
        // Decreases time every sec
        trivia.timeLeft--;

        // If timer runs out got to the next question immediately else update time left display
        if (trivia.timeLeft <= 0) {
            setTimeout(function () {
                trivia.next();
            });
        }
        else {
            // Displays time remaining
            $("#timer").html("Time remaining: " + trivia.timeLeft + " seconds");
        }
    },

    evaluate: function () {
        if (trivia.userChoice == trivia.thisItem.answer) {
            trivia.correct++;
            console.log("Evaluate: Correct: " + trivia.correct);
            console.log("Evaluate: Question: " + trivia.thisItem.question);
            console.log("Evaluate: Selected: " + trivia.thisItem.choices[trivia.userChoice]);
            console.log("Evaluate: Answer: " + trivia.thisItem.answer);
        }
        else {
            trivia.wrong++;
            console.log("Evaluate: Wrong: " + trivia.wrong);
            console.log("Evaluate: Question: " + trivia.questions[trivia.current].question);
            console.log("Evaluate: Selected: " + trivia.questions[trivia.current].choices[trivia.userChoice]);
            console.log("Evaluate: Answer: " + trivia.questions[trivia.current].answer);
        }
        trivia.next();
    },

    clear: function () {
        // Clear Game Box
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
        console.log(trivia.userChoice);

        trivia.evaluate();
        
    });
});