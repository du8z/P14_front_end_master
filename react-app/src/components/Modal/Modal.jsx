import './Modal.css'
export default function Modal({ show, onClose, message }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <p className="messageModal">{message}</p>
      </div>
    </div>
  );
}
