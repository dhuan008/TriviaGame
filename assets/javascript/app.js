
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
    current: 0,
    counter: 30,

    // Methods
    start: function () {
        $("#start").hide();
        $("#toShow").removeClass("d-none");
        // $("#timer").removeClass("d-none");
        // $("#question").removeClass("d-none");
        // $("#choices").toggleClass("d-none");
        this.ask();
    },

    ask: function () {
        $("#question").html(this.questions[this.current].question);

        var choiceArr = this.questions[this.current].choices;

        for (var i = 0; i < choiceArr.length; i++) {
            var button = $('<button>');
            button.text(choiceArr[i]);
            button.attr('data-id', i);
            button.addClass("btn btn-outline-light");
            $("#choices").append(button);
            $("#choices").append("<br>");
        }
    },
    
    next: function () {
        this.current++;
        // Timer
    },

    timer: function () {
        this.counter--;
    }
};

// Shorthand document ready
$(function () {
    $("#start").on('click', function () {
        trivia.start();
    });

    $("#choices").on("click", "button", function () {
        var userChoice = $(this).data("id");
        console.log(userChoice);
        
    })
});