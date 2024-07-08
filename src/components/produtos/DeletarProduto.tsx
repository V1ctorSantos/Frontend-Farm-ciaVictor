import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscar, deletar } from '../../services/Service';

function DeletarProduto() {
  const [produto, setProduto] = useState({ id: 0, nome: '', descricao: '' });
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

  async function confirmarExclusao() {
    await deletar(`/produtos/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    alert('Produto deletado com sucesso');
    navigate('/produtos');
  }

  function cancelar() {
    navigate('/produtos');
  }

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Deletar Produto</h2>
      <p className="mb-4">Você tem certeza que deseja deletar o produto <strong>{produto.nome}</strong>?</p>
      <button onClick={confirmarExclusao} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2">Sim</button>
      <button onClick={cancelar} className="px-4 py-2 bg-gray-500 text-white rounded-md">Não</button>
    </div>
  );
}

export default DeletarProduto;
