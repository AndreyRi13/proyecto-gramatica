# Proyecto Gramática

Este proyecto implementa un algoritmo para validar si una palabra puede ser generada por una gramática dada.

## index.js

El archivo `index.js` es el punto de entrada de nuestro proyecto. Aquí es donde se implementa el algoritmo principal.

El algoritmo funciona de la siguiente manera:

1. Se define una gramática con variables, terminales, un símbolo de inicio y producciones.
2. Se utiliza la función `getProductionsForPair` para obtener todas las producciones que pueden generar un par de variables.
3. Se utiliza la función `cyk` para implementar el algoritmo CYK. Esta función crea una tabla 2D y la llena con conjuntos de variables que pueden generar subcadenas de la palabra de entrada.
4. La función `cartesianProduct` se utiliza para obtener todos los pares posibles de conjuntos de variables.

Por favor, revisa el código en `index.js` para más detalles.

## Algoritmo CYK

El algoritmo CYK (Cocke–Younger–Kasami) es un algoritmo de análisis de gramáticas libres de contexto. Se utiliza para determinar si una cadena puede ser generada por una gramática dada.

El algoritmo funciona de la siguiente manera:

1. Inicialización: Se crea una tabla 2D, donde cada celda (i, j) representa el conjunto de variables que pueden generar la subcadena desde el i-ésimo hasta el j-ésimo carácter de la cadena de entrada.

2. Llenado de la tabla: Se llena la tabla de abajo hacia arriba y de izquierda a derecha. Para cada celda (i, j), se consideran todas las posibles formas de dividir la subcadena correspondiente en dos partes. Para cada división, se buscan las variables que pueden generar las dos partes y se añaden a la celda.

3. Comprobación final: Una vez que la tabla está completa, se comprueba si el símbolo de inicio de la gramática está en la celda que representa la cadena de entrada completa. Si es así, la cadena puede ser generada por la gramática.

En nuestro archivo `index.js`, la función `cyk` implementa este algoritmo. Utiliza la función `getProductionsForPair` para buscar las producciones que pueden generar un par de variables, y la función `cartesianProduct` para obtener todos los pares posibles de conjuntos de variables.