const user = {
    firstName: "",
    lastName: "",
    challenge: "",
    mindset: "",
    commitment: false
};

const challenges = [
    { challenge: "Ventas Bajas", mindset: "Optimismo" },
    { challenge: "Competencia", mindset: "Mentalidad Competitiva" },
    { challenge: "Duda", mindset: "Confianza" },
    { challenge: "Rechazo", mindset: "Persistencia" },
    { challenge: "Cambio", mindset: "Flexibilidad y Adaptabilidad" },
    { challenge: "Desorden", mindset: "Sistematización y Eficiencia" },
    { challenge: "Estancamiento", mindset: "Sed de conocimiento y amor por enseñar" }
];

const mindsets = [
    "Optimismo",
    "Mentalidad competitiva",
    "Confianza",
    "Persistencia",
    "Flexibilidad y Adaptabilidad",
    "Sistematización y Eficiencia",
    "Sed de conocimiento y amor por enseñar"
];

const EXPOSITOR_PHRASE = "Los equipos reflejan lo que sus líderes modelan cada día";
const screen = document.getElementById("screen");

function brand() {
    return `
        <div class="brand-lockup">
            <img src="assets/01_CRECE.svg" alt="CRECE" class="brand-logo">
        </div>
    `;
}

function showWelcomeScreen() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="eyebrow">QUIERES ADQUIRIR</div>
            <img src="assets/05_GRAFISMO.svg" alt="Las 7 Mentalidades del Líder Retail" class="hero-grafismo">
            <p class="hero-copy">
            </p>
            <button class="cta" id="startButton">COMENZAR&nbsp; →</button>
            ${sponsors()}
        </div>
    `;

    document.getElementById("startButton").addEventListener("click", showNameScreen);
}

function showNameScreen() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="panel">
                <div class="eyebrow">PRIMER PASO</div>
                <h2 class="screen-title">COMENCEMOS</h2>
                <p class="screen-copy">Escribe tu nombre y apellido.</p>

                <div class="form">
                    <div class="input-wrap">
                        <input type="text" id="firstName" placeholder="NOMBRE" autocomplete="given-name">
                    </div>
                    <div class="input-wrap">
                        <input type="text" id="lastName" placeholder="APELLIDO" autocomplete="family-name">
                    </div>
                    <button class="cta" id="continueButton">CONTINUAR&nbsp; →</button>
                </div>
            </div>
            ${sponsors()}
        </div>
    `;

    document.getElementById("continueButton").addEventListener("click", () => {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();

        if (!firstName || !lastName) {
            showInlineError("Escribe tu nombre y apellido para continuar.");
            return;
        }

        user.firstName = firstName;
        user.lastName = lastName;
        showChallengeScreen();
    });
}

function showInlineError(message) {
    let error = document.getElementById("inlineError");
    if (!error) {
        error = document.createElement("div");
        error.id = "inlineError";
        error.className = "error-message";
        const panel = document.querySelector(".panel");
        panel.appendChild(error);
    }
    error.textContent = message;
}

function showChallengeScreen() {
    screen.innerHTML = `
        <div class="screen-content challenge-screen">
            ${brand()}
            <div class="eyebrow">CUENTANOS</div>
            <h2 class="screen-title">¿CUÁL ES TU MAYOR<br>DESAFÍO COMO LÍDER RETAIL?</h2>

            <div id="challengeGrid" class="challenge-grid"></div>

            <button class="cta challenge-continue" id="challengeContinueButton" disabled>
                CONTINUAR&nbsp; →
            </button>

            ${sponsors()}
        </div>
    `;

    const grid = document.getElementById("challengeGrid");
    const continueButton = document.getElementById("challengeContinueButton");

    challenges.forEach(item => {
        const button = document.createElement("button");
        button.className = "challenge-button";
        button.textContent = item.challenge;

        button.addEventListener("click", () => {
            document.querySelectorAll(".challenge-button").forEach(b => b.classList.remove("selected"));
            button.classList.add("selected");

            user.challenge = item.challenge;
            user.mindset = item.mindset;
            continueButton.disabled = false;
            continueButton.style.opacity = "1";
        });

        grid.appendChild(button);
    });

    continueButton.addEventListener("click", () => {
        if (!user.challenge) return;
        showCommitmentScreen();
    });
}

