import { getAllUsers } from '../../services/GoRestService';

const getUsers = async ({ setUsers }) => {
  const users = await getAllUsers();
  setUsers(users);
};

export { getUsers };
