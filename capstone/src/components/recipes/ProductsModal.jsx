import { useEffect, useState } from 'react'
import { Modal, Form, Container, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
import { Plus } from 'react-bootstrap-icons'


function ProductsModal({ onHide, show, addProd, addIng }) {
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState("")
    const [products, setProducts] = useState([])
    const token = localStorage.getItem("token")
    const handleClick = (product) => {
        addProd(product)
        setValue("")
        onHide()
    }
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3001/products/search?query=" + value, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setProducts(data.results)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    useEffect(() => {
        const getProducts = setTimeout(() => {
            if (value) {
                getData()
            } else {
                setIsLoading(false)
                setProducts([])
            }
        }, 2000)
        return () => clearTimeout(getProducts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => {
                setValue("")
                onHide()
            }}
        >
            <Modal.Body>
                <Form.Control type='text' placeholder='Search a product' onKeyUp={() => {
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
                                <Row xs={1} md={2} className='gy-3 mb-3'>
                                    {
                                        products.map(prod => {
                                            const imgUrl = "https://img.spoonacular.com/ingredients_250x250/" + prod.image
                                            return (
                                                <Col key={prod.id}>
                                                    <div className='d-flex align-items-center'>
                                                        <button className={`btn-experience bg-white border-0 rounded-circle p-2 me-2`} onClick={() => {
                                                            handleClick({
                                                                reference: prod.id,
                                                                imageUrl: imgUrl,
                                                                name: prod.name
                                                            })
                                                        }}><Plus size={25} /></button>
                                                        <span className='me-2'>{prod.name.toLowerCase().replace(/^./, char => char.toUpperCase())}</span>
                                                        <img src={imgUrl} alt="" height={30} />
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
