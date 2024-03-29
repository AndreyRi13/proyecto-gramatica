class Grammar {
    constructor(variables, terminals, startSymbol, productions) {
        this.variables = variables;
        this.terminals = terminals;
        this.startSymbol = startSymbol;
        this.productions = productions;
    }

    getProductionsForPair(pair) {
        return this.productions.filter(([left, right]) => pair.includes(left) && pair.includes(right));
    }
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