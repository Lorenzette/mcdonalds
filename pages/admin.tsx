import React, {useState} from 'react';
import axios from 'axios';

export default function AdminPage(){
    const [name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[kcal, setKcal] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/products', {
                name,
                description,
                kcal,
            });
            alert('Produto cadastrado com sucesso!');
            setName('');
            setDescription('');
            setKcal('');
        } catch(error){
            alert('Erro ao cadastrar produto.');
        }
    };
    return (
        <div>
            <h1>Cadastro de Produtos:</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do produto:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Calorias:</label>
                    <input type="text" value={kcal} onChange={(e) => setKcal(e.target.value)} required />
                </div>
                <button type='submit'>Cadastrar Produto</button>
            </form>
        </div>
    );
}