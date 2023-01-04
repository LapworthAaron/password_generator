// Array of special characters to be included in password
var specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
  ];
  
  // Array of numeric characters to be included in password
  var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  // Array of lowercase characters to be included in password
  var lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  
  // Array of uppercase characters to be included in password
  var upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];

//global variables used for storing information to be used in functions
var userPromptlength = 0;
var userPromptlower = "";
var userPromptupper = "";
var userPromptnumber = "";
var userPromptspecial = "";
var passwordSelection = [];
var passwordArray = [];

//function to reinitialise all global variables so the generate button starts the flow again
function reinitialise() {
    userPromptlength = 0;
    userPromptlower = "";
    userPromptupper = "";
    userPromptnumber = "";
    userPromptspecial = "";
    passwordSelection = [];
    passwordArray = [];
    return;
}

//function to prompt user to set some settings
function promptUser(promptType, promptMessage) {
    while (promptType != "y" && promptType != "n") {
        promptType = prompt(promptMessage);
        promptType = promptType.toLowerCase();
    }
    return promptType;
}

//function to check if a particular setting was used and merge arrays if so
function optionsArray(optionStatus, arrOpt) {
    if (optionStatus === "y") {
        if (passwordSelection.length == 0) {
            passwordSelection = arrOpt;
        } else {
            passwordSelection = [].concat(passwordSelection, arrOpt);
        }
    }
    return passwordSelection;
}

// Function to prompt user for password options
function getPasswordOptions() {
    while (userPromptlength < 10 || userPromptlength > 64) {
        userPromptlength = prompt("How many characters would you like to use (10-64)?");
    }
    var loopCondition = 0;
    while (loopCondition == 0) {
        userPromptlower = promptUser(userPromptlower, "Would you like to use lowercase characters (y or n)?");
        userPromptupper = promptUser(userPromptupper, "Would you like to use uppercase characters (y or n)?");
        userPromptnumber = promptUser(userPromptnumber, "Would you like to use numeric characters (y or n)?");
        userPromptspecial = promptUser(userPromptspecial, "Would you like to use special characters (y or n)?");
        if (userPromptlower === "n" && userPromptupper === "n" 
            && userPromptnumber === "n" && userPromptspecial === "n")
        {
            loopCondition = 0;
            alert("You haven't selected any options, please try again")
        } else {
            loopCondition = 1;
        }
    }
    optionsArray(userPromptlower, lowerCasedCharacters);
    optionsArray(userPromptupper, upperCasedCharacters);
    optionsArray(userPromptnumber, numericCharacters);
    optionsArray(userPromptspecial, specialCharacters);
    return;
}

// Function for getting a random element from an array
function getRandom(arr) {
    return arr[Math.floor(Math.random() * (84 + 1))];
}

// Function to generate password with user input
function generatePassword() {
    reinitialise(); //reinitialise all the global variables to start afresh on each button click
    getPasswordOptions(); //get all options for the password
    //generate the password using random selection from the options array
    for (i = 0; i < userPromptlength; i++) {
        passwordArray[i] = getRandom(passwordSelection);
    }
    return passwordArray.join(""); //convert to string for output to page
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');

    passwordText.value = password;
    return;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);