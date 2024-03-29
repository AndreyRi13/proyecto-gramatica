class Grammar {
    constructor(variables, terminals, startSymbol, productions) {
        this.variables = variables;
        this.terminals = terminals;
        this.startSymbol = startSymbol;
        this.productions = productions;
    }

    getProductionsForPair(pair) {
        return this.productions.filter(([left, right]) => {
            if (right.length === 2 && right[0] === pair[0] && right[1] === pair[1]) {
                return true;
            }
            return false;
        });
    }
    
}

function validate() {
    const grammarElement = document.getElementById('grammar');
    const wordElement = document.getElementById('word');
    const resultElement = document.getElementById('result');

    if (!grammarElement || !wordElement || !resultElement) {
        console.error('No se pudo encontrar uno o más elementos del DOM.');
        return;
    }

    const grammarInput = grammarElement.value;
    const word = wordElement.value;

    const grammar = parseGrammar(grammarInput);

    const result = cyk(grammar, word);

    resultElement.innerHTML = result ? 'La palabra es válida.' : 'La palabra no es válida.';
}

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('grammar').value = '';
    document.getElementById('word').value = '';
    document.getElementById('result').innerText = '';
});

function parseGrammar(grammarInput) {
    const lines = grammarInput.trim().split('\n');

    const variables = new Set();
    const terminals = new Set();
    const productions = [];

    for (const line of lines) {
        const parts = line.trim().split('->');
        if (parts.length !== 2) {
            console.error('Formato de producción incorrecto:', line);
            return null;
        }

        const left = parts[0].trim();
        const right = parts[1].trim();

        variables.add(left);

        for (const char of right) {
            if (!variables.has(char)) {
                terminals.add(char);
            }
        }

        productions.push([left, right]);
    }

    const startSymbol = productions[0][0];

    if (!variables.has(startSymbol)) {
        console.error('El símbolo inicial no está en las variables.');
        return null;
    }

    return new Grammar(Array.from(variables), Array.from(terminals), startSymbol, productions);
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