import Alert from 'react-bootstrap/Alert';


const SuccessAlert = ({ msg }) => {
  return (
    <Alert variant="success">
      <p>{msg}</p>
    </Alert>
  );
}

export default SuccessAlert;