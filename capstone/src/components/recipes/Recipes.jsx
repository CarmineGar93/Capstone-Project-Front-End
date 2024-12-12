import { Col, Container, Row } from "react-bootstrap"
import RecipesMain from "./RecipesMain"
import RecipesFilterSection from "./RecipesFilterSection"
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ChangeLoadingAction } from "../../redux/actions";

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}

function Recipes() {
    const isLoading = useSelector(state => state.loading.loading)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const observer = useRef()
    const mealTypes = ["Main course", "Side dish", "Breakfast", "Dessert", "Salad"]
    const time = [20, 40, 60]
    const [recipes, setRecipes] = useState([])
    const [page, setPage] = useState(0)
    const [offset, setOffset] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({
        ingredients: [],
        recipeType: [],
        preparationTime: "",
        sortBy: ""
    })
    const prevFilter = usePrevious(filter)
    const retrieveFilteredRecipes = async () => {
        const queryParamString = []
        const offsetString = "offset=" + offset
        queryParamString.push(offsetString)
        if (filter.ingredients.length !== 0) {
            const ingredientString = "ingredients=" + filter.ingredients.join(",")
            queryParamString.push(ingredientString)
        }
        if (filter.recipeType.length !== 0) {
            const typeString = "type=" + filter.recipeType.join(",")
            queryParamString.push(typeString)
        }
        if (filter.preparationTime) {
            const prepTimeString = "time=" + filter.preparationTime
            queryParamString.push(prepTimeString)
        }
        if (filter.sortBy) {
            const sortString = "sort=" + filter.sortBy
            queryParamString.push(sortString)
        }
        console.log(queryParamString.join("&"))
        try {
            const response = await fetch("http://localhost:3001/recipes/filter?" + queryParamString.join("&"), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                if (offset === 0) {
                    setRecipes(data.results)
                } else {
                    setRecipes((prevRecipes) => [...prevRecipes, ...data.results])
                }
                if (offset + data.number >= data.totalResults) {
                    setHasMore(false)
                }
                dispatch(ChangeLoadingAction(false))
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const addIngredient = (ing) => {
        const index = products.findIndex(i => i.name === ing)
        const arr = [...products]
        const founded = arr.splice(index, 1)
        arr.unshift(founded[0])
        const newArr = [...filter.ingredients, ing]
        setFilter({
            ...filter,
            ingredients: newArr
        })
        setProducts(arr)
    }
    const addType = (type) => {
        setFilter({
            ...filter,
            recipeType: [...filter.recipeType, type]
        })
    }
    const addPreparationTime = (time) => {
        setFilter({
            ...filter,
            preparationTime: time
        })
    }
    const addSortBy = (sort) => {
        setFilter({
            ...filter,
            sortBy: sort
        })
    }
    const addProduct = (prod) => {
        const index = products.indexOf(p => p.reference === prod.reference)
        console.log(index)
        if (index === -1) {
            setProducts([prod, ...products])
        }
        setFilter({
            ...filter,
            ingredients: [...filter.ingredients, prod.name]
        })
    }
    const removeIngredient = (ing) => {
        const index = filter.ingredients.indexOf(ing)
        if (index > - 1) {
            const newArr = [...filter.ingredients]
            newArr.splice(index, 1)
            setFilter({
                ...filter,
                ingredients: newArr
            })
        }
    }
    const removeType = (type) => {
        const index = filter.recipeType.indexOf(type)
        if (index > - 1) {
            const newArr = [...filter.recipeType]
            newArr.splice(index, 1)
            setFilter({
                ...filter,
                recipeType: newArr
            })
        }
    }
    const removePreparationTime = () => {
        setFilter({
            ...filter,
            preparationTime: ""
        })
    }
    const retrieveCommonProducts = async () => {
        try {
            const response = await fetch("http://localhost:3001/products/common", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setProducts(data)

            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const retrieveRecipes = async () => {
        try {
            const response = await fetch("http://localhost:3001/recipes?page=" + page, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                if (data.last) {
                    setHasMore(false)
                }
                setRecipes((prevRecipes) => [...prevRecipes, ...data.content])
                dispatch(ChangeLoadingAction(false))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            dispatch(ChangeLoadingAction(false))
            toast.error(err.message)
        }
    }
    const lastRecipeRef = useCallback((node) => {
        if (isLoading || !hasMore) return;
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (filter.ingredients.length !== 0 || filter.recipeType.length !== 0 || filter.preparationTime || filter.sortBy) {
                    setOffset((prevOffSet) => prevOffSet + 12)
                } else {
                    setPage((prevPage) => prevPage + 1)
                }

            }
        })

        if (node) observer.current.observe(node)
    }, [isLoading, hasMore, filter])
    useEffect(() => {
        console.log("Ciao")
        if (!token) {
            navigate("/auth/login")
        } else {
            dispatch(ChangeLoadingAction(true))
            if (filter.ingredients.length !== 0 || filter.recipeType.length !== 0 || filter.preparationTime || filter.sortBy) {
                if (prevFilter.ingredients.length !== filter.ingredients.length || prevFilter.recipeType.length !== filter.recipeType.length || prevFilter.preparationTime !== filter.preparationTime || prevFilter.sortBy !== filter.sortBy) {
                    setHasMore(true)
                    if (offset === 0) {
                        const time = setTimeout(() => {
                            retrieveFilteredRecipes()
                        }, 2000)
                    } else {
                        setOffset(0)
                    }

                } else if (hasMore) {
                    // eslint-disable-next-line no-unused-vars
                    const time = setTimeout(() => {
                        retrieveFilteredRecipes()
                    }, 2000)
                }


            } else {
                if (page === 0) {
                    retrieveRecipes()
                } else if (hasMore) {
                    // eslint-disable-next-line no-unused-vars
                    const time = setTimeout(() => {
                        retrieveRecipes()
                    }, 2000)
                }
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, offset, filter])
    useEffect(() => {
        retrieveCommonProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    /*  useEffect(() => {
         if (filter.ingredients.length !== 0 || filter.recipeType.length !== 0 || filter.preparationTime || filter.sortBy) {
             setOffset(0)
             dispatch(ChangeLoadingAction(true))
             // eslint-disable-next-line no-unused-vars
             const time = setTimeout(() => {
                 retrieveFilteredRecipes()
             }, 2000)
         }
 
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [filter]) */
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={12} lg={9} className="order-1 order-lg-0"><RecipesMain recipes={recipes} lastRecipeRef={lastRecipeRef} addSort={addSortBy} /></Col>
                <Col xs={12} lg={3}><RecipesFilterSection prod={products} addIng={addIngredient} removeIng={removeIngredient} filters={filter} addProd={addProduct} mealTypes={mealTypes} time={time} addType={addType} removeType={removeType} addTime={addPreparationTime} removeTime={removePreparationTime} /></Col>
            </Row>
        </Container>
    )
}

export default Recipes