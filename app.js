const user = {
    firstName: "",
    lastName: "",
    challenge: "",
    mindset: "",
    commitment: false
};


const challenges = [
    {
        challenge: "Ventas bajas",
        mindset: "Optimismo"
    },

    {
        challenge: "Competencia",
        mindset: "Mentalidad competitiva"
    },

    {
        challenge: "Duda",
        mindset: "Confianza"
    },

    {
        challenge: "Rechazo",
        mindset: "Persistencia"
    },

    {
        challenge: "Cambio",
        mindset: "Flexibilidad y Adaptabilidad"
    },

    {
        challenge: "Desorden",
        mindset: "Sistematización y Eficiencia"
    },

    {
        challenge: "Estancamiento",
        mindset: "Sed de conocimiento y amor por enseñar"
    }
];


console.log(challenges);


const screen = document.getElementById("screen");


function showWelcomeScreen() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="logo">
                - EVENTO -
            </div>

            <h1>
                LAS 7<br>
                MENTALIDADES
                
            </h1>

            <p>
                DEL LÍDER RETAIL
            </p>

            <button id="startButton">
                COMENZAR
            </button>

        </div>
    `;

    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", function () {

        showNameScreen();

    });
}


function showNameScreen() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="logo">
                EVENTO
            </div>

            <h2>
                COMENCEMOS
            </h2>

            <p>
                Escribe tu nombre y apellido
            </p>

            <div class="form">

                <input
                    type="text"
                    id="firstName"
                    placeholder="NOMBRE"
                >

                <input
                    type="text"
                    id="lastName"
                    placeholder="APELLIDO"
                >

            </div>

            <button id="continueButton">
                CONTINUAR
            </button>

        </div>
    `;


    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const continueButton = document.getElementById("continueButton");


    continueButton.addEventListener("click", function () {

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();


        if (firstName === "" || lastName === "") {

            alert("Por favor, escribe tu nombre y apellido.");

            return;
        }


        user.firstName = firstName;
        user.lastName = lastName;


        showChallengeScreen();

    });

}


function showChallengeScreen() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="logo">
                LAS 7 MENTALIDADES
            </div>

            <h2>
                ¿CUÁL ES TU MAYOR<br>
                DESAFÍO COMO LÍDER RETAIL?
            </h2>

            <div id="challengeGrid" class="challenge-grid">

            </div>

            <button id="challengeContinueButton" disabled>
    CONTINUAR
</button>

        </div>
    `;


    const challengeGrid = document.getElementById("challengeGrid");
    
    const challengeContinueButton = document.getElementById("challengeContinueButton");


    challenges.forEach(function (item) {

        const button = document.createElement("button");

        button.classList.add("challenge-button");

button.innerHTML = `
    <span class="challenge-title">
        ${item.challenge}
    </span>
`;
        
button.addEventListener("click", function () {

    document.querySelectorAll(".challenge-button").forEach(function (button) {

    button.classList.remove("selected");

});

    user.challenge = item.challenge;
    user.mindset = item.mindset;

    button.classList.add("selected");

    challengeContinueButton.disabled = false;

    console.log(user);

});

        challengeGrid.appendChild(button);

    });

challengeContinueButton.addEventListener("click", function () {

    showCommitmentScreen();

});

}

function showCommitmentScreen() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="logo">
                LAS 7 MENTALIDADES
            </div>

            <p class="section-label">
                TU DESAFÍO PRINCIPAL
            </p>

            <h2 id="selectedChallenge">
                ${user.challenge}
            </h2>

            <p class="commitment-question">
                ¿TE COMPROMETES A<br>
                DESARROLLAR LAS 7 MENTALIDADES?
            </p>

            <button id="commitmentButton">
                SÍ, ME COMPROMETO
            </button>

        </div>
    `;


    const commitmentButton =
        document.getElementById("commitmentButton");


    commitmentButton.addEventListener("click", function () {

        user.commitment = true;

        showProcessingScreen();

    });

}

