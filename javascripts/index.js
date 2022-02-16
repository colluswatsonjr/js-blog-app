// alert('hello world!')
// grabs form, inputs, selectors, containers, buttons by ID
const createCardForm = () => document.getElementById('createCardForm');
const titleField = () => document.getElementById('cardTitleField');
const authorField = () => document.getElementById('cardAuthorField');
const contentField = () => document.getElementById('cardContentField');
const showCards = () => document.getElementById('showCards');
const holdCards = () => document.getElementById('holdCards');
// const editCard = () => document.querySelector('#editCard');
// const deleteCard = () => document.querySelector('#deleteCard');



//Functions
function createCard(data) { //function to create card from data
    console.log('got data')
    let newCard = document.createElement('div')
    newCard.classList.add('card');
    newCard.id = data.id
    newCard.innerHTML = `
    <h2 id="cardTitle">${data.title}</h2>
    <h4 id="cardAuthor">${data.author}</h4>
    <h4 id="cardContent">${data.content}</h4>
    <button id="editCard">Edit Card</button>
    <button id="deleteCard">Delete Card</button>
    `;
    newCard.querySelector('#editCard').addEventListener('click', () => {
        console.log(newCard)
    })
    newCard.querySelector('#deleteCard').addEventListener('click', () => {
        console.log(newCard)
    })
    return newCard;
}

function displayCards() { //function to display cards from array
    fetchData();
    // holdCards().innerHTML = '';
    // if (selected == 'currentCards') {
    //     let list = fetchData(selected)
    //     console.log(list)
    //     // cardList.forEach(card => {
    //     //     let created = createCard(card);
    //     //     holdCards().appendChild(created)
    //     // })
    // } else if (selected == 'deletedCards') {
    //     notCardList.forEach(card => {
    //         let created = createCard(card);
    //         holdCards().appendChild(created)
    //     })
    // } else {
    //     console.log('neither selected')
    // }

}

//Fetch
// http://localhost:3000/currentCards
// http://localhost:3000/deletedCards
function fetchData(select = showCards().value) { //fetch data from database
    holdCards().innerHTML = '';
    fetch(`http://localhost:3000/${select}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(card => {
                let created = createCard(card);
                holdCards().appendChild(created)
            })
        })
        .catch(err => console.log(err))
};

function postData(cardData){ //add data to database using fetch
    fetch(`http://localhost:3000/currentCards`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(cardData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

//Eventlisteners
createCardForm().addEventListener('submit', (event) => { //add submit listenr to form
    debugger;
    event.preventDefault();

    let cardData = {
        title: titleField().value,
        author: authorField().value,
        content: contentField().value
    }
    
    postData(cardData); //add data to database
    fetchData(); //display all cards of currently selected 
})

showCards().addEventListener('change', (event) => { //add change listener to select
    event.preventDefault();
    displayCards();
})


//Renders
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    displayCards();
    // fetchData();
})