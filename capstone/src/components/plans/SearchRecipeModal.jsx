import { useState } from 'react'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import RecipesPagination from './RecipesPagination'
import { useDispatch, useSelector } from 'react-redux'
import { RetrievePlansAction } from '../../redux/actions'
import RecipeCard from '../recipes/RecipeCard'
import { toast } from 'react-toastify'



function SearchRecipeModal({ onHide, show, meal }) {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const favourites = useSelector(state => state.user.favourites)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage] = useState(4)
    const indexLast = currentPage * recipePerPage
    const indexFirst = indexLast - recipePerPage
    const currentRecipes = /*recipes*/favourites.slice(indexFirst, indexLast);
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const resetStates = () => {
        setSelectedRecipe(null)
        setCurrentPage(1)
    }
    const addReceipt = async () => {
        try {
            const response = await fetch("http://localhost:3001/meals/" + meal + "/add", {
                method: "PATCH",
                body: JSON.stringify({
                    reference: selectedRecipe
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                toast.success("Recipe added successfully")
                resetStates()
                dispatch(RetrievePlansAction(token, 0))
                onHide()
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => {
                resetStates(
                    onHide()
                )
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title className='fs-3'>Select a favourite recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>

                    <Row xs={4} className='gy-3 mb-3'>
                        {
                            currentRecipes.map(recipe => {
                                return (
                                    <Col key={recipe.reference} className={`${selectedRecipe === recipe.reference ? "shadow-lg" : ""} rounded-5 py-3`} onClick={() => setSelectedRecipe(recipe.reference)}>
                                        <RecipeCard recipe={recipe} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <RecipesPagination currentPage={currentPage} setCurrentPage={setCurrentPage} recipePerPage={recipePerPage} totalRecipes={/* recipes */favourites.length} />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => addReceipt()} disabled={selectedRecipe ? false : true}>Add receipt</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SearchRecipeModal