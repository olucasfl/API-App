import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

//Rota para envir usuários POST
app.post('/users', async (req, res) => {
   await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })
    res.status(201).json(req.body);
});

//Rota para retornar todos os usuários GET
app.get('/', async (req, res) => {

    let users = [];

    if(req.query) {
        	users = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
});


//Rota para editar um usuário PUT
app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      }
    });

    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

//Rota para deletar um usuário DELETE
app.delete('/users/:id', async (req, res) => {

    try {
        const user = await prisma.user.delete({
            where: { id: req.params.id }
        });

        res.status(200).json({ message: "Usuário deletado com sucesso", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});

//Rota do server na porta 3000
app.listen(3000, () => {
    console.log('http://34.151.218.111:3000');
});