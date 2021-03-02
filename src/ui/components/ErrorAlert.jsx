import Alert from 'react-bootstrap/Alert';


const ErrorAlert = ({ msg, onClose }) => {
  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <p>{msg}</p>
    </Alert>
  );
}

export default ErrorAlert;