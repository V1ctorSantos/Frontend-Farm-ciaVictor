import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categoria } from '../../models/Categoria';
import { getAll, post, put } from '../../services/Service';

function FormularioCategoria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', descricao: '' });

  useEffect(() => {
    if (id !== undefined) {
      getAll(`/categorias/${id}`, setCategoria, {});
    }
  }, [id]);

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [event.target.name]: event.target.value
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (id !== undefined) {
      await put(`/categorias/${id}`, categoria, setCategoria, {});
    } else {
      await post('/categorias', categoria, setCategoria, {});
    }
    navigate('/categorias');
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">{id !== undefined ? 'Editar Categoria' : 'Cadastrar Categoria'}</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={categoria.nome}
            onChange={updateModel}
            required
            className="border rounded py-2 px-4 w-full"
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={categoria.descricao}
            onChange={updateModel}
            required
            className="border rounded py-2 px-4 w-full"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Salvar</button>
      </form>
    </div>
  );
}

export default FormularioCategoria;
