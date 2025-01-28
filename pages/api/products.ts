import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"; // Importando os tipos

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, kcal } = req.body;

    if (!name || !description || !kcal) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      const product = await prisma.product.create({
        data: { name, description, kcal: Number(kcal) },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar produto.", error });
    }
  } else {
    res.status(405).json({ message: "Método não permitido." });
  }
}
