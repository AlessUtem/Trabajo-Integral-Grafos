La empresa “D” se encarga de transportar productos desde distintos centros de distribución hacia los negocios
o puntos de venta ubicados en toda la ciudad.
Muy temprano cada día, la flota de camiones se dirige desde las instalaciones de la empresa D al centro de
distribución que se le asigna para ese día a cada camión (un camión recibe un solo centro de distribución
diario). En cada centro de distribución, el camión es cargado con la mercadería de productos a distribuir según
los distintos puntos de venta en la ciudad (denominada hoja de ruta); dicha hoja de ruta incluye los puntos de
venta en los cuales debe dejar productos y en el orden que debe dejarlos.
Al finalizar la entrega en el último punto de venta, el camión se dirige nuevamente a las instalaciones de la
empresa D, para finalizar el turno del día donde el camión se estaciona y guarda hasta el día siguiente.
Se pide desarrollar un software que construya la hoja de ruta de manera eficiente, minimizando las distancias
totales (km) recorridos por todos los camiones diariamente. Para lo anterior, el software debe cargarse con
las coordenadas GPS de los distintos centros de distribución y puntos de venta. Luego al ejecutar el programa,
se debe pedir el centro de distribución asignado para cada camión (cantidad de camiones es variable). 



La cantidad de productos a repartir desde cada centro de distribución a cada punto de venta debe ser ingresada
mediante un archivo según e describe más adelante.
Supuestos y/o consideraciones
• Las coordenadas GPS se deberán usar, por facilidad, como coordenadas X,Y enteras (positivas y/o
negativas).
• Trabaje la precisión (distancias, por ejemplo) de cálculos con mínimo 5 decimales.
• Las coordenadas GPS deben ser cargadas en un archivo de parámetros, según especificación indicada
más adelante.
• La cantidad de centros de distribución y puntos de venta es variable (según cantidad de coordenadas
ingresadas en archivo de parámetros). El punto de estacionamiento de los camiones de la empresa
es siempre uno y su ubicación es en la coordenada “0,0”.
• La capacidad máxima de productos por camión es 1000. Un camión no puede transportar
“fracciones” de productos, mientras que un punto de venta puede ser abastecido diariamente sólo
por un camión (es decir, los camiones no pueden hacer despachos “a medias). No obstante, un
camión puede abastecer varios puntos de venta (siempre cuando sean pedidos “completos”).
• En este trabajo, se puede utilizar bases de datos relacionales si se encuentra necesario. Dichos
motores pueden ser MySQL (Maria DB) 10.1 y/o MS SQL server 2008 R2 y/o PostgreSQL 11.2.
• El archivo de parámetros debe ser texto plano (un único archivo) donde cada línea es una ubicación
o coordenada con la siguiente estructura: “T;N;X,Y” donde “T” puede ser “P” o “C” para indicar si es
un punto de venta o un centro de distribución respectivamente. “N” es un identificador numérico
entero de cada ubicación. “X” e “Y” son las coordenadas X e Y donde está ubicado el centro, ingresada
con valores enteros separados por “,” (coma). Note que el tipo de ubicación, el identificador del
mismo y la coordenada X,Y están separadas entre sí por un “;” (punto y coma). No hay espacios entre
los valores.
• Para ejecutar el programa, el usuario debe ingresar “las demandas de productos del día”, esto es
básicamente: La cantidad de productos demandada por cada punto de venta, que centros de
distribución alimentarán cuales puntos de venta. Esta información debe cargarse al iniciar el
programa (abrir la página web), mediante un archivo planto con la siguiente estructura: “C;P;N”
dónde “C” es el centro de distribución, “P” es el punto de venta y “N” es la cantidad de productos a
repartir desde dicho centro “C” al punto “P”. Note que los valores se separan por un “;” (punto y
coma), no habiendo espacios entre los valores. Los valores de “C” y “P” se basan en la información
cargada en el archivo de parámetros.
Un ejemplo del archivo de parámetros sería el siguiente:

P;1;10,6
P;2;-5,66
P;3;-1,-96
P;4;60,13
C;1;-2,77
C;2;5,48

https://github.com/AlessUtem/Trabajo-Integral-Grafos

Grupo 4

Integrantes:
Mauricio Bastian Bustos Miranda
Mauricio Andres Estrada Figueroa
Cristian Alejandro Montecinos Fuenzalida
Alessandro Javier Robles Farias
Rodrigo Arturo Vasquez Rebolledo