function showProcessingScreen() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="processing-label">
                PROCESANDO
            </div>

            <div id="processingMessage">
                ANALIZANDO TU RESPUESTA...
            </div>

        </div>
    `;

    const processingMessage =
    document.getElementById("processingMessage");


setTimeout(function () {

    processingMessage.textContent =
        "IDENTIFICANDO DESAFÍO...";

}, 1500);


setTimeout(function () {

    processingMessage.textContent =
        "DETERMINANDO MENTALIDAD...";

}, 3000);


setTimeout(function () {

    processingMessage.textContent =
        "GENERANDO ADQUISICIÓN...";

}, 3000);

setTimeout(function () {

    showMindsetResult();

}, 4500);

}

function showMindsetResult() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="result-label">
                MENTALIDAD IDENTIFICADA
            </div>

            <h1 class="mindset-result">
                ${user.mindset}
            </h1>

            <p class="result-description">
                Esta es la mentalidad que puede ayudarte
                a enfrentar tu principal desafío.
            </p>

            <button id="resultContinueButton">
                CONTINUAR
            </button>

        </div>
    `;


    const resultContinueButton =
        document.getElementById("resultContinueButton");


    resultContinueButton.addEventListener("click", function () {

    generateTicket();

});

}

function showTicketScreen() {

    const transactionId =
        "LR-" +
        Date.now().toString().slice(-8);


    const currentDate =
        new Date().toLocaleDateString("es-HN");


    screen.innerHTML = `
        <div class="ticket-screen">

            <div class="ticket">

                <div class="ticket-header">

                    <div class="ticket-logos">
                        LOGO 1 · LOGO 2 · LOGO 3
                    </div>

                    <h2>
                        TICKET DE ADQUISICIÓN
                    </h2>

                    <p>
                        Las 7 Mentalidades del Líder Retail
                    </p>

                </div>


                <div class="ticket-info">

                    <div>
                        <strong>CLIENTE</strong>
                        ${user.firstName} ${user.lastName}
                    </div>

                    <div>
                        <strong>FECHA</strong>
                        ${currentDate}
                    </div>

                    <div>
                        <strong>TRANSACCIÓN</strong>
                        ${transactionId}
                    </div>

                </div>


                <div class="ticket-divider">
                    --------------------------------
                </div>


                <div class="ticket-section">

                    <strong>
                        RETO PRINCIPAL IDENTIFICADO
                    </strong>

                    <span>
                        ${user.challenge}
                    </span>

                </div>


                <div class="ticket-divider">
                    --------------------------------
                </div>


                <div class="ticket-section">

                    <strong>
                        MENTALIDAD RECOMENDADA
                    </strong>

                    <span class="ticket-highlight">
                        ${user.mindset}
                    </span>

                </div>


                <div class="ticket-divider">
                    --------------------------------
                </div>


                <div class="ticket-section">

                    <strong>
                        LAS 7 MENTALIDADES
                    </strong>

                    <div class="mindset-list">

                        <span>✓ Optimismo</span>

                        <span>✓ Mentalidad competitiva</span>

                        <span>✓ Confianza</span>

                        <span>✓ Persistencia</span>

                        <span>✓ Flexibilidad y Adaptabilidad</span>

                        <span>✓ Sistematización y Eficiencia</span>

                        <span>✓ Sed de conocimiento y amor por enseñar</span>

                    </div>

                </div>


                <div class="ticket-divider">
                    --------------------------------
                </div>


                <div class="ticket-total">

                    <div>
                        <strong>VALOR COMERCIAL</strong>
                        <span>L. 0.00</span>
                    </div>

                    <div>
                        <strong>FORMA DE PAGO</strong>
                        <span>COMPROMISO PERSONAL</span>
                    </div>

                    <div>
                        <strong>DESCUENTO</strong>
                        <span>EXPERIENCIA DEL EVENTO</span>
                    </div>

                    <div class="total">

                        <strong>TOTAL</strong>

                        <span>
                            L. 0.00
                        </span>

                    </div>

                </div>


                <div class="ticket-divider">
                    --------------------------------
                </div>


                <div class="ticket-approved">

                    <strong>
                        ✓ ADQUISICIÓN APROBADA
                    </strong>

                    <p>
                        Valor comercial:
                        INVALUABLE
                    </p>

                    <p>
                        Valor para quien las aplica:
                        TRANSFORMADOR
                    </p>

                    <p>
                        Estado:
                        ✓ COMPRA EXITOSA
                    </p>

                </div>


                <div class="ticket-footer">

                    <p>
                        "Los equipos son lo que son
                        porque eso es lo que son
                        siendo equipos."
                    </p>

                    <span>
                        — EXPOSITOR
                    </span>

                </div>

            </div>


            <button id="ticketContinueButton">
                CONTINUAR
            </button>

        </div>
    `;


    const ticketContinueButton =
        document.getElementById("ticketContinueButton");


    ticketContinueButton.addEventListener("click", function () {

        console.log("Ticket generado:", transactionId);

    });

}

