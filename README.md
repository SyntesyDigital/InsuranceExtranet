# InsuranceExtranet

> Documentación sobre los puntos importantes de la configuración.

## Table of contents
* [Elementos](#elementos)
* [Procedures](#procedures)
* [Objetos](#objetos)

## Elementos
Add more general information about project. What the purpose of the project is? Motivation?



## Procedures
WS_EXT2_DEF_PROCEDURES

```json
{
    "ID": "1002",
    "MODELE": "CRSIN",
    "OBJID": "SIN03",
    "ETAP": "102",
    "LIB": "User",
    "REP": "N",
    "CONF": "N",
    "OBL": "Y",
    "P1": null,
    "P2": null,
    "P3": null
}
```
Definición de campos : 
- ID : Identificador
- MODELE : Modelo al que pertenece
- OBJID : Vinculo entre el procedure y los objetos
- ETAP : Orden necseario para saber la etapa del proceso
- LIB : 
- REP : Indica si se repeite o no
- CONF : Indica si es configurable o no
- OBL : Indica si es obligatorio o no
- P1 : Parametros auxiliares por ahora no usados
- P2 : 
- P3 : 

"Explicar el algoritmo para el proceso de los formularios."

## Objetos

Se usan vinculados a los procedures. Definen el diferente tipos de campos que se usan para poder configurar los formularios.
Es el elemento más complejo del modulo.
Los objetos son recorridos uno por uno construyendo un json resultante. Este json es el que se utiliza para procesar el servicio.

WS_EXT2_DEF_OBJETS

```json
{
    "ID": "1031",
    "SERV_ID": "DOCUMENTPOST",
    "OBJ_ID": "DOC01",
    "OBJ_JSONP": "$.",
    "CHAMP": "confid",
    "LIB": "Confidentiel",
    "NATURE": "CTE",
    "FORMAT": "texte",
    "OBL": "Y",
    "VALEUR": "0",
    "BOBY": null,
    "VIS": "N",
    "CONF": "N",
    "CONT": null,
    "COM": null,
    "ACTIF": "Y",
    "EXEMPLE": "0",
    "P1": null,
    "P2": null
}
```

Definición de campos : 
- ID : Identificador
- SERV_ID : Service al que pertenece
- OBJ_ID : Vinculo entre el objeto y el Procedure
- OBJ_JSONP : Origen del json al que añadir el campo. 
- LIB : Etiqueta 
- NATURE : Uso del campo. Más explicado a continuación.
- FORMAT : Tipo del campo. Más explicado a continuación
- OBL : Indica si es obligatorio.
- VALEUR : Valor por defecto
- BOBY : Si esta vinculado con un Boby. Se usa por selectores


#### Uso del campo ( NATURE ) : 
- CTE : Constante. Se susitituye directamente por el valor definido en VALEUR
- SYSTEM : Se sustituye directamente con una variable del Systema. 

#### Tipos de campo ( FORMAT ): 

#### Uso del Boby : 
El boby puede ser indicado directamente
```
"BOBY": "WS_EXT2_SEL_LOTUSAGE"
```
O con parametros : 
```
"BOBY": "WS_EXT2_SEL_CIRCONST?id_pol=_id_pol"
```
En caso de que se usen parametros. Este sera añadido como parametro necesario el formulario.






## Tablas

## Fichas

## Formularios

## Tipos de campos

## Widgets 
Explicar los diferentes tipos de configuración que existen y como funcionan.

## Parametros
Hay varias maneras de asignar parametros anotar las dierentes formas.
