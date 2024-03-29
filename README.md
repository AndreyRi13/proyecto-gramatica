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