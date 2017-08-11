# **URL Shortener design**

#### El sistema constará de una API:

**Peticiones PUT**:

Para crear un alias se tendrán que especificar a que dirección URL se va a querer redirigir y cual va a ser su alias.

La API verificará consultando en la base de datos que el alias elegido no exista antes de crearlo.

En caso de que no exista guardará los datos en una tabla, agregándole la fecha de creación y un **código** random que será requerido a la hora de eliminar/actualizar el alias.

El **código** será devuelto en la respuesta de la API en formato JSON. Así como la información de error en caso de no haberse podido crear el alias.

Los campos en la tabla podrían ser:

short_url | url | creation_date | secret
-|-|-|-


En donde **short_url** es el alias, y es un identificador único.

Para actualizar un alias se tendrá que especificar además en el request el **código** devuelto al momento de creación. Si el alias existe y el **código** es correcto, entonces se actualizan los datos.

**Peticiones DELETE:**:

Para eliminar un alias se requerirá la short url y el código devuelto al momento de creación.

Cuando se haga una **Petición GET** con el formato de **short_url** la url será analizada.
 Se hará una consulta a la base de datos para verificar si existe esa  **short_url** .
 En el caso de que exista se redireccionará a la **url** asociada.
 En el caso de que no exista se contestará con un **Error 404**.

 Los registros que tengan más de 6 meses de antiguedad serán eliminados mediante un **Scheduled Event** que se correrá cronológicamente en la base de datos.


 *- En caso de ser necesario también se pueden habilitar peticiones de búsqueda.*
