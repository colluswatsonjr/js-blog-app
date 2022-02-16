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
    newCard.id = '';
    newCard.innerHTML = `
    <h2 id="cardTitle">${data.title}</h2>
    <h4 id="cardAuthor">${data.author}</h4>
    <h4 id="cardContent">${data.content}</h4>
    <button id="editCard">Edit Card</button>
    <button id="restoreCard">Retore Card</button>
    <button id="removeCard">Remove Card</button>
    `;
    newCard.querySelector('#editCard').addEventListener('click', () => {
        
    })
    newCard.querySelector('#restoreCard').addEventListener('click', () => {
        deleteData(data, 'removedCards');
        data.id = '';
        postData(data, 'currentCards');
        fetchData();
    })
    newCard.querySelector('#removeCard').addEventListener('click', () => {
        if (confirm("Are you sure?")) {
            if (showCards().value == 'currentCards') {
                console.log('remove')
                deleteData(data, 'currentCards');
                data.id = '';
                postData(data, 'removedCards');
            } else if (showCards().value == 'removedCards') {
                deleteData(data)
            }
            fetchData();
        }
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
// http://localhost:3000/removedCards
function fetchData(selectList = showCards().value) { //fetch data from database
    holdCards().innerHTML = '';
    fetch(`http://localhost:3000/${selectList}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(card => {
                let created = createCard(card);
                if (selectList == 'currentCards') {
                    created.querySelector('#restoreCard').style.display = 'none';
                    created.querySelector('#removeCard').innerHTML = 'Remove Card'

                } else if (selectList == 'removedCards') {
                    created.querySelector('#removeCard').innerHTML = 'Delete Card'
                }
                holdCards().appendChild(created)
            })
        })
        .catch(err => console.log(err))
};

function postData(cardData, selectList = showCards().value) { //add data to database using fetch
    fetch(`http://localhost:3000/${selectList}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}
function deleteData(cardData, selectList = showCards().value) {
    console.log(cardData)
    fetch(`http://localhost:3000/${selectList}/${cardData.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
}

//Eventlisteners
createCardForm().addEventListener('submit', (event) => { //add submit listenr to form
    event.preventDefault();

    let cardData = {
        title: titleField().value,
        author: authorField().value,
        content: contentField().value
    }

    postData(cardData, 'currentCards'); //add data to database
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