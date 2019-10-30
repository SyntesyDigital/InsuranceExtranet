# InsuranceExtranet

> Documentación sobre los puntos importantes de la configuración.

## Tabla de contenidos
* [Elementos](#elementos)
* [Modelos](#modelos)
* [Campos](#campos)
* [Procedures](#procedures)
* [Objetos](#objetos)
* [Servicios](#servicios)


## Elementos
Add more general information about project. What the purpose of the project is? Motivation?

## Modelos 
Bobys configurados a partir de VEOS que indican los medelos disponibles para ser configurados. 
Es utilizado para definir las Tablas, las Fichas y los Formularios.

WS_EXT2_DEF_MODELES

```json
{
    "ID": "TBVEHPOL",
    "FORMAT": "TB",
    "TITRE": "Véhicules de la police",
    "COMMENTAIRE": "Liste des véhicules de la police",
    "WS": "WS_EXT2_VEH",
    "WS_FORMAT": "STANDARD",
    "FILTRES": "id_npol=!",
    "ICONE": "fas fa-car",
    "EXEMPLE": "WS_EXT2_VEH?id_npol=11000040",
    "DEF1": null,
    "DEF2": null
}
```

Definición de campos : 
- ID : identificador
- FORMAT : TB indica Tabla, FC indica Ficha, CR indica Formulario
- TITRE : Título
- COMMENTARIO : Comentario
- WS : Boby vinculado a este modelo.
- WS_FORMAT : Por ahora no se usa
- FILTRES : Indica parametros obligatorios. Son parseados y añadidos como parametros obligatorios del elemento.
- ICONE : Icono vinculado
- EXEMPLE : Ejemplo de uso. Se usan estos valores para llenar los previews de las paginas.
- DEF1 : Indica un parametro por defecto. Ejemplo : pol_cd_pos_lib=EN COURS.


## Campos 

Campo vinculado al Modelo, define el conjunto de campos disponibles.
Es usado para las fichas y tablas. Los formularios usan otro proceso con los Procedures.

```json
{
    "WS": "WS_EXT2_ASS",
    "REF": "ass.adresse1_adr",
    "DEF": "lib:adresse 1, format:texte,tooltip:"
}
```


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
- VIS : Indica si es visible o no.
- CONF : Indica si es configurable. Si es así aparece en la lista de campos configurables.
- ACTIF : Indica si esta activo ( por ahora no usado )
- EXEMPE : Indica un ejemplo de valor
- P1 : Parametors auxiliares por ahora no usados
- P2 : 


#### Uso del campo ( NATURE ) : 
- CTE : Constante. Se susitituye directamente por el valor definido en VALEUR
- SYSTEM : Se sustituye directamente con una variable del Systema. 
- INPUT : Campo a introducir por el usuario. Son los campos que se añaden como configurables en el elemento.

Tipos de campo SYSTEM : 
- _time : Devuelve la fecha de ahora con formato DD/MM/YYYY
- _timestamp : Devuelve la fecha de ahora con formato timestamp. Se usa como identificador.
- _id_per_user : Se sustituye por el id_per del usuario conectado
- _contentType : Indica el tipo de contenido del array de valores actual. 

#### Tipos de campo ( FORMAT ): 

- texte : 
Campo de tipo texto. 
Formatos : ...
Configuración : ...

- num : 
- date : 
- select : 
- doc : 
- richtext : 
- list : Lista de elementos. Ejemplo lista de documentos.


Los diferentes tipos de campos estan configurados en el archivo : 
Modules/Extranet/Config/models.php
Explicado más adelante.



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


## Servicios

Se vinculan con los procedures y los objetos, e indican el metodo al que hacer submit los formularios.

WS_EXT2_DEF_SERVICES

```
{
    "ID": "SINISTREPUT",
    "SERVICE": "sinistre",
    "METHODE": "PUT",
    "URL": "sinistre",
    "REPONSE": "id",
    "COMMENTAIRE": "modification sinistre",
    "P1": null,
    "P2": null
}
```

- ID : Identificador
- SERVICE : Nombre del servicio
- METHODE : Tipo de metodo que se aplica ( explicado a continuación ) 
- URL : Url para aplicar el metodo. Puede contener parametros. Ejemplo : "URL": "contrat/_id_pol/pmq",
Estos parametros so añadidos como variables necesarias del formulario. Si no estan en la url se dispara la modal.
- REPONSE : Indica si hay que procesar la respusta. Ejemplo : "REPONSE": "_id_sin=id", 
Procesa como variable de formulario :id_sin con el resultado id de la respuesta
- COMMENTAIRE : Descripción
- P1, P2 : Parametros auxiliaries no usados por ahora.


#### Tipos de METHODE

- GET : Se hace un get para devolver una información  concreta.
- POST : Post de json para la creación de una nueva entidad.
- PUT : Put para la modificación, incluye un GET previamente con la misma url
- PUT_2 : Put par la modificación SIN el GET, en este caso no es necesario.




## Configuración parámetros de paginas obligatorios

Para los formularios ha parecido la necesidad de pedir modales en la creación de los formularios. 
Estos parametros aparecen como necesarios al recorrer los diferentes campos de un formulario. 
Estas variables se definen en el siguiente Boby : 

WS_EXT2_DEF_PARAMPAGES

```json
{
    "PARAM": "id_per_ass",
    "LIB": "Assuré",
    "MESSAGE": "Veuillez préciser l'assuré",
    "BOBY": "WS_EXT2_SEL_IDPERASS",
    "BOBYPAR": null,
    "P1": "1",
    "P2": null
}
```

- PARAM : parametro utilizado en el GET
- LIB : Etiqueta 
- MESSAGE : Mensaje mostrado en la modal
- BOBY : WS que se usa para llenar el selector de la modal
- BOBYPAR : Indica un parametro necesario normalmente obtenido en una modal anterior.
- P1 : Se usa para indicar el orden dado que hay interdependencias entre modales
- P2 : Si tiene "filtre" Se usa para indicar que es un filtro. Los filtros son usados en los widgets en condicionales.
En función del parametro del filtro el widget se muestra o no.



## Tablas

## Fichas

## Formularios

Los formularios estan vinculados a parametros obligatorios o opcionales. 
Para recorrer los parametros necesarios : 

Para obtener la información de un formulario se usa la API : 
/architect/elements/procedures/[id_elemento]

Lolizado en el archivo :
Modules/Extranet/Http/Controllers/ElementController.php
Función : getFormProcedures()

Este devuelve el conjunto de etapas y extrae la información necesaria.

Ejemplo extraido de creación de Siniestro: 
architect/elements/procedures/CRSIN

```json
{
	"success": true,
	"data": {
		"procedures": [{
			"ID": "1000",
			"MODELE": "CRSIN",
			"OBJID": "SIN01",
			"ETAP": "100",
			"LIB": "Description",
			"REP": "N",
			"CONF": "Y",
			"OBL": "Y",
			"P1": null,
			"P2": null,
			"P3": null,
			"OBJECTS": [{
				"ID": "1009",
				"SERV_ID": "SINISTREPOST",
				"OBJ_ID": "SIN01",
				"OBJ_JSONP": "$.",
				"CHAMP": "causeCirconstance",
				"LIB": "Cause circonstance",
				"NATURE": "INPUT",
				"FORMAT": "texte",
				"OBL": "N",
				"VALEUR": null,
				"BOBY": null,
				"VIS": "Y",
				"CONF": "Y",
				"CONT": null,
				"COM": null,
				"ACTIF": "Y",
				"EXEMPLE": "CAUSES",
				"P1": null,
				"P2": null
			}, {
				"ID": "1072",
				"SERV_ID": "SINISTREPOST",
				"OBJ_ID": "SIN01",
				"OBJ_JSONP": "$.",
				"CHAMP": "typeElem",
				"LIB": "type element",
				"NATURE": "CTE",
				"FORMAT": "texte",
				"OBL": "Y",
				"VALEUR": "LOTLOYERIMP",
				"BOBY": null,
				"VIS": "N",
				"CONF": "N",
				"CONT": null,
				"COM": null,
				"ACTIF": "Y",
				"EXEMPLE": "LOTLOYERIMP",
				"P1": null,
				"P2": null
			}],
			"SERVICE": {
				"ID": "SINISTREPOST",
				"SERVICE": "sinistre",
				"METHODE": "POST",
				"URL": "sinistre",
				"REPONSE": "_id_sin=id",
				"COMMENTAIRE": "cr\u00e9ation sinistre",
				"P1": null,
				"P2": null
			},
			"JSONP": "$.",
			"PARAMS": {
				"_time": true,
				"_id_pol": true,
				"_timestamp": true
			}
		}, {
			"ID": "1001",
			"MODELE": "CRSIN",
			"OBJID": "SIN02",
			"ETAP": "101",
			"LIB": "Assur\u00e9",
			"REP": "N",
			"CONF": "Y",
			"OBL": "Y",
			"P1": null,
			"P2": null,
			"P3": null,
			"OBJECTS": [{
				"ID": "1017",
				"SERV_ID": "SINISTREPOST",
				"OBJ_ID": "SIN02",
				"OBJ_JSONP": "$.listPer[]",
				"CHAMP": "categ",
				"LIB": "categ assur\u00e9",
				"NATURE": "CTE",
				"FORMAT": "texte",
				"OBL": "Y",
				"VALEUR": "ASSURE",
				"BOBY": null,
				"VIS": "N",
				"CONF": "N",
				"CONT": null,
				"COM": null,
				"ACTIF": "Y",
				"EXEMPLE": "ASSURE",
				"P1": null,
				"P2": null
			}],
			"SERVICE": {
				"ID": "DOCUMENTPOST",
				"SERVICE": "document",
				"METHODE": "POST",
				"URL": "document\/v2",
				"REPONSE": "id",
				"COMMENTAIRE": "upload document",
				"P1": null,
				"P2": null
			},
			"JSONP": "$.[]",
			"PARAMS": {
				"_contentType": true,
				"_time": true,
				"_id_sin": true,
				"_namedoc": true
			}
		}],
		"variables": {
			"id_per_ass": {
				"PARAM": "id_per_ass",
				"LIB": "Assur\u00e9",
				"MESSAGE": "Veuillez pr\u00e9ciser l'assur\u00e9",
				"BOBY": "WS_EXT2_SEL_IDPERASS",
				"BOBYPAR": null,
				"P1": "1",
				"P2": null
			},
			"id_pol": {
				"PARAM": "id_pol",
				"LIB": "Police",
				"MESSAGE": "Veuillez pr\u00e9ciser la police",
				"BOBY": "WS_EXT2_SEL_IDPOL",
				"BOBYPAR": "id_per_ass",
				"P1": "2",
				"P2": null
			}
		}
	}
}
```


- Lista de Procedures : Es el contendor principal. Cada procedure es iterado de manera ordenada.
>- OBJECTS : Conjunto de objetos contenidos en cada procedure para construir el json. Configurables y no configurables.
>- SERVICE : Información del Service a aplicar una vez procesado esta etapa.
>- JSONP : JSON path al que aplica rel json resultante de este procedure.
>- PARAMS : Parametros necesarios vinculados con esta etapa de typo System. Seran llenadas con las variables del form, o con funcionalidades de tipo system.
- Variables : Conjunto de variables globales necesarias para iniciar este formulario.


### Como saber las variables necesarias 

Esta información se obtiene recorriendo todo el json anterior y siguiendo estas condiciones : 

Para todas las variables disponibles ($allVariables) que provienen del boby WS_EXT2_DEF_PARAMPAGES y explicado anteriormente.

- si la variable esta dentro de las system var ( objeto con NATURE = SYSTEM ). Ejemplo :

```
{
            "ID": "1003",
            "SERV_ID": "SINISTREPOST",
            "OBJ_ID": "SIN01",
            "OBJ_JSONP": "$.",
            "CHAMP": "idPol",
            "LIB": "Id mvt police",
            "NATURE": "SYSTEM",
            "FORMAT": "num",
            "OBL": "Y",
            "VALEUR": "_id_pol",
            "BOBY": "WS_EXT2_SEL_IDPOL",
            "VIS": "Y",
            "CONF": "Y",
            "CONT": null,
            "COM": null,
            "ACTIF": "Y",
            "EXEMPLE": "11000082",
            "P1": null,
            "P2": null
        }
```

- si la variable existe en la url del service. Ejemplo 

```
{
    "ID": "LOTPUT",
    "SERVICE": "lots",
    "METHODE": "PUT",
    "URL": "flotte/immo/lots/_id_lot",
    "REPONSE": "num",
    "COMMENTAIRE": "résiliation d'un lot",
    "P1": null,
    "P2": null
}
```

- Si la variable existe en BOBY de un objeto : Ejemplo : 
```
{
    "ID": "1008",
    "SERV_ID": "SINISTREPOST",
    "OBJ_ID": "SIN01",
    "OBJ_JSONP": "$.",
    "CHAMP": "circonstance",
    "LIB": "Circonstance",
    "NATURE": "INPUT",
    "FORMAT": "texte",
    "OBL": "Y",
    "VALEUR": null,
    "BOBY": "WS_EXT2_SEL_CIRCONST?id_pol=_id_pol",
    "VIS": "Y",
    "CONF": "Y",
    "CONT": null,
    "COM": null,
    "ACTIF": "Y",
    "EXEMPLE": "STD6",
    "P1": null,
    "P2": null
}
```


En cualquier de estos casos se considera variable necesaria para que el form funcione.
Si esta variable no esta en la url de la página que incluye el widget, se pedira una modal siguiendo la información 
especificada en el Boby WS_EXT2_DEF_PARAMPAGES



## Tipos de campos

## Widgets 
Explicar los diferentes tipos de configuración que existen y como funcionan.

## Parametros
Hay varias maneras de asignar parametros anotar las dierentes formas.

## Configuración de tipos de campo
Archivo de configuración que vincula los objetos de los modelos con la configuración de los elementos.
Modules/Extranet/Config/models.php

Su estructura es la siguiente : 
```
'text' => [
    'mapping' => 'texte',
    'identifier' => 'text',
    'label' => 'Text',
    'icon' => 'fa fa-font',
    'formats' => [
      'email',
      'telephone'
    ],
    'rules' => [
      'required',
      'minCharacters',
      'maxCharacters',
      'searchable',
      'sortable',
      'sortableByDefault'
    ],
    'settings' => [
      'format',
      'maxLength',
      'hasRoute'
    ]
  ]
```

## Usuarios 

Definir los permisos y como se configuran.
También puede ser interesante como definirlo en las rutas y los helpers que existen.

WS_EXT2_DEF_PAGES

Configuración del menu

WS_EXT2_SESSIONS

Uso de las sesiones y como se añade de manera automatica en los WS

También explicar la renovación de la sesión.