const mindsets = [
    "Optimismo",
    "Mentalidad competitiva",
    "Confianza",
    "Persistencia",
    "Flexibilidad y Adaptabilidad",
    "Sistematización y Eficiencia",
    "Sed de conocimiento y amor por enseñar"
];

function generateTicket() {

    const transactionId =
        "LR-" +
        Date.now().toString().slice(-8);

    const currentDate =
        new Date().toLocaleDateString("es-HN");

    const ticket = {
    transactionId: transactionId,
    date: currentDate,
    client: `${user.firstName} ${user.lastName}`,
    challenge: user.challenge,
    mindset: user.mindset,
    mindsets: mindsets
};

    const printableTicket = formatTicket(ticket);

console.log("TICKET GENERADO:");
console.log(printableTicket);

showPrintingScreen(printableTicket);

}

function formatTicket(ticket) {

    const WIDTH = 32;

    let output = "";


    // HEADER

    output += centerText("EVENTO RETAIL", WIDTH) + "\n";
    output += centerText("LAS 7 MENTALIDADES", WIDTH) + "\n";
    output += line(WIDTH) + "\n";

    output += centerText("TICKET DE ADQUISICION", WIDTH) + "\n";
    output += "\n";


    // CLIENTE

    output += "CLIENTE:\n";
    output += wrapText(ticket.client, WIDTH) + "\n\n";

    output += "FECHA: " + ticket.date + "\n";

    output += "TRANSACCION:\n";
    output += ticket.transactionId + "\n";

    output += line(WIDTH) + "\n";


    // DESAFIO

    output += "RETO PRINCIPAL:\n";
    output += wrapText(ticket.challenge, WIDTH) + "\n\n";


    // MENTALIDAD

    output += "MENTALIDAD RECOMENDADA:\n";
    output += wrapText(ticket.mindset, WIDTH) + "\n";

    output += line(WIDTH) + "\n";


    // LAS 7 MENTALIDADES

    output += centerText("LAS 7 MENTALIDADES", WIDTH) + "\n\n";


    ticket.mindsets.forEach(function (mindset) {

        const wrapped = wrapText(mindset, WIDTH - 4);

        const lines = wrapped.split("\n");

        lines.forEach(function (text, index) {

            if (index === 0) {

                output += "[✓] " + text + "\n";

            } else {

                output += "    " + text + "\n";

            }

        });

    });


    output += "\n";
    output += line(WIDTH) + "\n";


    // VALOR

    output += "VALOR COMERCIAL:       L. 0.00\n";
    output += "ADQUISICION:           COMPROMISO\n";
    output += "DESCUENTO:             100% APLICACION\n";
    output += "TOTAL:                 L. 0.00\n";

    output += line(WIDTH) + "\n";


    // APROBACION

    output += centerText("ADQUISICION APROBADA", WIDTH) + "\n\n";

    output += "VALOR COMERCIAL:\n";
    output += "INCALCULABLE\n\n";

    output += "VALOR AL APLICARLAS:\n";
    output += "TRANSFORMADOR\n\n";

    output += "ESTADO: [✓] COMPRA EXITOSA\n";

    output += line(WIDTH) + "\n";


    // FOOTER

    output += "\n";

    output += "\n";

    output += centerText("Gracias por adquirir", WIDTH) + "\n";
    output += centerText("tu compromiso.", WIDTH) + "\n";

    output += "\n\n\n";


    return output;

}

