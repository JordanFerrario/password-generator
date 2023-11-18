// Global variables
var generateBtn = document.querySelector("#generate");
let lowercaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let uppercaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
let specialChars = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~", '"',];
let passwordPool = [];

// Function to shuffle the password pool using Durnstenfeld's version of the Fisher-Yates shuffle algorithm
function shufflePool(array) {
  for (let i = passwordPool.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to handle user prompts and gather password type data
function getPasswordChars() {
let includeLowercase = window.confirm("Do you want to include lowercase characters?")
let includeUppercase = window.confirm("Do you want to include uppercase characters?")
let includeNumbers = window.confirm("Do you want to include numbers?")
let includeSpecialChars = window.confirm("Do you want to include special characters?")
let passwordLength; 

// Continues prompting user until a valid input is achieved
while (true) {
  passwordLength = window.prompt("Password length? Passwords can be between 8 and 128 characters.");
  // Breaks loop if user cancels
  if (passwordLength === null) {
    return;
  }
    // Checks if user entered a number and if that number is between 8 (inclusive) and 128 (inclusive)
    if (!isNaN(passwordLength) && passwordLength >= 8 && passwordLength <= 128) {
      break;
    } else {
      alert("Please enter a number between 8 and 128.");
    }
  }

let charSets = [
  includeLowercase && lowercaseChars,
  includeUppercase && uppercaseChars,
  includeNumbers && numbers,
  includeSpecialChars && specialChars
].filter(Boolean);

passwordPool = charSets.flat();

shufflePool(passwordPool);

passwordPool = passwordPool.slice(0, passwordLength);

console.log(passwordPool);
console.log(passwordPool.length);
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
generateBtn.addEventListener("click", getPasswordChars);

