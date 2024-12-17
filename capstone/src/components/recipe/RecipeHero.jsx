import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { BoxArrowInUpRight, Heart, HeartFill } from 'react-bootstrap-icons'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from "react-redux"
import { ChangeLoadingAction, RetrieveFavouritesAction } from "../../redux/actions"
import { toast } from "react-toastify"
import AddModal from "./AddModal"
import ShowInstructions from "./ShowInstructions"

function RecipeHero({ recipe }) {
    const [showInfo, setShowInfo] = useState(false)
    const [show, setShow] = useState(false)
    const [imageUrl, setImageUrl] = useState(recipe.image)
    const favourites = useSelector(state => state.user.favourites)
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const [isFavourite, setIsFavourite] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [recipeInstructions, setRecipeInstructions] = useState("")
    const handleFavourite = async () => {
        try {
            const response = await fetch("http://localhost:3001/users/me/favourites", {
                method: "PATCH",
                body: JSON.stringify({
                    reference: recipe.id
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                const data = await response.json()
                dispatch(ChangeLoadingAction(false))
                if (data.message === "Added") {
                    toast.success("Recipe added to favourites")
                } else {
                    toast.success("Recipe removed from favourites")
                }
                dispatch(RetrieveFavouritesAction(token))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            dispatch(ChangeLoadingAction(false))
            toast.error(err.message)
        }
    }
    useEffect(() => {
        if (favourites.some(fav => fav.reference === recipe.id)) {
            setIsFavourite(true)
        } else {
            setIsFavourite(false)
        }
        if (recipe) {
            if (recipe?.instructions.length > 150) {
                if (recipe.instructions.indexOf("<ol>") > - 1) {
                    let string = recipe.instructions.slice(0, (recipe.instructions.indexOf("</li>", 150) + 5))
                    string += "</ol>"
                    setRecipeInstructions(string)
                    console.log(string)
                } else {
                    setRecipeInstructions(recipe.instructions.slice(0, (recipe.instructions.indexOf(".", 150) + 1)))
                }
            } else {
                setRecipeInstructions(recipe.instructions)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourites, recipe])
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
                        <button className="rounded-5 bg-white p-2 me-2 ingredient-btn" onClick={() => setShow(true)}>Add to plan</button>
                        {
                            isFavourite ? (
                                <HeartFill role="button" onClick={() => {
                                    dispatch(ChangeLoadingAction(true))
                                    setTimeout(() => {
                                        handleFavourite()
                                    }, 2000)
                                }
                                } onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} size={30} color="red" />
                            ) : (
                                <Heart role="button" onClick={() => {
                                    dispatch(ChangeLoadingAction(true))
                                    setTimeout(() => {
                                        handleFavourite()
                                    }, 2000)
                                }
                                } onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} size={30} color={isHovered ? "red" : "grey"} />
                            )
                        }

                    </div>
                    <div className="mb-5">
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
                        {parse(recipeInstructions)}
                        {
                            recipeInstructions && <p role="button" className="text-danger text-end mb-0 mt-1" onMouseEnter={(e) => e.currentTarget.classList.add("fw-semibold")} onMouseLeave={(e) => e.currentTarget.classList.remove("fw-semibold")} onClick={() => setShowInfo(true)}>Read more</p>
                        }

                    </div>

                </Col>
            </Row>
            <AddModal show={show} onHide={() => setShow(false)} recipeReference={recipe.id} />
            <ShowInstructions show={showInfo} onHide={() => setShowInfo(false)} instructions={recipe?.instructions} />
        </Card>

    )
}

export default RecipeHero