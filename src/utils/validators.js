import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object().shape({
  username: yup.string().required('Username field is required'),
  password: yup.string().required('Password is required'),
});

export const loginResolver = () => yupResolver(loginSchema);
