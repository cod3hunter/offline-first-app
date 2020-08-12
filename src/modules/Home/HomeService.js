import { getAllUsers } from '../../services/GoRestService';

const fillUserList = async ({ setUsers, setIsLoading }) => {
  try {
    setIsLoading(true);
    const users = await getAllUsers();
    setUsers(users);
  } catch (err) {
    console.error(err);
    setUsers([]);
  } finally {
    setIsLoading(false);
  }
};

export { fillUserList };
