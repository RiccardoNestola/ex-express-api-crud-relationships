const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createUniqueSlug = require("../functions/createUniqueSlug");

async function index(req, res) {

  const filters = req.query.filter;
  const queryFilter = {}

  const data = await prisma.post.findMany({
    where: queryFilter
  });

  return res.json(data);
}

async function show(req, res, next) {
  // const id = req.params.id;
  const { slug } = req.params;

  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!data) {
    next (new Error("Not found"));
  }

  return res.json(data);
}

async function store(req, res) {
  const datiInIngresso = req.body;
  console.log(datiInIngresso);

  if (!datiInIngresso || !datiInIngresso.title) {
    return res.status(400).send("Titolo del post mancante o dati di ingresso non validi");
  }


  const UniqueSlug = createUniqueSlug(datiInIngresso.title);

  try {
    const newPost = await prisma.post.create({
      data: {
        title: datiInIngresso.title,
        slug: UniqueSlug,
        image: datiInIngresso.image,
        content: datiInIngresso.content,
        published: datiInIngresso.published,
      }
    });

    return res.json(newPost);
  } catch (error) {
    return res.status(500).send("Errore durante la creazione del post");
  }
}

async function update(req, res) {
  const id = req.params.id;
  const datiInIngresso = req.body;

  // controllo se qul post esiste
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!post) {
    throw new Error('Not found');
  }

  const postAggiornato = await prisma.post.update({
    data: datiInIngresso,
    where: {
      id: parseInt(id),
    },
  })

  return res.json(postAggiornato)
}

async function destroy(req, res) {
  await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.json({ message: "Post eliminato" });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
};
