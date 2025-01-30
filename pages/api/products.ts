import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"; // Importando os tipos

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, description, kcal } = req.body;

    if (!name || !description || !kcal) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      const product = await prisma.product.create({
        data: { name, description, kcal: Number(kcal) },
      });
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar produto.", error });
    }
  } 

  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar produtos." });
    }
  }
  if (req.method === "PUT"){
    const {id, name, description, kcal} = req.body;

    if (!id || !name || !description || !kcal) {
      return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }
    try{
      const updatedProduct = await prisma.product.update({
        where: {id: Number(id)},
        data: {name, description, kcal: Number(kcal)},
      });
      return res.status(200).json(updatedProduct);
    }catch (error){
      return res.status(500).json({message: "Erro ao atualizar produto", error});
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "ID é obrigatório para deletar." });
    }
    try {
      await prisma.product.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: "Produto deletado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar produto.", error });
    }
  }
  return res.status(405).json({ message: "Método não permitido." });
}