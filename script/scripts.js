const cards = document.querySelectorAll('.memory-card')
const frontFace = document.querySelectorAll('.front-face')


let hasFlippedCard = false
let lockBoard = false
let firstCard,secondCard

cards.forEach(cards => cards.addEventListener('click', flipCard))

function flipCard(){
    if(lockBoard) return
    if(this === firstCard) return

    this.classList.toggle('flip')

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true
        firstCard = this

        return
    }
    //second click
    secondCard = this
    checkForMatch()
    
}

function checkForMatch(){
    let isMatch = firstCard.dataset.image === secondCard.dataset.image
    if(isMatch){
        firstCard.childNodes[1].classList.toggle('match') && secondCard.childNodes[1].classList.toggle('match')
    }
    isMatch? disableCards() : unflipCards()
}

function turnYellow(){
    console.log('this work?')
    this.classList.toggle('flip')
    frontFace.forEach(card => {
        card.style.background = 'green'
    })
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    },1000)
}

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false]
    [firstCard,secondCard] = [null,null]
}

(function shuffle(){
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random()*12)
        card.style.order = randomNum
    })
})()

document.querySelector('.reload').addEventListener('click', () =>location.reload())