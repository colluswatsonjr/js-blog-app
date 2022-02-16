// alert('hello world!')
// grabs form, inputs, selectors, containers, buttons by ID
const createCardForm = () => document.getElementById('createCardForm');
const titleField = () => document.getElementById('cardTitleField');
const authorField = () => document.getElementById('cardAuthorField');
const contentField = () => document.getElementById('cardContentField');
const showCards = () => document.getElementById('showCards');
let selected = showCards().value
const holdCards = () => document.getElementById('holdCards');
const editCard = () => document.getElementById('editCard')
const deleteCard = () => document.getElementById('deleteCard');

let cardList = [
    {
        title: 'title1',
        author: 'author1',
        content: 'contentekdfnjnjvnvn wjfvwjefv wjvwfvwfvvwev'
    },
    {
        title: 'title2',
        author: 'author2',
        content: 'contentekdfnjnjvnvn wjfvwjefv wjvwfvwfvvwev'
    }
];
let notCardList = [
    {
        title: 'title3',
        author: 'author3',
        content: 'contentekdfnjnjvnvn wjfvwjefv wjvwfvwfvvwev'
    },
    {
        title: 'title4',
        author: 'author4',
        content: 'contentekdfnjnjvnvn wjfvwjefv wjvwfvwfvvwev'
    }];
//Functions
function createCard(data) { //function to create card from data
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
    return newCard;
}

function displayCards(selected) { //function to display cards from array
    holdCards().innerHTML = '';
    if (selected == 'currentCards') {
        cardList.forEach(card => {
            let created = createCard(card);
            holdCards().appendChild(created)
        })
    } else if (selected == 'deletedCards') {
        notCardList.forEach(card => {
            let created = createCard(card);
            holdCards().appendChild(created)
        })
    } else {
        console.log('neither selected')
    }

}


//Eventlisteners
createCardForm().addEventListener('submit', (event) => { //add submit listenr to form
    event.preventDefault();
    console.log('heard submit')

    let cardData = {
        title: titleField().value,
        author: authorField().value,
        content: contentField().value
    }

    cardList.unshift(cardData) //add to created card list
    displayCards(selected)
})

showCards().addEventListener('change', (event) => { //add change listener to select
    event.preventDefault();
    console.log('heard change')
    let selected = event.target.value;
    displayCards(selected)
    return selected;
})

//Renders

displayCards(selected);
