// Historial de fichas
const bingoHistory = [];
// Set para almacenar las fichas que ya se han sacado
const drawnCards = new Set();
// Objeto que define los rangos de números para cada letra del bingo
const letterRanges = {
    'B': { min: 1, max: 15 },
    'I': { min: 16, max: 30 },
    'N': { min: 31, max: 45 },
    'G': { min: 46, max: 60 },
    'O': { min: 61, max: 75 }
};

// Función para generar una ficha única sin repetir las que ya se han sacado
function generateCard() {
    const letters = ['B', 'I', 'N', 'G', 'O'];
    let letter, number, card;

    // Seleccionar una letra aleatoria que no se haya sacado todavía
    do {
        letter = letters[Math.floor(Math.random() * letters.length)];
        const range = letterRanges[letter];
        number = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        card = letter + '-' + number;
    } while (drawnCards.has(card)); // Repetir hasta encontrar una ficha única

    drawnCards.add(card); // Agregar la ficha al conjunto de fichas sacadas
    return card;
}
// Función para agregar una ficha al historial
function addToHistory(card) {
    bingoHistory.push(card);
    updateHistory();
}

// Función para actualizar el historial de fichas en la interfaz
function updateHistory() {
    const historyContainer = document.getElementById('bingo-history');
    historyContainer.innerHTML = "";
    bingoHistory.forEach((card, index) => {
        const historyItem = document.createElement('div');
        historyItem.textContent = card;
        historyItem.classList.add('bingo-history-item');
        historyContainer.appendChild(historyItem);
    });
}

// Función para crear el tablero prellenado
function createInitialBoard() {
    const grid = document.getElementById('bingo-grid');
    const letters = Object.keys(letterRanges);
    letters.forEach(letter => {
        const letterContainer = document.createElement('div');
        const letterDiv = document.createElement('div')
        letterContainer.classList.add('bingo-letter-container');
        letterDiv.textContent = letter;
        letterDiv.classList.add("bingo-letter");
        letterDiv.classList.add(letter);
        letterContainer.appendChild(letterDiv);
        grid.appendChild(letterContainer);
        const range = letterRanges[letter];
        for (let i = range.min; i <= range.max; i++) {
            const card = letter + '-' + i;
            const cardElement = document.createElement('div');
            cardElement.textContent = card;
            cardElement.classList.add('bingo-number');
            letterContainer.appendChild(cardElement);
        }
    });
}

// Función para activar una ficha
function activateCard(card) {
    const grid = document.getElementById('bingo-grid');
    const cardElements = grid.getElementsByClassName('bingo-number');
    for (let i = 0; i < cardElements.length; i++) {
        if (cardElements[i].textContent === card) {
            cardElements[i].classList.add('active');
            break;
        }
    }
}

// Función para mostrar el modal con la ficha generada
function showModal(card) {
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modal-text');
    modalText.textContent = "Se ha sacado la ficha: " + card;
    modal.style.display = "block";
}

// Función para reiniciar el juego (mostrar modal de confirmación)
function resetGame() {
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.style.display = "block";
}

// Función para confirmar el reinicio del juego
function confirmReset() {
    const grid = document.getElementById('bingo-grid');
    grid.innerHTML = ""; // Limpiar el tablero
    createInitialBoard(); // Volver a crear el tablero prellenado
    bingoHistory.length = 0; // Limpiar historial de fichas
    updateHistory(); // Actualizar historial de fichas en la interfaz
    clearPantalla(); // Limpiar la ficha mostrada en la pantalla
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.style.display = "none";
}

// Función para cancelar el reinicio del juego
function cancelReset() {
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.style.display = "none";
}

// Función para limpiar la ficha mostrada en la pantalla
function clearPantalla() {
    const pantalla = document.getElementById('pantalla');
    pantalla.textContent = "";
}

// Manejador de clics del botón para generar una nueva ficha
document.getElementById('generate-btn').addEventListener('click', function () {
    showLoading(); // Mostrar loading
    setTimeout(function () {
        hideLoading(); // Ocultar loading
        const newCard = generateCard();
        addToHistory(newCard); // Agregar ficha al historial
        activateCard(newCard); // Activar ficha en el tablero
        clearPantalla(); // Limpiar la ficha mostrada en la pantalla
        const pantalla = document.getElementById('pantalla');
        pantalla.textContent = newCard; // Mostrar la nueva ficha en la pantalla
    }, 1000); // Tiempo de espera de 2 segundos
});

// Manejadores de clics para reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('confirm-reset-btn').addEventListener('click', confirmReset);
document.getElementById('cancel-reset-btn').addEventListener('click', cancelReset);

// Crear el tablero prellenado al cargar la página
createInitialBoard();

// Mostrar loading
function showLoading() {
    const loading = document.getElementById('loading');
    loading.style.display = "block";
}

// Ocultar loading
function hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.display = "none";
}
