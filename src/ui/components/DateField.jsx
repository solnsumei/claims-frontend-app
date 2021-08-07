import PropTypes from 'prop-types';


const DateField = ({
  form: Form, name, label, value,
  register, error, required=false, isDisabled=false
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label} {required ? '*' : ''}</Form.Label>
      <Form.Control type='date' {...register(name)} defaultValue={value} readOnly={isDisabled} />
      {error && <p className="text-danger">{error.message}</p>}
    </Form.Group>
  );
}

DateField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

export default DateField;