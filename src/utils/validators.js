import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { minDate, maxDate } from './dateHelpers';


const name = yup.string().required().min(3).max(30);
const description = yup.string().required();
const role = yup.string().required("role is a required field").oneOf(['Admin', 'Manager', 'Staff', 'Contractor']);
const email = yup.string().required().email().max(50);
const password = yup.string().required().min(8).max(70);

const departmentField = yup.string()
.transform(value => {
  if (value !== "") {
    return value;
  }

  // Transform the value to undefined
  return null;
}).nullable().uuid("field is invalid");

const remarkField = yup.string()
.transform(value => {
  if (value !== "") {
    return value;
  }

  // Transform the value to undefined
  return null;
}).nullable().notRequired().min(3).max(120);

const projectField = yup.string()
.transform(value => {
  if (value !== "") {
    return value;
  }

  // Transform the value to undefined
  return null;
}).nullable().uuid("field is invalid");

const passwordUpdate = yup.string()
.transform(value => {
  if (value !== "") {
    return value;
  }
  // Transform the value to undefined
  return undefined;
}).nullable().notRequired().min(8).max(70);

export const departmentResolver = () => yupResolver(yup.object().shape({ name }));

export const loginResolver = () => yupResolver(
  yup.object().shape({
    email,
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
    role,
    email,
    password,
    department_id: departmentField,
  })
);


export const updateEmployeeResolver = () => yupResolver(
  yup.object().shape({
    name,
    role,
    email,
    password: passwordUpdate,
    department_id: departmentField,
  })
);

export const createContractorResolver = () => yupResolver(
  yup.object().shape({
    name,
    role,
    email,
    password,
  })
);

export const updateContractorResolver = () => yupResolver(
  yup.object().shape({
    name,
    role,
    email,
    password: passwordUpdate,
  })
);

const changePasswordSchema = yup.object().shape({
  old_password: yup.string().required('Field is required'),
  password: yup.string().required('Field is required').min(8).max(50),
  password_confirmation: yup.string().required('Field is required').min(8).max(50),
});


export const changePasswordResolver = () => yupResolver(
  changePasswordSchema.omit(['old_password'])
);

export const changePasswordUpdateResolver = () => yupResolver(
  changePasswordSchema
);


export const claimResolver = () => yupResolver(
  yup.object().shape({
    description,
    invoice_no: yup.string().required('field is required')
      .min(2, 'min of 2 chars').max(15, 'max of 15 chars'),
    project_id: projectField,
    department_id: departmentField,
    amount: yup.number().typeError('must be a number')
      .min(1, "min value is 1").required("field is required"),
    due_date: yup.date().typeError('invalid date')
      .min(minDate(), "minimum of 2 years before now")
      .max(maxDate(), "maximum of 2 years from now"),
  })
);

export const rejectClaimResolver = () => yupResolver(
  yup.object().shape({
    remark: yup.string().required().min(3).max(120),
  }),
);

export const updateClaimResolver = () => yupResolver(
  yup.object().shape({
    tax_percent: yup.number().typeError('must be a number')
      .min(0, "min value is 0").max(50, "max value is 50").nullable().notRequired(),
    tax: yup.number().typeError('must be a number')
      .min(0, "min value is 0").nullable().notRequired(),
    approval_date: yup.date().typeError('invalid date')
      .min(minDate(), "minimum of 2 years before now")
      .max(maxDate(), "maximum of 2 years from now"),
    payment_date: yup.date().typeError('invalid date')
      .min(minDate(), "minimum of 2 years before now")
      .max(maxDate(), "maximum of 2 years from now"),
    remark: remarkField,
  }),
);

export const reportResolver = () => yupResolver(
  yup.object().shape({
    start_date: yup.date().typeError('invalid date')
      .min(minDate(), "minimum of 2 years before now")
      .max(maxDate(), "maximum of 2 years from now"),
    end_date: yup.date().typeError('invalid date')
      .min(minDate(), "minimum of 2 years before now")
      .max(maxDate(), "maximum of 2 years from now"),
    status: yup.string().required(),
  }),
);


const acceptedFileTypes = ['jpg', 'jpeg', 'pdf'];

export const claimFileResolver = () => yupResolver(
  yup.object().shape({
    file: yup.mixed().required('field is required')
      .test("fileType", 'Invalid file type, valid types are image jpegs and pdfs', (value) => {
        const fileExtension = value ? value[0].name.split('.').pop() : undefined;
        return value && acceptedFileTypes.includes(fileExtension);
      }),
  })
);

const ocrAcceptedFileTypes = ['jpg', 'png', 'jpeg', 'pdf'];

export const claimOcrFileResolver = () => yupResolver(
  yup.object().shape({
    file: yup.mixed().required('field is required')
      .test("fileType", 'File type is not an image', (value) => {
        const fileExtension = value ? value[0].name.split('.').pop() : undefined;
        return value && ocrAcceptedFileTypes.includes(fileExtension);
      }),
  })
);
