let inProgressList = document.querySelector('ul.progressList')
let inProgressInput = document.querySelector('input.newInProgress')
let inProgressButton = document.querySelector('button.addInProgress')

let readyList = document.querySelector('ul.readyList')
let readyButton = document.querySelector('button.addReady')
let readyInput = document.querySelector('input.newReady')

readyButton.addEventListener('click', function (event) {
    event.preventDefault();
});
inProgressButton.addEventListener('click', function (event) {
    event.preventDefault();
});

function removable() {
    let allBatchNr = document.querySelectorAll('section.not li')
    console.log(allBatchNr)
    for (let i = 0; i < allBatchNr.length; i++) {
        console.log(allBatchNr[i].textContent);
        allBatchNr[i].addEventListener('click', function () {
            allBatchNr[i].remove();
        });
    }
}

function addInProgress() {
    let input = inProgressInput.value
    let liElement = document.createElement('li');
    if (input.length == 1) {
        xnumber = '000'
    } else {
        xnumber = '00'
    }
    liElement.textContent = '#' + xnumber + input

    inProgressList.appendChild(liElement);
    removable()
}
function addReady() {

}

inProgressButton.addEventListener('click', addInProgress)
readyButton.addEventListener('click', addReady)

removable()
