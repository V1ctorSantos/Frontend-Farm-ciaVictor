import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Categoria } from '../../models/Categoria';
import { getAll } from '../../services/Service';

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    getAll('/categorias', setCategorias, {});
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>{categoria.descricao}</td>
              <td>
                <Link to={`/editarCategoria/${categoria.id}`} className="mr-2">Editar</Link>
                <Link to={`/deletarCategoria/${categoria.id}`}>Deletar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/cadastroCategoria" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Cadastrar Categoria</Link>
    </div>
  );
}

export default ListaCategorias;
