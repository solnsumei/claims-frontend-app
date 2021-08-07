import PropTypes from 'prop-types';


const SelectInput = ({
  form: Form, name, itemsList, value, valueKey, valueName,
  label, register, error, defaultOption = true, required = false, isDisabled = false
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label} {required ? '*' : ''}</Form.Label>
      <Form.Control
        as="select"
        {...register(name)}
        placeholder={`Select ${label}`}
        defaultValue={value}
        disabled={isDisabled}
        custom>
        { defaultOption && <option value="">Select {label}</option>}
        {
          valueKey
            ? itemsList && itemsList.length > 0 && itemsList.map(item => <option key={item[valueKey]} value={item[valueKey]}>
              {item[valueName]}
            </option>)
            : itemsList && itemsList.length > 0 && itemsList.map(item => <option key={item}>
              {item}
            </option>)
        }
      </Form.Control>
      {error && <p className="text-danger">{error.message}</p>}
    </Form.Group>
  );
}

SelectInput.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  itemsList: PropTypes.array,
  valueKey: PropTypes.string,
  valueName: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
  defaultOption: PropTypes.bool,
}

export default SelectInput;