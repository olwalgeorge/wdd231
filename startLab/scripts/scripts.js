const openButton = document.querySelector('#openButton');
const dialogBox = document.querySelector('#dialogBox');
const closeButton = document.querySelector('#closeButton');
const dialogBoxText = document.querySelector('#dialogBox div');

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.textContent = "One apple has 95 calories.";
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.textContent = "One banana has 105 calories.";
});

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.textContent = "One orange has 60 calories.";
});

closeButton.addEventListener('click', () => {
    dialogBox.close();
})