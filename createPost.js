// Importiamo PrismaClient
const { PrismaClient } = require('@prisma/client');

// Creiamo un'istanza di PrismaClient
const prisma = new PrismaClient();

prisma.post.create({
    data:{
        title: 'Titolo del mio primo post',
        slug: 'titolo-del-mio-primo-post',
        content: 'Questo è il contenuto del mio primo post.',
        published: false,
    },
}).then((nuovoPost) => {
    console.log("Nuovo post creato: ", nuovoPost);
});