import { useEffect, useState } from 'react'
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import RecipeCard from '../recipes/RecipeCard'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import { Plus } from 'react-bootstrap-icons'


function ProductsModal({ onHide, show }) {
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState("")
    const [products, setProducts] = useState([])

    const token = localStorage.getItem("token")
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Body>
                <Form.Control type='text' placeholder='Search a recipe' onKeyUp={() => {
                    if (!isLoading) {
                        setIsLoading(true)
                    }
                }} className=' rounded-4 mb-2' value={value} onChange={(e) => setValue(e.target.value)} />
                <Container>
                    {
                        isLoading ? (
                            <div className='d-flex justify-content-center py-10'>
                                <RotatingLines strokeColor='red' height='50' width='50'></RotatingLines>
                            </div>

                        ) : (
                            <>
                                <Row xs={12} md={6} className='gy-3 mb-3'>
                                    {
                                        products.map(prod => {
                                            return (
                                                <Col key={prod.reference}>
                                                    <div>
                                                        <button className={`btn-experience bg-white border-0 rounded-circle p-2`} onClick={() => {

                                                            onHide()
                                                        }}><Plus size={25} /></button>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </>
                        )
                    }

                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ProductsModal
