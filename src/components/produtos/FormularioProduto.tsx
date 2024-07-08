import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscar, cadastrar, atualizar } from '../../services/Service';

function FormularioProduto() {
  const [produto, setProduto] = useState({ id: 0, nome: '', descricao: '', quantidade: 0, laboratorio: '', preco: 0 });
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      buscar(`/produtos/${id}`, setProduto, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
    }
  }, [id]);

  function updateProduto(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      await atualizar(`/produtos`, produto, setProduto, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      alert('Produto atualizado com sucesso');
    } else {
      await cadastrar(`/produtos`, produto, setProduto, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      alert('Produto cadastrado com sucesso');
    }
    navigate('/produtos');
  }

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateProduto(e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-gray-700">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateProduto(e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantidade" className="block text-gray-700">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            value={produto.quantidade}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateProduto(e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="laboratorio" className="block text-gray-700">Laboratório</label>
          <input
            type="text"
            id="laboratorio"
            name="laboratorio"
            value={produto.laboratorio}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateProduto(e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="preco" className="block text-gray-700">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateProduto(e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          {id !== undefined ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioProduto;