function wrapText(text, maxLength) {

    const words = text.split(" ");

    let lines = [];
    let currentLine = "";

    words.forEach(function (word) {

        if ((currentLine + word).length > maxLength) {

            lines.push(currentLine.trim());

            currentLine = word + " ";

        } else {

            currentLine += word + " ";

        }

    });

    if (currentLine.trim() !== "") {

        lines.push(currentLine.trim());

    }

    return lines.join("\n");

}

function centerText(text, width) {

    if (text.length >= width) {
        return text.substring(0, width);
    }

    const totalSpaces = width - text.length;

    const leftSpaces = Math.floor(totalSpaces / 2);

    return " ".repeat(leftSpaces) + text;
}

function line(width) {

    return "-".repeat(width);

}

function showPrintingScreen(printableTicket) {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="processing-label">
                TICKET DE ADQUISICIÓN
            </div>

            <div id="printingMessage">
                GENERANDO TICKET...
            </div>

        </div>
    `;

    const printingMessage = document.getElementById("printingMessage");

    printingMessage.textContent = "ENVIANDO A IMPRESORA...";

    // Android: impresión física mediante el puente nativo.
    if (window.AndroidPrinter && typeof window.AndroidPrinter.printTicket === "function") {
        printingMessage.textContent = "IMPRIMIENDO...";
        window.AndroidPrinter.printTicket(printableTicket);
        return;
    }

    // Navegador de escritorio: simulación para poder seguir desarrollando la web.
    setTimeout(function () {
        printingMessage.textContent = "IMPRIMIENDO...";
    }, 1500);

    setTimeout(function () {
        showSuccessScreen();
    }, 3500);
}

window.onAndroidPrintResult = function(status, message) {
    if (status === "success") {
        showSuccessScreen();
        return;
    }

    const printingMessage = document.getElementById("printingMessage");
    if (printingMessage) {
        printingMessage.innerHTML = `
            <div style="margin-bottom: 20px;">ERROR DE IMPRESIÓN</div>
            <div style="font-size: 0.75em; margin-bottom: 24px;">${message || "No se pudo imprimir el ticket."}</div>
            <button id="retryPrintButton">REINTENTAR</button>
        `;

        document.getElementById("retryPrintButton").addEventListener("click", function () {
            // Regeneramos exactamente el ticket pendiente a partir del estado actual.
            const retryTicket = {
                transactionId: "LR-" + Date.now().toString().slice(-8),
                date: new Date().toLocaleDateString("es-HN"),
                client: `${user.firstName} ${user.lastName}`,
                challenge: user.challenge,
                mindset: user.mindset,
                mindsets: mindsets
            };
            showPrintingScreen(formatTicket(retryTicket));
        });
    }
};

function showSuccessScreen() {

    screen.innerHTML = `
        <div class="screen-content">

            <div class="success-icon">
                ✓
            </div>

            <div class="result-label">
                ADQUISICIÓN COMPLETADA
            </div>

            <p class="success-message">
                Tu ticket ha sido impreso.
            </p>

            <p id="resetMessage" class="reset-message">
                Esta pantalla se reiniciará en unos segundos...
            </p>

        </div>
    `;


    setTimeout(function () {

        resetExperience();

    }, 5000);

}

function resetExperience() {

    user.firstName = "";
    user.lastName = "";
    user.challenge = "";
    user.mindset = "";
    user.commitment = false;


    console.log("Experiencia reiniciada:", user);


    showWelcomeScreen();

}

showWelcomeScreen();
