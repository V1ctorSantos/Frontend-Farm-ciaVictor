import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscar } from '../../services/Service';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscar('/produtos', setProdutos, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }, []);

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Produtos</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nome</th>
            <th className="py-2">Descrição</th>
            <th className="py-2">Quantidade</th>
            <th className="py-2">Laboratório</th>
            <th className="py-2">Preço</th>
            <th className="py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto: any) => (
            <tr key={produto.id}>
              <td className="py-2">{produto.nome}</td>
              <td className="py-2">{produto.descricao}</td>
              <td className="py-2">{produto.quantidade}</td>
              <td className="py-2">{produto.laboratorio}</td>
              <td className="py-2">{produto.preco}</td>
              <td className="py-2">
                <Link to={`/editarProduto/${produto.id}`} className="text-blue-500 hover:underline">Editar</Link>
                <Link to={`/deletarProduto/${produto.id}`} className="text-red-500 hover:underline ml-2">Deletar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProdutos;
