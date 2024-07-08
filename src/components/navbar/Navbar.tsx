import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();

  function logout() {
    alert('Usuário deslogado com sucesso');
    navigate('/login');
  }

  return (
    <div className='w-full bg-orange-600 text-white flex justify-center py-4'>
      <div className="container flex justify-between text-lg">
        <Link to='/home' className='text-2xl font-bold uppercase'>Farmácia</Link>
        <div className='flex gap-4'>
          <Link to='/produtos' className='hover:underline'>Produtos</Link>
          <Link to='/categorias' className='hover:underline'>Categorias</Link>
          <Link to="/perfil" className='hover:underline'>Perfil</Link>
          <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
