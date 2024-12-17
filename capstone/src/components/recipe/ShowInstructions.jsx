import { Modal } from "react-bootstrap"
import parse from 'html-react-parser'

function ShowInstructions({ show, onHide, instructions }) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Instructions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-3">
                    {
                        parse(instructions)
                    }
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default ShowInstructions