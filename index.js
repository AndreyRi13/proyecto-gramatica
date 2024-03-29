class Grammar {
    constructor(variables, terminals, startSymbol, productions) {
        this.variables = variables;
        this.terminals = terminals;
        this.startSymbol = startSymbol;
        this.productions = productions;
    }

    getProductionsForPair(pair) {
        return this.productions.filter(([left, right]) => right.split('').sort().join('') === pair.sort().join(''));
    }
}

function validate() {
    // Obtener los elementos del DOM
    const grammarElement = document.getElementById('grammar');
    const wordElement = document.getElementById('word');
    const resultElement = document.getElementById('result');

    // Comprobar si los elementos existen
    if (!grammarElement || !wordElement || !resultElement) {
        console.error('No se pudo encontrar uno o más elementos del DOM.');
        return;
    }

    // Obtener los valores de los elementos
    const grammarInput = grammarElement.value;
    const word = wordElement.value;

    // Parsear la gramática introducida en el campo de texto
    const grammar = parseGrammar(grammarInput);

    // Llamar a la función cyk para validar la palabra
    const result = cyk(grammar, word);

    // Mostrar el resultado
    resultElement.innerHTML = result ? 'La palabra es válida.' : 'La palabra no es válida.';
}

// Event listener para el botón de limpiar
document.getElementById('clearButton').addEventListener('click', function() {
    // Limpiar el contenido del campo de gramática, palabra y resultado
    document.getElementById('grammar').value = '';
    document.getElementById('word').value = '';
    document.getElementById('result').innerText = '';
});

function parseGrammar(grammarInput) {
    // Separar la entrada de la gramática en líneas
    const lines = grammarInput.trim().split('\n');

    // Crear arrays para almacenar las variables, los terminales y las producciones
    const variables = new Set();
    const terminals = new Set();
    const productions = [];

    // Procesar cada línea
    for (const line of lines) {
        const parts = line.trim().split('->');
        // Verificar si hay exactamente dos partes en la producción
        if (parts.length !== 2) {
            console.error('Formato de producción incorrecto:', line);
            return null; // Retornar null si la producción no es válida
        }

        const left = parts[0].trim();
        const right = parts[1].trim();

        // Añadir la variable a la lista de variables
        variables.add(left);

        // Añadir los terminales a la lista de terminales
        for (const char of right) {
            if (!variables.has(char)) {
                terminals.add(char);
            }
        }

        // Añadir la producción a la lista de producciones
        productions.push([left, right]);
    }

    // Verificar si el símbolo inicial está en las variables
    if (!variables.has('S')) {
        console.error('El símbolo inicial S no está en las variables.');
        return null; // Retornar null si el símbolo inicial no está en las variables
    }

    // Crear y retornar un objeto Grammar
    return new Grammar(Array.from(variables), Array.from(terminals), 'S', productions);
}

function cyk(grammar, word) {
    const n = word.length;
    const table = Array.from({ length: n }, () => Array(n).fill(new Set()));

    for (let i = 0; i < n; i++) {
        table[i][i] = new Set(grammar.productions.filter(([left, right]) => right === word[i]).map(([left]) => left));
    }

    for (let length = 2; length <= n; length++) {
        for (let i = 0; i <= n - length; i++) {
            const j = i + length - 1;
            for (let k = i; k <= j - 1; k++) {
                const pairs = cartesianProduct(Array.from(table[i][k]), Array.from(table[k + 1][j]));
                const newVariables = pairs.flatMap(pair => grammar.getProductionsForPair(pair).map(([left]) => left));
                table[i][j] = new Set([...table[i][j], ...newVariables]);
            }
        }
    }

    return table[0][n - 1].has(grammar.startSymbol);
}

function cartesianProduct(setA, setB) {
    const product = [];
    for (const a of setA) {
        for (const b of setB) {
            product.push([a, b]);
        }
    }
    return product;
}