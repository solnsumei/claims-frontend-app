import PropTypes from 'prop-types';


const InputField = ({
  form: Form, name, label, type, value,
  register, error, onChange, required=false, isDisabled=false
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label} {required ? '*' : ''}</Form.Label>
      { type && type === "textarea" 
        ? <Form.Control as="textarea" rows={5} {...register(name)} defaultValue={value} readOnly={isDisabled} /> 
        : <Form.Control type={type || 'text'}  defaultValue={value} {...register(name)} readOnly={isDisabled} onChange={onChange} />}
      {error && <p className="text-danger">{error.message}</p>}
    </Form.Group>
  );
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

export default InputField;