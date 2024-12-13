import { useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { BoxArrowInUpRight } from 'react-bootstrap-icons'
import parse from 'html-react-parser'

function RecipeHero({ recipe }) {
    const [imageUrl, setImageUrl] = useState(recipe.image)
    return (
        <Card className="rounded-4 border-0 bg-white mb-5">
            <Row xs={1} lg={2}>
                <Col>
                    <div style={{ "--url": `url(${imageUrl})` }} className="recipe-hero-background ">

                    </div>
                    <img src={imageUrl} alt={recipe.title} className="d-none" onError={() => setImageUrl("../no-image.jpg")}></img>
                </Col>
                <Col className="p-5">
                    <div className="text-end mb-4">
                        <button className="rounded-5 bg-white p-2 ingredient-btn">Add to favourites</button>
                    </div>
                    <div className="mb-7">
                        <a className="recipe-link fs-5 text-decoration-none text-black" href={recipe.sourceUrl} target="blank">Source: {recipe.sourceName} <BoxArrowInUpRight className="mb-1"></BoxArrowInUpRight>
                        </a>
                        <h1 className="my-3">{recipe.title}</h1>
                        <p className="mb-0 text-secondary">Calories: {recipe.nutrition.nutrients[0].amount} kcal</p>
                        <p className="mb-0 text-secondary">Fat: {recipe.nutrition.nutrients[1].amount} g</p>
                        <p className="mb-0 text-secondary">Carbos: {recipe.nutrition.nutrients[3].amount} g</p>
                        <p className="mb-0 text-secondary">Sugar: {recipe.nutrition.nutrients[5].amount} g</p>
                    </div>
                    <div className="border-bottom border-top border-1 py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Instructions</h5>
                        <p className="mb-0 text-secondary">Ready in: {recipe.readyInMinutes}m</p>
                    </div>
                    <div className="py-3">
                        {parse(recipe?.instructions)}
                    </div>

                </Col>
            </Row>
        </Card>

    )
}

export default RecipeHero