function showCommitmentScreen() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="eyebrow">TU DESAFÍO PRINCIPAL</div>
            <div class="commitment-challenge">${user.challenge}</div>
            <p class="commitment-question">
                ¿TE GUSTARÍA SABER QUE MENTALIDAD NECESITAS REFORZAR?
            </p>
            <button class="cta" id="commitmentButton">SÍ, ME GUSTARÍA&nbsp; →</button>
            ${sponsors()}
        </div>
    `;

    document.getElementById("commitmentButton").addEventListener("click", () => {
        user.commitment = true;
        showProcessingScreen();
    });
}

function showProcessingScreen() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="processing-orb"></div>
            <div class="processing-label">PROCESANDO</div>
            <div id="processingMessage" class="processing-message">ANALIZANDO TU RESPUESTA...</div>
            ${sponsors()}
        </div>
    `;

    const message = document.getElementById("processingMessage");

    setTimeout(() => message.textContent = "IDENTIFICANDO DESAFÍO...", 1000);
    setTimeout(() => message.textContent = "DETERMINANDO MENTALIDAD...", 2000);
    setTimeout(() => message.textContent = "GENERANDO ADQUISICIÓN...", 2800);
    setTimeout(showMindsetResult, 3600);
}

function showMindsetResult() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="result-label">MENTALIDAD IDENTIFICADA A REFORZAR</div>
            <h1 class="mindset-result">${user.mindset}</h1>
            <p class="result-description">
                Esta es la mentalidad que puede ayudarte<br>a enfrentar tu principal desafío.
            </p>
            <div class="result-actions">
                <button class="cta" id="resultContinueButton">GENERAR TICKET&nbsp; →</button>
            </div>
            ${sponsors()}
        </div>
    `;

    document.getElementById("resultContinueButton").addEventListener("click", generateTicket);
}

function showPrintingScreen(printableTicket) {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="processing-orb"></div>
            <div class="processing-label">TICKET DE ADQUISICIÓN</div>
            <div id="printingMessage" class="processing-message">ENVIANDO A IMPRESORA...</div>
        </div>
    `;

    const printingMessage = document.getElementById("printingMessage");

    if (window.AndroidPrinter && typeof window.AndroidPrinter.printTicket === "function") {
        printingMessage.textContent = "IMPRIMIENDO...";
        window.AndroidPrinter.printTicket(printableTicket);
        return;
    }

    // Desktop/browser development fallback.
    setTimeout(() => printingMessage.textContent = "IMPRIMIENDO...", 900);
    setTimeout(showSuccessScreen, 2500);
}

window.onAndroidPrintResult = function(status, message) {
    if (status === "success") {
        showSuccessScreen();
        return;
    }

    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="error-box">
                <div class="error-title">ERROR DE IMPRESIÓN</div>
                <div class="error-message">
                    ${message || "No se pudo imprimir el ticket."}
                </div>
                <button class="cta" id="retryPrintButton">REINTENTAR&nbsp; →</button>
            </div>
        </div>
    `;

    document.getElementById("retryPrintButton").addEventListener("click", () => {
        const retryTicket = {
            transactionId: "LR-" + Date.now().toString().slice(-8),
            date: new Date().toLocaleDateString("es-HN"),
            client: `${user.firstName} ${user.lastName}`,
            challenge: user.challenge,
            mindset: user.mindset,
            mindsets
        };

        showPrintingScreen(formatTicket(retryTicket));
    });
};

function showSuccessScreen() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="success-icon">✓</div>
            <div class="result-label">ADQUISICIÓN COMPLETADA</div>
            <p class="success-message">Tu ticket ha sido impreso.</p>
            <p class="reset-message">Preparando la siguiente experiencia...</p>
            ${sponsors()}
        </div>
    `;

    setTimeout(resetExperience, 5000);
}

