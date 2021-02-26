import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const name = yup.string().required().min(3).max(30);

export const departmentResolver = () => yupResolver(yup.object().shape({ name }));

export const loginResolver = () => yupResolver(
  yup.object().shape({
    username: yup.string().required('Username field is required'),
    password: yup.string().required('Password is required'),
  }),
);
