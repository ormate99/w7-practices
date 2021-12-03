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


const inputElement = (type, name, title, req = '') => {
    return `
        <div class='${type}'>
            <label for='${name}'>${title}</label>
            <input type='${type}' name='${name}' ${req}>
        </div>
    `;
}
const selectElement = (type, name, title, options) => {
    let optionsToSelect = '';
    for (const o of options) {
        optionsToSelect += `
            <option>
                ${o}
            </option>
        `;
    }
    // console.log(optionsToSelect)

    return `
        <div>
          <label for='${name}'>${title}</label>
          <${type} name='${name}'>
            ${optionsToSelect}
            </${type}>
        </div>
    `;
}
const formFields = [
    {
        type: 'text',
        name: 'firstName',
        label: 'Keresztneved'
    },
    {
        type: 'email',
        name: 'personalEmail',
        label: 'Email cimed',
        req: 'required'
    },
    {
        type: 'file',
        name: 'profilePicture',
        label: 'Profilkeped'
    },
    {
        type: 'checkbox',
        name: 'newsLetter',
        label: 'Hírlevelet szeretnél kapni'
    },
    {
        type: 'checkbox',
        name: 'terms',
        label: 'Elfogadom a felhasználási feltételeket'
    }
]

const anotherFormFields = [
    {
        type: 'text',
        name: 'street',
        label: 'kozterulet'
    },
    {
        type: 'number',
        name: 'houseNumber',
        label: 'hazszam'
    },
    {
        type: 'number',
        name: 'zipcode',
        label: 'Iranyitoszam'
    },
    {
        type: 'text',
        name: 'city',
        label: 'Telepules neve'
    }
];


/* const formElement = `
    <form id='form'>
        ${inputElement('file', 'profilePicture', 'Profilképed')}
        ${inputElement(nameData.type, lanedata.label, nameData.name)}
        ${inputElement('email', 'personalEmail', 'Email címed', 'required')}
        ${selectElement('select', 'where', 'Hol hallottál rólunk?', ['interneten', 'ismerőstől', 'egyéb'])}
        ${inputElement('checkbox', 'terms', 'Elfogadom a felhasználási feltételeket')}
        ${inputElement('radio', 'newsletter', 'Hírlevelet szeretnél kapni')}
        <button>Beküldés</button>
    </form>
`; */

const selectFields = {
    type:"select",
    name:"where",
    label:'Hol hallottál rólunk?',
    options: ['interneten', 'ismerőstől', 'egyéb']
}

const processCountries = async () => {
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();
    //console.log(countryArr[0].name.official);

    let countries =[];
    for (const c of countryArr) {
        countries.push (c.name.official);
    }
    return countries;
}

processCountries();

const anotherSelectFields = async () => {
    return {
        type:"select",
        name:"countries",
        label:'Ország',
        //options: ["Magyarország", "Szlovákia"]
        options: await processCountries()
    }
}

const formElement = (ffs, id, sel) => {
    let inputs = '';
    for (const ff of ffs) {
        inputs += inputElement(ff.type, ff.name, ff.label, ff.req)
    };
    return `
    <form id='${id}'>
        ${inputs}
        ${selectElement(sel.type, sel.name, sel.label, sel.options)}
        <button>OK</button>
    </form>
    `
}

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
    if (event.target.getAttribute('name') === 'firstName') {
        document.getElementById('inputValue').innerHTML = event.target.value;
    }
    if (event.target.getAttribute('name') === 'profilePicture') {
        console.log(event.target.files[0]);

        const image = URL.createObjectURL(event.target.files[0]);
        document.getElementById('inputValue').insertAdjacentHTML("beforeend", `
        <img src='${image}'>
        `)
    }
    console.log(event.target.closest('#form'))
}


async function loadEvent() {
    const root = document.getElementById('root');
    const waitForanotherSelectFields = await anotherSelectFields();

    root.insertAdjacentHTML('afterbegin', formElement(formFields, 'form', selectFields));
    root.insertAdjacentHTML('afterbegin', formElement(anotherFormFields, 'form2', waitForanotherSelectFields));
    root.insertAdjacentHTML('afterbegin', `
        <div id='inputValue'></div>
    `);
    

    const form = document.getElementById('form');
    form.addEventListener('submit', formSubmit)

    const inputList = form.querySelectorAll('input');

    for (const input of inputList) {
        input.addEventListener('input', inputUpdate)
    }
}

window.addEventListener('load', loadEvent);