const user = {
    firstName: "",
    lastName: "",
    challenge: "",
    mindset: "",
    commitment: false
};

const challenges = [
    { challenge: "VENTAS BAJAS PRUEBA DE CAMBIO", mindset: "OPTIMISMO" },
    { challenge: "COMPETENCIA", mindset: "MENTALIDAD COMPETITIVA" },
    { challenge: "DUDA", mindset: "CONFIANZA" },
    { challenge: "RECHAZO", mindset: "PERSISTENCIA" },
    { challenge: "CAMBIO", mindset: "FLEXIBILIDAD Y ADAPTABILIDAD" },
    { challenge: "DESORDEN", mindset: "SISTEMATIZACIÓN Y EFICIENCIA" },
    { challenge: "ESTANCAMIENTO", mindset: "SED DE CONOCIMIENTO Y AMOR POR ENSEÑAR" }
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

const EXPOSITOR_PHRASE = "Gracias por adquirir tu compromiso.";
const screen = document.getElementById("screen");

function brand() {
    return `
        <div class="brand-lockup">
            <span class="brand-mark">7</span>
            <span>CRECE</span>
        </div>
    `;
}

function sponsors() {
    return `
        <div class="bottom-sponsors">
            <span class="sponsor-placeholder">ROBLE</span>
            <span class="sponsor-placeholder">MULTIPLAZA</span>
            <span class="sponsor-placeholder">METROMALL</span>
        </div>
    `;
}

function showWelcomeScreen() {
    screen.innerHTML = `
        <div class="screen-content">
            ${brand()}
            <div class="eyebrow">CONFERENCIA 2026</div>
            <h1 class="hero-title">LAS <span class="seven">7</span><br>MENTALIDADES</h1>
            <div class="hero-subtitle">DEL LÍDER RETAIL</div>
            <p class="hero-copy">
                Ideas prácticas para liderar, conectar y crear
                experiencias que dejan huella.
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
            <div class="eyebrow">TU DESAFÍO</div>
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
                ¿TE COMPROMETES A DESARROLLAR<br>LAS 7 MENTALIDADES?
            </p>
            <button class="cta" id="commitmentButton">SÍ, ME COMPROMETO&nbsp; →</button>
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
            <div class="result-label">MENTALIDAD IDENTIFICADA</div>
            <h1 class="mindset-result">${user.mindset}</h1>
            <p class="result-description">
                Esta es la mentalidad que puede ayudarte a enfrentar tu principal desafío.
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

    output += centerText("CRECE", WIDTH) + "\n";
    output += centerText("LAS 7 MENTALIDADES", WIDTH) + "\n";
    output += line(WIDTH) + "\n";
    output += centerText("TICKET DE ADQUISICION", WIDTH) + "\n\n";

    output += "CLIENTE:\n";
    output += wrapText(ticket.client, WIDTH) + "\n\n";
    output += "FECHA: " + ticket.date + "\n";
    output += "TRANSACCION:\n";
    output += ticket.transactionId + "\n";
    output += line(WIDTH) + "\n";

    output += "RETO PRINCIPAL:\n";
    output += wrapText(ticket.challenge, WIDTH) + "\n\n";

    output += "MENTALIDAD RECOMENDADA:\n";
    output += wrapText(ticket.mindset, WIDTH) + "\n";
    output += line(WIDTH) + "\n";

    output += centerText("LAS 7 MENTALIDADES", WIDTH) + "\n\n";

    ticket.mindsets.forEach(mindset => {
        const lines = wrapText(mindset, WIDTH - 4).split("\n");
        lines.forEach((text, index) => {
            output += (index === 0 ? "[✓] " : "    ") + text + "\n";
        });
    });

    output += "\n" + line(WIDTH) + "\n";
    output += "VALOR COMERCIAL:       L. 0.00\n";
    output += "ADQUISICION:           COMPROMISO\n";
    output += "DESCUENTO:             EXPERIENCIA\n";
    output += "TOTAL:                 L. 0.00\n";
    output += line(WIDTH) + "\n";

    output += centerText("ADQUISICION APROBADA", WIDTH) + "\n\n";
    output += "VALOR COMERCIAL:\nINCALCULABLE\n\n";
    output += "VALOR AL APLICARLAS:\nTRANSFORMADOR\n\n";
    output += "ESTADO: [✓] COMPRA EXITOSA\n";
    output += line(WIDTH) + "\n\n";

    output += centerText(EXPOSITOR_PHRASE, WIDTH) + "\n";
    output += centerText("- EXPOSITOR -", WIDTH) + "\n\n\n";

    return output;
}

function wrapText(text, maxLength) {
    const words = String(text).split(" ");
    const lines = [];
    let current = "";

    words.forEach(word => {
        if ((current + word).length > maxLength) {
            if (current.trim()) lines.push(current.trim());
            current = word + " ";
        } else {
            current += word + " ";
        }
    });

    if (current.trim()) lines.push(current.trim());
    return lines.join("\n");
}

function centerText(text, width) {
    if (text.length >= width) return text.substring(0, width);
    const spaces = width - text.length;
    return " ".repeat(Math.floor(spaces / 2)) + text;
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
