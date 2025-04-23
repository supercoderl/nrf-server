import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCards = async (req, res) => {
    const cards = await prisma.card.findMany({ where: { userId: req.user.userId } });
    res.json(cards);
};

export const createCard = async (req, res) => {
    const { tokenizedData } = req.body;
    const card = await prisma.card.create({
        data: { tokenizedData, userId: req.user.userId },
    });
    res.status(201).json(card);
};

export const deleteCard = async (req, res) => {
    const { id } = req.params;
    await prisma.card.delete({ where: { id: Number(id) } });
    res.status(204).send();
};