import { getAllUsers } from '../../services/GoRestService';

const fillUserList = async ({ setUsers }) => {
  try {
    const users = await getAllUsers();
    setUsers(users);
  } catch (err) {
    console.error(err);
    setUsers([]);
  }
};

export { fillUserList };
