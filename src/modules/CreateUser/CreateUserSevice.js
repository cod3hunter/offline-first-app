import {createUser} from '../../services/GoRestService';
import {Alert} from 'react-native';

export const formReducer = (state, action) => {
  return state.map((stateItem) => {
    if (stateItem.name === action.name) {
      return {
        ...stateItem,
        value: action.value,
      };
    }
    return stateItem;
  });
};

export const initialFormState = [
  {name: 'name', value: '', placeholder: 'Name'},
  {name: 'email', value: '', placeholder: 'E-mail'},
  {name: 'gender', value: '', placeholder: 'Gender'},
];

export const normalizedData = (entryData) => {
  return entryData.reduce(
    (normalizedObj, user) => ({
      ...normalizedObj,
      [user.name]: user.value,
    }),
    {},
  );
};

export const createAlert = ({id, navigation}) => {
  Alert.alert(
    'Usuário criado',
    `O id do novo usuário é ${id}`,
    [
      {
        text: 'Ok',
        onPress: () => navigation.goBack(),
      },
    ],
    {cancelable: false},
  );
};

export const requestCreateUser = ({
  form,
  setError,
  setLoading,
  navigation,
}) => () => {
  setLoading(true);
  createUser(normalizedData(form))
    .then((response) => {
      const {data, code} = response.data;
      if (code === 201) {
        createAlert({id: data.id, navigation});
        return setError(null);
      }
      setError(`${data[0].field} ${data[0].message}`);
    })
    .catch((err) => {
      console.log('err', err);
      setError('Tivemos um problema ao criar um usuário!');
    })
    .finally(() => setLoading(false));
};

export const requestFindUserById = ({}) => () => {};
