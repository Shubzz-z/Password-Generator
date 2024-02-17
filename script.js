// Working on Slider
let slider=document.querySelector("[data-pass_slider]")
let slider_length=document.querySelector("[data-pass_length]")

var Password=""
let symbolString= "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~";
var pass_len=slider.value;
changePassLength()

function changePassLength(){
    slider_length.textContent=pass_len;
    slider.value=pass_len;
}

slider.addEventListener("input",()=>{
    if(slider.value>=checkCount){
        pass_len=slider.value;
        changePassLength();
    }else{
        slider.value=pass_len;
    }
});

// working on Check boxes
var checkCount=1;
let checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach(element => {
    element.addEventListener('change',()=>{
        checkCount=0;
        checkboxes.forEach(element => {
            if(element.checked)
            checkCount++;
    });
    if (pass_len<checkCount) {
        pass_len=checkCount;
        changePassLength();
    }
})
});

// copy password
let copy=document.querySelector("[data-copy]");
let span=document.querySelector("[data-showCopy]");
copy.addEventListener('click',()=>{
    if (Password=="") {
        return;
    }
    navigator.clipboard.writeText(Password).then(()=>{
        span.classList.remove("hidden");
        setTimeout(()=>{
            span.classList.add("hidden");
        },2000)
    }).catch((e)=>{
        console.log(e);
    })
})

// Getting Random numbar, Uppercase Letter, LowerCase Letter, Symbols
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)+min);
}
function getRandomNumber() {
    return randomNumber(0,9);
}
function getRandomUpperCaseLetter() {
    return String.fromCharCode(randomNumber(65,90));
}
function getRandomLowerCaseLetter() {
    return String.fromCharCode(randomNumber(97,122));
}
function getRandomSymbol() {
    let symbols=symbolString.split("");
    return symbols[randomNumber(0,symbolString.length-1)];
}

// Shuffle Password
function shufflePassword(Password) {
    var charArray = Password.split('');
    
    // Shuffle the array
    for (var i = charArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = charArray[i];
        charArray[i] = charArray[j];
        charArray[j] = temp;
    }
    
    // Join the array back into a string
    var ShuffledPassword = charArray.join('');
    
    return ShuffledPassword;
}
// Indictor
let strengthIndicator=document.querySelector("[data-indictor]");
function setIndicator(color,text){
    strengthIndicator.classList.remove(...Array.from(strengthIndicator.classList).filter(cls => cls.startsWith('bg-')));
    strengthIndicator.classList.remove(...Array.from(strengthIndicator.classList).filter(cls => cls.startsWith('text-')));
    strengthIndicator.classList.add(color,text);
    strengthIndicator.classList.remove("border-2");
    strengthIndicator.setAttribute("style","box-shadow: 0 0 10px 10px currentColor;");
}

// Strength Calculator
function getPasswordStrength(password) {
    // Define criteria for password strength
    var minLength = 8;
    var minUppercase = 1;
    var minLowercase = 1;
    var minNumbers = 1;
    var minSpecialChars = 1;

    // Check the length of the password
    var lengthValid = password.length >= minLength;
    // Check for uppercase letters
    var uppercaseValid = password.match(/[A-Z]/g) !== null && password.match(/[A-Z]/g).length >= minUppercase;
    // Check for lowercase letters
    var lowercaseValid = password.match(/[a-z]/g) !== null && password.match(/[a-z]/g).length >= minLowercase;
    // Check for numbers
    var numbersValid = password.match(/[0-9]/g) !== null && password.match(/[0-9]/g).length >= minNumbers;
    // Check for special characters
    var specialCharsValid = password.match(/[^A-Za-z0-9]/g) !== null && password.match(/[^A-Za-z0-9]/g).length >= minSpecialChars;

    // Calculate overall strength
    var strength = 0;
    if (lengthValid) strength++;
    if (uppercaseValid) strength++;
    if (lowercaseValid) strength++;
    if (numbersValid) strength++;
    if (specialCharsValid) strength++;

    // Determine color based on strength
    if (strength <= 1) {
        setIndicator('bg-red-700','text-red-700');
    } else if (strength < 3) {
        setIndicator('bg-orange-500','text-orange-500');
    } else if (strength < 5) {
        setIndicator('bg-yellow-500','text-yellow-500');
    } else {
        setIndicator('bg-green-500','text-green-500');
    }
}

// main Generate password Function
let showPass = document.querySelector("input[name=Password]");
function generatePassword(){
    
    if(checkCount<=0){
        return;
    }

    if (pass_len<checkCount) {
        pass_len=checkCount;
        changePassLength();
    }
    
    Password="";
    let funarr=[];
    
    if (checkboxes[0].checked)funarr.push(getRandomUpperCaseLetter);
    if (checkboxes[1].checked)funarr.push(getRandomLowerCaseLetter);
    if (checkboxes[2].checked)funarr.push(getRandomNumber);
    if (checkboxes[3].checked)funarr.push(getRandomSymbol);
    
    for (let i = 0; i < funarr.length; i++) {
        Password+=funarr[i]();
    }
    
    for (let i = 0; i < pass_len-funarr.length; i++) {
        let ind=randomNumber(0,funarr.length-1);
        Password += funarr[ind]();
    }

    Password=shufflePassword(Password)
    showPass.value=Password;
    getPasswordStrength(Password);

}

let generatePasswordButton=document.querySelector("[data-generate-password]");
generatePasswordButton.addEventListener('click',()=>{generatePassword()})