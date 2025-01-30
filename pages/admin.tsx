import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    description: string;
    kcal: number;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
    fetchProducts();}, []);

    async function fetchProducts() {
        try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        } catch (error) {
        alert("Erro ao buscar produtos.");
        }
    }

    async function handleDelete(id: number) {
        if (confirm("Tem certeza que deseja deletar este produto?")) {
            try {
                await axios.delete("/api/products", { data: { id } });
                fetchProducts();
            } catch (error) {
                alert("Erro ao deletar produto.");
            }
        }
    }

    async function handleUpdate(event: React.FormEvent) {
        event.preventDefault();
        if (editingProduct) {
            try {
                await axios.put("/api/products", {
                id: editingProduct.id,
                name: editingProduct.name,
                description: editingProduct.description,
                kcal: editingProduct.kcal,
                });
                setEditingProduct(null);
                fetchProducts();
            } catch (error) {
                alert("Erro ao editar produto.");
            }
        }
    }

    function handleEdit(product: Product) {
        setEditingProduct(product);
}

return (
    <div>
        <h1>Administração de Produtos</h1>

        {editingProduct && (
            <form onSubmit={handleUpdate}>
            <h2>Editando: {editingProduct.name}</h2>
            <input
                type="text"
                value={editingProduct?.name || ""}
                onChange={(e) =>
                setEditingProduct(editingProduct ? { ...editingProduct, name: e.target.value } : null)
                }
            />
            <input
                type="text"
                value={editingProduct?.description || ""}
                onChange={(e) =>
                setEditingProduct(
                    editingProduct ? { ...editingProduct, description: e.target.value } : null
                )
                }
            />
            <input
                type="number"
                value={editingProduct?.kcal || ""}
                onChange={(e) =>
                setEditingProduct(
                    editingProduct ? { ...editingProduct, kcal: Number(e.target.value) } : null
                )
                }
            />
            <button type="submit">Salvar Alterações</button>
            </form>
        )}

        <ul>
            {products.map((product) => (
            <li key={product.id}>
                {product.name} - {product.description} - {product.kcal} kcal
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Deletar</button>
            </li>
            ))}
        </ul>
    </div>
    );
}
