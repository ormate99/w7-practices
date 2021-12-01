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

const selectElement = (type, name, label, options) => {
    let optionsToSelect='';
    for (const option of options) {
        `optionsToSelect +=
                <option>
                    ${option}
                </option>
            }`;
}

return`
        <div>
        <label>${label} =</label>
        <${type} name='${name}'>
            ${optionsToSelect}
        </${type}>
        </div>
`
}

const formElement = `
    <form id='form'>
        ${inputElement('file', 'profilePicture', 'Profilképed')}
        ${inputElement('text', 'firstName', 'Keresztneved')}
        ${inputElement('email', 'personalEmail', 'Email címed')}
        ${selectElement('select', 'where', 'Hol hallottál rólunk?', ['interneten', 'ismerőstől', 'egyéb'])}
        ${inputElement('checkbox', 'terms', 'Elfogadom a felhasználási feltételeket')}
        ${inputElement('radio', 'newsletter', 'Hírlevelet szeretnél kapni')}
        <button>Beküldés</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault();
    const et = event.target;
    console.log(et);
    et.classList.add('submitted');
    let selectValue = et.querySelector(select[name="where"]).value;
    console.log(selectValue);
}


//feltétel hogy csak akkor updateljen, ha az aktuális input mező amibe írnuk rendelkezik "firstName" name attributeummal (getAttribue segít) 

const inputUpdate = (event) => {
    if (event.target.getAttribute("name") === "firstName") {
        document.getElementById("inputValue").innerHTML = event.target.value;
    }
    console.log(event.target.closest("#form"));
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