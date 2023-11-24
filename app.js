/* Esercizio
Iniziamo a creare le API per il nostro blog. 
Iniziate con un nuovo progetto Express + Prisma.Potete utilizzare lo schema Prisma che avete creato nell’esercizio di ieri.
Definizione degli endpoint
Vi chiediamo di definire i seguenti endpoint:
POST / posts per creare un nuovo post.
GET / posts /:slug per recuperare un post utilizzando il suo slug.
GET / posts per recuperare tutti i post presenti nel database, con la possibilità di filtrare per:
    - Post pubblicati.
    - Post che contengono una determinata parola nel titolo o nel contenuto.

PUT / posts /:slug per aggiornare un post.
DELETE / posts /:slug per eliminare un post.

BONUS:
Implementare la paginazione.
Gestite gli errori, restituendo uno stato HTTP 404 e un messaggio di errore, nel caso in cui una rotta non sia stata trovata.
Gestite gli errori, restituendo uno stato HTTP 500 e un messaggio di errore, nel caso in cui venga sollevata un’eccezione dal Prisma Client. */

const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/posts");
const errorsHandler = require("./middlewares/errorsHandler");
const routeNotFound = require("./middlewares/routeNotFound");


const app = express();

dotenv.config();

app.use(express.json()); // Per parsing di JSON

// registro le rotte per i posts
app.use("/posts", postsRouter);

//errori
app.use(routeNotFound);

app.use(errorsHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
