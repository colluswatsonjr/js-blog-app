// alert('hello world!')
// grabs form, inputs, selectors, containers, buttons by ID
const createCardForm = () => document.getElementById('createCardForm');
const titleField = () => document.getElementById('cardTitleField');
const authorField = () => document.getElementById('cardAuthorField');
const contentField = () => document.getElementById('cardContentField');
const showCards = () => document.getElementById('showCards');
const holdCards = () => document.getElementById('holdCards');
const editCard = () => document.getElementById('editCard')
const deleteCard = () => document.getElementById('deleteCard');

let cardList = [];
//Functions
function createCard(data) {
    console.log('got data')

    let newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.innerHTML = `
    <h2 id="cardTitle">${data.title}</h2>
    <h4 id="cardAuthor">${data.author}</h4>
    <h4 id="cardContent">${data.content}</h4>
    <button type="submit" id="editCard">Edit Card</button>
    <button type="submit" id="deleteCard">Delete Card</button>
    `;

    displayCard(newCard)
}

function displayCard(card){
    
}


//Eventlisteners
createCardForm().addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('heard submit')

    let cardData = {
        title: titleField().value,
        author: authorField().value,
        content: contentField().value
    }

    cardList.unshift(cardData) //add to created card list
    createCard(cardData) //create div card to add to html

})

showCards().addEventListener('change', (event) => {
    event.preventDefault();
    console.log('heard change')

    let selected = event.target.value;
    displayCard();
})

//Renders

// displayCards();