import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import ProductsModal from './ProductsModal'

function RecipesFilterSection({ prod, addIng, removeIng, ingSelected, addProd }) {
    const [show, setShow] = useState(false)
    const [more, setMore] = useState(false)
    const products = more ? prod : prod.slice(0, 8)
    const mealTypes = ["Main course", "Side dish", "Breakfast", "Dessert", "Salad"]
    const time = ["Max 20 min", "Max 40 min", "Max 60 min"]
    return (
        <Card className="p-4 border-0">
            <h3>Filter</h3>
            <Container fluid className="p-0 my-3">
                <Row className="mb-3 gx-0">
                    <Col xs={9}>
                        <h5>Ingredients</h5>
                    </Col>
                    <Col xs={3} className="text-end">
                        <button className="bg-white border-0 text-secondary add-btn" onClick={() => setShow(true)}>Add</button>
                    </Col>
                </Row>
                <Row className="gy-3 gx-1 mb-5 align-items-center">
                    {
                        products.map(p => {
                            return (
                                <Col xs="auto">
                                    <button className={`rounded-5 bg-white p-2 text-nowrap ${(ingSelected.some(i => i === p.name)) ? "ingredient-btn-selected border-2" : "ingredient-btn"} `} onClick={() => (ingSelected.some(i => i === p.name)) ? removeIng(p.name) : addIng(p.name)}><img alt="" src={p.imageUrl} height={25} className="me-2"></img>{p.name.toLowerCase().replace(/^./, char => char.toUpperCase())}</button>
                                </Col>
                            )
                        })
                    }
                    <Col xs="auto">
                        <button className="bg-white border-0 text-secondary add-btn" onClick={() => setMore(!more)}>{more ? "Less" : "More"}</button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <h5>Recipe type</h5>
                    </Col>
                </Row>
                <Row className="gy-3 gx-1 mb-5">
                    {
                        mealTypes.map(type => {
                            return (
                                <Col xs="auto">
                                    <button className="rounded-5 bg-white py-2 px-3 text-nowrap ingredient-btn">{type}</button>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <h5>Preparation time</h5>
                    </Col>
                </Row>
                <Row className="gy-3 gx-1 mb-3">
                    {
                        time.map(t => {
                            return (
                                <Col xs="auto">
                                    <button className="rounded-5 bg-white py-2 px-3 text-nowrap ingredient-btn">{t}</button>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
            <ProductsModal show={show} onHide={() => setShow(false)} />
        </Card>
    )
}

export default RecipesFilterSection