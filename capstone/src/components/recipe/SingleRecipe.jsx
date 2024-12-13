import { Col, Container, Row } from "react-bootstrap"
import RecipeHero from "./RecipeHero"
import Ingredients from "./Ingredients"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function SingleRecipe() {
    const referece = useParams().recipeReference
    const [recipeInfo, setRecipeInfo] = useState(null)
    const token = localStorage.getItem("token")
    const getRecipeInfo = async () => {
        try {
            const response = await fetch("http://localhost:3001/recipes/" + referece, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setRecipeInfo(data)

            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    useEffect(() => {
        getRecipeInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container className="my-5">
            {
                recipeInfo && (
                    <>
                        <RecipeHero recipe={recipeInfo} />

                        <Row className="g-3">
                            <Col xs={12}>
                                <Ingredients recipe={recipeInfo} />
                            </Col>
                        </Row>
                    </>
                )
            }


        </Container>
    )
}

export default SingleRecipe