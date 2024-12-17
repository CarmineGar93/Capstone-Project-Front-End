import { useState } from 'react'
import { Modal, Button, /* Form */ Container, Row, Col } from 'react-bootstrap'
import RecipesPagination from './RecipesPagination'
import { useDispatch, useSelector } from 'react-redux'
import { RetrievePlansAction } from '../../redux/actions'
import RecipeCard from '../recipes/RecipeCard'
import { toast } from 'react-toastify'
/* import { RotatingLines } from 'react-loader-spinner' */


function SearchRecipeModal({ onHide, show, meal }) {
    /*     const [isLoading, setIsLoading] = useState(false) */
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const favourites = useSelector(state => state.user.favourites)
    /*     const [recipes, setRecipes] = useState(favourites) */
    /*     const [value, setValue] = useState("") */
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage] = useState(4)
    const indexLast = currentPage * recipePerPage
    const indexFirst = indexLast - recipePerPage
    const currentRecipes = /*recipes*/favourites.slice(indexFirst, indexLast);
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const resetStates = () => {
        /*         setValue("")
                setRecipes(favourites) */
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
    /*  const getData = async () => {
         try {
             const response = await fetch("http://localhost:3001/recipes/search?query=" + value, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                 }
             })
             if (response.ok) {
                 const data = await response.json()
                 console.log(data)
                 setRecipes(data)
                 setIsLoading(false)
             } else {
                 setIsLoading(false)
                 const error = await response.json()
                 throw new Error(error.message)
             }
         } catch (err) {
             toast.error(err.message)
         }
     } */
    /*  useEffect(() => {
         const getRecipes = setTimeout(() => {
             if (value) {
                 getData()
             } else {
                 setCurrentPage(1)
                 setRecipes(favourites)
                 setIsLoading(false)
             }
         }, 2000)
         return () => clearTimeout(getRecipes)
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [value]) */
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                {/* <Form.Control type='text' placeholder='Search a recipe' onKeyUp={() => {
                    if (!isLoading) {
                        setIsLoading(true)
                    }
                }} className=' rounded-4 mb-2' value={value} onChange={(e) => setValue(e.target.value)} /> */}

                <Container>
                    <h1 className='mb-3m'>Select a favourite recipe</h1>
                    {/*  {
                        isLoading ? (
                            <div className='d-flex justify-content-center py-10'>
                                <RotatingLines strokeColor='red' height='50' width='50'></RotatingLines>
                            </div>

                        ) : (
                            <>
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
                            </>
                        )
                    } */}

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