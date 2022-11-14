// Definiere moegliche Rechenoperationen
const OPERATIONS = ['add', 'subtract', 'multiply', 'divide', 'modulo'];

// Durchlaufe in einer Schleife die Operationen
OPERATIONS.forEach(operation => {
    // Hole anhand des Namen der Rechenoperation die Eingabefelder fuer die Operanden
    let operandInputs = [
        document.querySelector(`#${operation}-operand-1`),
        document.querySelector(`#${operation}-operand-2`),
    ];

    // Hole anhand des Namen der Rechenoperation das Eingabefeld fuer das Ergebnis
    let resultInput = document.querySelector(`#${operation}-result`);

    // Durchlaufe das Array der Operanden-Eingabefelder
    operandInputs.forEach(operandInput => {

        // Fuege jedem Eingabefeld ein EventListener fuer das Input-Event an
        operandInput.addEventListener('input', evt => {
            // Hole Werte aus den Eingabefelder und caste sie (wandle um) nach Number
            let operand1 = Number(operandInputs[0].value.trim());
            let operand2 = Number(operandInputs[1].value.trim());

            // Wenn beide Werte Zahlen sind
            if ( !isNaN(operand1) && !isNaN(operand2)) {
                // Schreibe in das Ergebnisfeld das errechnete Ergebnis
                resultInput.value = calculate(operand1, operand2, operation);
            }
        });
    });
});

// Hilfsfunktion zum Errechnen des Rechenergebnisses fuer jede moegliche Rechenoperation
function calculate(operand1, operand2, operation) {
    let result = 0;

    // Errechne Ergebnis abhaengig von uebergebener Rechenoperation
    switch (operation) {
        case 'add':
            result = operand1 + operand2;
            break;

        case 'subtract':
            result = operand1 - operand2;
            break;

        case 'multiply':
            result = operand1 * operand2;
            break;

        case 'divide':
            result = operand1 / operand2;
            break;

        case 'modulo':
            result = operand1 % operand2;
            break;

        default:
            result = 0;
    }

    // Gebe Rechenergebnis aus Rueckgabewert zurueck
    return result;
}