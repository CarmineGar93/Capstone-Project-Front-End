import { Col, Container, Row } from "react-bootstrap"
import RecipesMain from "./RecipesMain"
import RecipesFilterSection from "./RecipesFilterSection"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Recipes() {
    const [recipes, setRecipes] = useState([])
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const retrieveRandomRecipes = async () => {
        try {
            const response = await fetch("http://localhost:3001/recipes/random", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setRecipes(data.recipes)
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/auth/login")
        } else {
            retrieveRandomRecipes()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={12} lg={9} className="order-1 order-lg-0"><RecipesMain recipes={recipes} /></Col>
                <Col xs={12} lg={3}><RecipesFilterSection /></Col>
            </Row>
        </Container>
    )
}

export default Recipes