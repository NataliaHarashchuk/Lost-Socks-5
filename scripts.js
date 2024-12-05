
window.addEventListener('load', function() {
    const block2 = document.querySelector('.block2');
    const block5 = document.querySelector('.block5');
    
    // Отримуємо контент кожного блоку
    const content2 = block2.innerHTML;
    const content5 = block5.innerHTML;
    
    // Міняємо контент між блоками
    block2.innerHTML = content5;
    block5.innerHTML = content2;

});

// ---------------------------------------------------------------------------
function calculatePentagonArea() {
    const side = 10;
    const apothem = 8;
    const area = (5 * side * apothem) / 2;
    document.getElementById('pentagon-area').textContent = `Площа: ${area.toFixed(2)} к.о`;
}

document.addEventListener('DOMContentLoaded', calculatePentagonArea);
// ---------------------------------------------------------------------------
function reverseNumber(num) {
    return num.toString().split('').reverse().join('');
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;Secure`;
}

function eraseCookie(name) {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

window.onload = function() {
    const reversedNumber = getCookie('reversedNumber');
    if (reversedNumber) {
        alert(`Перевернуте число з cookies: ${reversedNumber}\nПісля натискання «ОК» cookies будуть видалені.`);
        eraseCookie('reversedNumber');
        
        if (!getCookie('reversedNumber')) {
            alert('Cookies були видалені.');
        } else {
            alert('Не вдалося видалити cookies. Перевірте конфігурацію.');
        }
    }
};



document.getElementById('reverse-button').addEventListener('click', function() {
    const numberInput = document.getElementById('number-input').value;

    if (numberInput && !isNaN(numberInput)) {
        const reversedNumber = reverseNumber(numberInput);

        alert('Перевернуте число: ' + reversedNumber);

        setCookie('reversedNumber', reversedNumber, 7);
        
        document.getElementById('form-block').style.display = 'none';
    } else {
        alert('Будь ласка, введіть правильне число.');
    }
});
// ---------------------------------------------------------------------------
const blockClasses = [
    'block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'
];

function changeBorderColor() {
    const color = document.getElementById('color-input').value;

    if (color) {
        localStorage.setItem('borderColor', color);

        blockClasses.forEach(blockClass => {
            const blocks = document.querySelectorAll(`.${blockClass}`); 
            blocks.forEach(block => {
                block.style.border = `1px solid ${color}`;
            });
        });
    }
}


window.addEventListener('load', function () {
    const savedColor = localStorage.getItem('borderColor');

    if (savedColor) {
        
        blockClasses.forEach(blockClass => {
            const blocks = document.querySelectorAll(`.${blockClass}`);
            blocks.forEach(block => {
                block.style.border = `2px solid ${savedColor}`
            });
        });
    }
});

document.getElementById('applyColorBtn').addEventListener('click', changeBorderColor);
// --------------------------------------------------

document.getElementById('logo').addEventListener('click', (event) => {
    const block4 = document.getElementById('block4');


    block4.innerHTML = '';


    const form = document.createElement('form');
    form.id = 'css-form';
    form.innerHTML = `
        <label for="css-selector">CSS-селектор:</label>
        <input type="text" id="css-selector" placeholder="Наприклад, #block1" required><br><br>
        <label for="css-property">CSS-властивість:</label>
        <input type="text" id="css-property" placeholder="Наприклад, color" required><br><br>
        <label for="css-value">Значення:</label>
        <input type="text" id="css-value" placeholder="Наприклад, red" required><br><br>
    `;
    block4.appendChild(form);


    const button1 = document.createElement('button');
    button1.textContent = '1';
    button1.type = 'button';
    button1.addEventListener('click', saveCSSInstruction);
    block4.appendChild(button1);


    const button2 = document.createElement('button');
    button2.textContent = '2';
    button2.type = 'button';
    button2.addEventListener('click', clearCSSInstructions);
    block4.appendChild(button2);
});


function saveCSSInstruction() {
    const selector = document.getElementById('css-selector').value;
    const property = document.getElementById('css-property').value;
    const value = document.getElementById('css-value').value;

    if (selector && property && value) {
        const cssInstructions = JSON.parse(localStorage.getItem('cssInstructions')) || [];
        cssInstructions.push({ selector, property, value });
        localStorage.setItem('cssInstructions', JSON.stringify(cssInstructions));
        applyCSSInstructions();
        alert('CSS-інструкція збережена!');
    } else {
        alert('Будь ласка, заповніть усі поля форми.');
    }
}


function clearCSSInstructions() {
    localStorage.removeItem('cssInstructions'); 
    applyCSSInstructions(); 
    alert('Усі CSS-інструкції видалено!');
}


function applyCSSInstructions() {
    const styleSheetId = 'dynamic-styles';


    const existingStyle = document.getElementById(styleSheetId);
    if (existingStyle) {
        existingStyle.remove();
    }


    const cssInstructions = JSON.parse(localStorage.getItem('cssInstructions')) || [];
    if (cssInstructions.length > 0) {
        const styleSheet = document.createElement('style');
        styleSheet.id = styleSheetId;
        cssInstructions.forEach(({ selector, property, value }) => {
            styleSheet.textContent += `${selector} { ${property}: ${value}; }\n`;
        });
        document.head.appendChild(styleSheet);
    }
}

window.addEventListener('load', applyCSSInstructions);

