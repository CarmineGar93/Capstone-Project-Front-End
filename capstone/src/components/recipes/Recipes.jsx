import { Col, Container, Row } from "react-bootstrap"
import RecipesMain from "./RecipesMain"
import RecipesFilterSection from "./RecipesFilterSection"
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ChangeLoadingAction } from "../../redux/actions";

function Recipes() {
    const [recipes, setRecipes] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [filter, setFilter] = useState({
        ingredients: [],
        recipeType: [],
        preparationTime: "",
        sortBy: ""
    })
    const addIngredient = (ing) => {
        const newArr = [...filter.ingredients, ing]
        setFilter({
            ...filter,
            ingredients: newArr
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
    const observer = useRef()
    const [products, setProducts] = useState([])
    const addProduct = (prod) => {
        products.push(prod)
    }
    const isLoading = useSelector(state => state.loading.loading)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                setPage((prevPage) => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node)
    }, [isLoading, hasMore])
    useEffect(() => {
        if (!token) {
            navigate("/auth/login")
        } else if (hasMore) {
            dispatch(ChangeLoadingAction(true))
            if (page === 0) {
                retrieveRecipes()
            } else {
                const time = setTimeout(() => {
                    retrieveRecipes()
                }, 2000)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    useEffect(() => {
        retrieveCommonProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container className="my-5">
            <Row className="g-3">
                <Col xs={12} lg={9} className="order-1 order-lg-0"><RecipesMain recipes={recipes} lastRecipeRef={lastRecipeRef} /></Col>
                <Col xs={12} lg={3}><RecipesFilterSection prod={products} addIng={addIngredient} removeIng={removeIngredient} ingSelected={filter.ingredients} addProd={addProduct} /></Col>
            </Row>
        </Container>
    )
}

export default Recipes