function generateTicket() {
    const ticket = {
        transactionId: "LR-" + Date.now().toString().slice(-8),
        date: new Date().toLocaleDateString("es-HN"),
        client: `${user.firstName} ${user.lastName}`,
        challenge: user.challenge,
        mindset: user.mindset,
        mindsets
    };

    showPrintingScreen(formatTicket(ticket));
}

function formatTicket(ticket) {
    const WIDTH = 32;
    let output = "";

    // ----------------------------------------------------------
    // DATOS
    // ----------------------------------------------------------

    output += line(WIDTH) + "\n";

    output += "Cliente:\n";
    output += wrapText(ticket.client, WIDTH) + "\n";

    output += "Fecha: " + ticket.date + "\n";

    output += "Transacción:\n";
    output += wrapText(ticket.transactionId, WIDTH) + "\n";

    output += line(WIDTH) + "\n";

    // ----------------------------------------------------------
    // RETO / MENTALIDAD
    // ----------------------------------------------------------

    output += "Reto Principal:\n";
    output += wrapText(ticket.challenge, WIDTH) + "\n\n";

    output += "Mentalidad recomendada a reforzar:\n";
    output += wrapText(ticket.mindset, WIDTH) + "\n";

    output += line(WIDTH) + "\n";

    // ----------------------------------------------------------
    // LAS 7 MENTALIDADES
    // ----------------------------------------------------------

    output += centerText("LAS 7 MENTALIDADES", WIDTH) + "\n\n";

    ticket.mindsets.forEach(mindset => {
        const lines = wrapText(mindset, WIDTH - 4).split("\n");

        lines.forEach((text, index) => {
            // ASCII [X] para compatibilidad con la MHT-P11 / CP437.
            output += (index === 0 ? "[X] " : "    ") + text + "\n";
        });
    });

    // ----------------------------------------------------------
    // VALOR / ADQUISICION
    // ----------------------------------------------------------

    output += "\n";
    output += line(WIDTH) + "\n";

    output += "Valor Comercial: L. 0.00\n";
    output += "Adquisición: Compromiso\n";
    output += "Descuento: 100% Aplicación\n";
    output += "Total: L. 0.00\n";

    output += line(WIDTH) + "\n";

    // ----------------------------------------------------------
    // CIERRE
    // ----------------------------------------------------------

    output += centerText("Adquisición Aprobada", WIDTH) + "\n\n";

    output += "Valor Comercial:\n";
    output += "Incalculable\n\n";

    output += "Valor al aplicarlas:\n";
    output += "Transformador\n\n";

    output += "Estado: [X] Compra Exitosa\n";

    output += line(WIDTH) + "\n\n";

    // ----------------------------------------------------------
    // FRASE DEL EXPOSITOR
    // ----------------------------------------------------------

    output += centerText(EXPOSITOR_PHRASE, WIDTH) + "\n";
    output += "-Tarek Saker\n";

    output += "\n\n\n";

    return output;
}

function wrapText(text, maxLength) {
    const words = String(text).trim().split(/\s+/);
    const lines = [];
    let current = "";

    words.forEach(word => {
        // Break very long words so nothing is silently truncated.
        while (word.length > maxLength) {
            if (current.trim()) {
                lines.push(current.trim());
                current = "";
            }
            lines.push(word.slice(0, maxLength));
            word = word.slice(maxLength);
        }

        if (!word) return;

        const candidate = current ? `${current} ${word}` : word;
        if (candidate.length > maxLength) {
            if (current.trim()) lines.push(current.trim());
            current = word;
        } else {
            current = candidate;
        }
    });

    if (current.trim()) lines.push(current.trim());
    return lines.join("\n");
}

function centerText(text, width) {
    const wrapped = wrapText(text, width);
    return wrapped
        .split("\n")
        .map(line => {
            const spaces = Math.max(0, width - line.length);
            return " ".repeat(Math.floor(spaces / 2)) + line;
        })
        .join("\n");
}

function line(width) {
    return "-".repeat(width);
}

function resetExperience() {
    user.firstName = "";
    user.lastName = "";
    user.challenge = "";
    user.mindset = "";
    user.commitment = false;
    showWelcomeScreen();
}

showWelcomeScreen();
