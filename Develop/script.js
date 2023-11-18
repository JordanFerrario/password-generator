// Global variables.
let generateBtn = document.querySelector("#generate");
let lowercaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let uppercaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let specialChars = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "`", "{", "|", "}", "~", '"',];
let passwordPool = [];

// Writes password to the #password input.
function writePassword() {
  let password = passwordPool.join("");
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}
// Function to shuffle the password pool using Durnstenfeld's version of the Fisher-Yates shuffle algorithm.
function shufflePool(array) {
  for (let i = passwordPool.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to handle user prompts and gather password type data.
function getPasswordChars() {
let includeLowercase = window.confirm("Do you want to include lowercase characters?")
let includeUppercase = window.confirm("Do you want to include uppercase characters?")
let includeNumbers = window.confirm("Do you want to include numbers?")
let includeSpecialChars = window.confirm("Do you want to include special characters?")
let passwordLength; 

// Continues prompting user until a valid input is achieved.
while (true) {
  passwordLength = window.prompt("Password length? Passwords can be between 8 and 92 characters."); // How do I get it to 128 characters????
  // Breaks loop if user cancels
  if (passwordLength === null) {
    return;
  }
    // Checks if user entered a number and if that number is between 8 (inclusive) and 128 (inclusive). If entry is invalid, user is alerted and the loop continues.
    if (!isNaN(passwordLength) && passwordLength >= 8 && passwordLength <= 92) {
      break;
    } else {
      alert("Please enter a number between 8 and 92.");
    }
  }

// Creates an array that only includes the character sets defined by the user.
let charSets = [
  includeLowercase && lowercaseChars,
  includeUppercase && uppercaseChars,
  includeNumbers && numbers,
  includeSpecialChars && specialChars
].filter(Boolean); // Filters out all the false booleans

// Flattens the charSets array.
passwordPool = charSets.flat();

shufflePool(passwordPool);

// Cuts down the array to the desired length. Only grabs from the beginning index to the inputed password length after it has been shuffled.
passwordPool = passwordPool.slice(0, passwordLength);

writePassword();
};

// Add event listener to generate button. Starts the password prompts.
generateBtn.addEventListener("click", getPasswordChars);

