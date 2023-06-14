let submitButton = document.querySelector('form button')
let form = document.querySelector('form');
let input = form.querySelector('input[type="text"]');
let imageContainer = document.querySelector('.results');
let resetButton = document.querySelector('footer button');
let infoButton = document.querySelector('button.moreInfo')
let infoScreen = document.querySelector('section.popup')
let batchOverview = document.querySelector('section.not')
let queryExtra
//test
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
});

console.log(imageContainer)

// dalle vars - ai generated
const apiKey = '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';

const n = 4; // Aantal afbeeldingen dat je wilt genereren
const size = '512x512'; // Resolutie van de afbeeldingen


const myToggle = document.querySelector('.toggle');
myToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        // Doe iets als de toggle is ingeschakeld
        console.log('Toggle is ingeschakeld');
        queryExtra = ". Make sure that the image fits fully in frame and has a white background"
    } else {
        // Doe iets als de toggle is uitgeschakeld
        console.log('Toggle is uitgeschakeld');
        queryExtra = " ";
    }
});

submitButton.addEventListener('click', queryAI)
submitButton.addEventListener('click', moveFrame)
resetButton.addEventListener('click', resetPage)
infoButton.addEventListener('click', openInfo)

function moveFrame() {
    let main = document.querySelector('main').classList.add('active')
}

function queryAI() {
    submitButton.disabled = true
    myToggle.disabled = true
    batchOverview.style.display = 'none'
    let originalQuery = input.value;
    console.log('Query: ' + originalQuery)

    // const data = {
    //     prompt: 'Translate the following text: ' + originalQuery + '. I only want the translation, no other text.',
    //     max_tokens: 60,
    //     temperature: 0.5,
    // };

    // fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${apiKey}`,
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));

    const prompt = originalQuery + queryExtra;

    // ai generated code

    fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'image-alpha-001',
            prompt: prompt,
            n: n,
            size: size
        })
    })
        .then(response => response.json())
        .then(data => {
            data = data.data
            console.log(data);
            console.log(data.length);

            for (let i = 0; i < data.length; i++) {
                const container = document.createElement('div');

                // Create the image element and set its source
                const img = document.createElement('img');
                img.src = data[i].url;

                // Create the anchor element and set its href and download attributes
                const a = document.createElement('a');
                a.href = data[i].url;
                a.download = true;
                a.target = 'blanc_'
                a.textContent = 'Download';

                // Append the image and anchor elements to the container div
                container.appendChild(img);
                container.appendChild(a);

                // Append the container div to the parent element
                imageContainer.appendChild(container);
            }
        });

    resetButton.style.display = 'flex'
}

function openInfo() {
    infoScreen.classList.toggle('openInfo')
}
function resetPage() {
    images = document.querySelectorAll('section.results div')
    console.log(images)
    for (i = 0; i < images.length; i++) {
        imageContainer.removeChild(images[i])
    }

    batchOverview.style.display = 'flex'
    submitButton.disabled = false
    let main = document.querySelector('main').classList.remove('active')
    input.value = ' '
    resetButton.style.display = 'none'

}