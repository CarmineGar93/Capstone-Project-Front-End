import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { HeartFill } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from "react-redux";
import { RetrieveFavouritesAction } from "../../redux/actions";

function RecipeCard({ recipe }) {
    const favourites = useSelector(state => state.user.favourites)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [isFavourite, setIsFavourite] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
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
                if (data.message === "Added") {
                    alert("Recipe added to favourites")
                } else {
                    alert("Recipe removed from favourites")
                }
                dispatch(RetrieveFavouritesAction(token))
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            alert(err)
        }
    }
    useEffect(() => {
        if (favourites.some(fav => fav.reference === recipe.id)) {
            setIsFavourite(true)
        } else {
            setIsFavourite(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourites])
    return (
        <Col key={recipe.id}>
            <div className="mb-2 recipe-background position-relative rounded-4" style={{ "--url": `url(${recipe.image})` }}>
                <HeartFill onClick={() => handleFavourite()} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className=" position-absolute bottom-0 end-0 m-2" size={30} color={isHovered ? (isFavourite ? "white" : "red") : (isFavourite ? "red" : "white")} />
            </div>
            <h5>{recipe.title}</h5>
            <p className="mb-0 text-body-tertiary">{`Ingredients: ${recipe.extendedIngredients.length}`}</p>
            <p className="mb-0 text-body-tertiary">{`Ready in : ${recipe.readyInMinutes} minutes`}</p>
        </Col>
    )
}

export default RecipeCard