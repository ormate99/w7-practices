/*
function functionNem(){

    parameter ==="Argument as a string"
};

functionName("Argument as a string");

const argument = "Argument saved in a variable"
const functionName = function (parameter){

        parameter === "Argument saved is a variable";
}
functioname(argument);

const functionName = (parameter1, parameter2) => {

    parameter1 === 1;
    parameter2 === 2;
};
functioname(1,2);

*/


const inputElement = (type, name, title) => {

    return `
        <div>
            <label>${title}</label>
            <input type='${type}' name='${name}'>
        </div>
    `;
}


const formElement = `
    <form id='form'>
        ${inputElement('text', 'firstName', 'Keresztneved')}
        ${inputElement('file', 'profilePicture', 'Profilképed')}
        ${inputElement('email', 'personalEmail', 'Email címed')}
        ${inputElement('radio', 'newsletter', 'Hírlevelet szeretnél kapni')}
        ${inputElement('checkbox', 'terms', 'Elfogadom a felhasználási feltételeket')}
        <button>ok</button>
    </form>
`;

const formsubmit = (event) =>{
    event.preventDefault();
    console.log(event.target);
    event.target.classList.add('submitted');
}

//feltétel hogy csak akkor updateljen, ha az aktuális input mező amibe írnuk rendelkezik "firstName" name attributeummal (getAttribue segít) 

const inputUpdate = (event) => {
   document.getElementById('inputValue').innerHTML = event.target.value;
}

function loadEvent() {
   const root = document.getElementById('root')
   root.insertAdjacentHTML('afterbegin', formElement)
   root.insertAdjacentHTML('afterbegin', `
        <div id='inputValue'></div>
   `);

   const form = document.getElementById('form')
   form.addEventListener('submit', formsubmit)

   const inputList = form.querySelectorAll('input');

   for (const input of inputList) {
       input.addEventListener('input', inputUpdate)       
   }
}

window.addEventListener("load", loadEvent);