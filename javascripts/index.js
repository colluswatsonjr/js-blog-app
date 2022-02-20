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
    let card = document.createElement('div')
    card.classList.add('card');
    card.id = '';
    card.innerHTML = `
    <h2 id="cardTitle">${data.title}</h2>
    <h3 id="cardContent">${data.content}</h3>
    <h4 id="cardAuthor">${data.author}</h4>
    <button id="editCard">Edit Card</button>
    <button id="save">Save</button>
    <button id="cancel">Cancel</button>
    <button id="restoreCard">Retore Card</button>
    <button id="removeCard">Remove Card</button>
    `;
    card.querySelector('#save').style.display = 'none';
    card.querySelector('#cancel').style.display = 'none';

    card.querySelector('#editCard').addEventListener('click', () => {

        card.querySelector('#cardTitle').contentEditable = 'true';
        card.querySelector('#cardAuthor').contentEditable = 'true';
        card.querySelector('#cardContent').contentEditable = 'true';

        card.querySelector('#editCard').style.display = 'none';
        card.querySelector('#removeCard').style.display = 'none';

        card.querySelector('#save').style.display = '';
        card.querySelector('#cancel').style.display = '';

        card.querySelector('#save').addEventListener('click', () => {
            let newData = {
                title: card.querySelector('#cardTitle').innerHTML,
                author: card.querySelector('#cardAuthor').innerHTML,
                content: card.querySelector('#cardContent').innerHTML,
                id: data.id
            }
            patchData(newData);
            fetchData();
        })
        card.querySelector('#cancel').addEventListener('click', () => {
            fetchData();
        })

    })
    card.querySelector('#restoreCard').addEventListener('click', () => {
        deleteData(data, 'removedCards');
        data.id = '';
        postData(data, 'currentCards');
        fetchData();
    })
    card.querySelector('#removeCard').addEventListener('click', () => {
        // if (confirm("Are you sure?")) {
        if (showCards().value == 'currentCards') {
            console.log('remove')
            deleteData(data, 'currentCards');
            data.id = '';
            postData(data, 'removedCards');
        } else if (showCards().value == 'removedCards') {
            deleteData(data)
        }
        fetchData();
        // }
    })
    return card;
}

//Fetch
// http://localhost:3000/currentCards
// http://localhost:3000/removedCards
function fetchData(selectList = showCards().value) { //fetch data from database
    holdCards().innerHTML = '';
    fetch(`http://localhost:3000/${selectList}`)
        .then(res => res.json())
        .then(data => {
            let array = data.reverse()
            array.forEach(card => {

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
function patchData(cardData, selectList = showCards().value) {
    console.log('update')

    fetch(`http://localhost:3000/${selectList}/${cardData.id}`, {
        method: 'PATCH',
        headers: {
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

    titleField().value = '';
    authorField().value = '';
    contentField().value = '';
})

showCards().addEventListener('change', (event) => { //add change listener to select
    event.preventDefault();
    fetchData();
})


//Renders
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    fetchData();
})