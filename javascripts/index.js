// alert('hello world!')
// grabs form, inputs, selectors by ID
const createCardForm = () => document.getElementById('createCardForm');
const titleField = () => document.getElementById('cardTitleField');
const authorField = ()=> document.getElementById('cardAuthorField');
const contentField = ()=> document.getElementById('cardContentField');
const showCards = () => document.getElementById('showCards');
const holdCards = () => document.getElementById('holdCards');

//Eventlisteners
createCardForm().addEventListener('submit', (event) => {
    event.preventDefault();
    let cardData = {
        title: titleField().value,
        author: authorField().value,
        content: authorField().value
    }

    console.log('heard submit', cardData)
})

showCards().addEventListener('change', (event)=>{
    event.preventDefault();
    let selected = event.target.value

    console.log('heard change', selected)
})