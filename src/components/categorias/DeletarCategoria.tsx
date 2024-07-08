import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { remove } from '../../services/Service';

function DeletarCategoria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      remove(`/categorias/${id}`, {});
      navigate('/categorias');
    }
  }, [id]);

  return (
    <div>
      <h1>Categoria deletada com sucesso!</h1>
    </div>
  );
}

export default DeletarCategoria;
