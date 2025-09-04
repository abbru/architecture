import React, { useState } from 'react';
import { UserService } from '../application/userService';
import InMemoryUserRepository from '../infrastructure/userRepository';
import { User } from '../domain/user';

const userRepo = new InMemoryUserRepository();
const userService = new UserService(userRepo);

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    try {
      const newUser = await userService.createUser(name, email);
      setUser(newUser);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setUser(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input name="email" placeholder="Email" required />
        <button type="submit">Crear Usuario</button>
      </form>

      {error && <p style={{color: 'red'}}>{error}</p>}

      {user && (
        <div>
          <h3>Usuario Creado</h3>
          <p>ID: {user.id}</p>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;