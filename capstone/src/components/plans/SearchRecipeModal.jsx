import { useEffect, useState } from 'react'
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import RecipesPagination from './RecipesPagination'
import { useDispatch, useSelector } from 'react-redux'
import { RetrievePlansAction } from '../../redux/actions'
import RecipeCard from '../recipes/RecipeCard'
import { toast } from 'react-toastify'


function SearchRecipeModal({ onHide, show, meal }) {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const favourites = useSelector(state => state.user.favourites)
    const [recipes, setRecipes] = useState(favourites)
    const [value, setValue] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage] = useState(8)
    const indexLast = currentPage * recipePerPage
    const indexFirst = indexLast - recipePerPage
    const currentRecipes = recipes.slice(indexFirst, indexLast);
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const resetStates = () => {
        setValue("")
        setRecipes(favourites)
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
            toast.error(err)
        }
    }
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3001/recipes?query=" + value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setRecipes(data)
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
    useEffect(() => {
        const getRecipes = setTimeout(() => {
            if (value) {
                getData()
            } else {
                setCurrentPage(1)
                setRecipes(favourites)
            }
        }, 2000)
        return () => clearTimeout(getRecipes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Form.Control type='text' placeholder='Search a recipe' className=' rounded-4 mb-2' value={value} onChange={(e) => setValue(e.target.value)} />
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
                    <RecipesPagination currentPage={currentPage} setCurrentPage={setCurrentPage} recipePerPage={recipePerPage} totalRecipes={recipes.length} />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    resetStates()
                    onHide()
                }}>Close</Button>
                <Button variant='danger' onClick={() => addReceipt()} disabled={selectedRecipe ? false : true}>Add receipt</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SearchRecipeModal