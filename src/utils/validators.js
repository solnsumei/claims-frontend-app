import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const name = yup.string().required().min(3).max(30);
const description = yup.string().required();
const departmentField = yup.string()
.transform(value => {
  if (value !== "") {
    return value;
  }

  // Transform the value to undefined
  return null;
}).nullable().uuid("field is invalid");


export const departmentResolver = () => yupResolver(yup.object().shape({ name }));

export const loginResolver = () => yupResolver(
  yup.object().shape({
    username: yup.string().required('Username field is required'),
    password: yup.string().required('Password is required'),
  }),
);

export const projectResolver = () => yupResolver(
  yup.object().shape({
    name,
    description,
    code: yup.string().required().min(2).max(15),
    manager_id: yup.string().required("field is required").uuid("field is invalid"),
    department_id: departmentField,
    budget: yup.number().typeError('you must specify a number').min(1, "min value is 1").required("field is required"),
    duration: yup.number().typeError('you must specify a number').min(1, "min value is 1").required("field is required").integer(),
  })
);

export const createEmployeeResolver = () => yupResolver(
  yup.object().shape({
    name,
    role: yup.string().required("role is a required field").oneOf(['Admin', 'Manager', 'Staff']),
    username: yup.string().required().min(3).max(30),
    email: yup.string().required().email().max(50),
    password: yup.string().required().min(8).max(70),
    department_id: departmentField,
  })
);


export const updateEmployeeResolver = () => yupResolver(
  yup.object().shape({
    name,
    role: yup.string().required().oneOf(['Admin', 'Manager', 'Staff']),
    email: yup.string().required().email().max(50),
    password: yup.string()
    .transform(value => {
      if (value !== "") {
        return value;
      }
      // Transform the value to undefined
      return undefined;
    }).nullable().notRequired().min(8).max(70),
    department_id: departmentField,
  })
);

export const createContractorResolver = () => yupResolver(
  yup.object().shape({
    name,
    role: yup.string().required().oneOf(['Contractor']),
    username: yup.string().required().min(3).max(30),
    email: yup.string().required().email().max(50),
    password: yup.string().required().min(8).max(70),
  })
);


export const updateContractorResolver = () => yupResolver(
  yup.object().shape({
    name,
    role: yup.string().required().oneOf(['Contractor']),
    email: yup.string().required().email().max(50),
    password: yup.string()
    .transform(value => {
      if (value !== "") {
        return value;
      }
      // Transform the value to undefined
      return undefined;
    }).nullable().notRequired().min(8).max(70),
  })
);
