import { useEffect, useState } from "react";
import { HeartFill } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from "react-redux";
import { RetrieveFavouritesAction } from "../../redux/actions";
import { toast } from "react-toastify";

function RecipeCard({ recipe }) {
    const favourites = useSelector(state => state.user.favourites)
    const dispatch = useDispatch()
    const id = recipe.id ? recipe.id : recipe.reference
    const token = localStorage.getItem("token")
    const [isFavourite, setIsFavourite] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const handleFavourite = async () => {
        try {
            const response = await fetch("http://localhost:3001/users/me/favourites", {
                method: "PATCH",
                body: JSON.stringify({
                    reference: id
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                const data = await response.json()
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
            toast.error(err)
        }
    }
    useEffect(() => {
        if (favourites.some(fav => fav.reference === id)) {
            setIsFavourite(true)
        } else {
            setIsFavourite(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourites])
    return (
        <>
            <div className="mb-2 recipe-background position-relative rounded-4" style={{ "--url": `url(${recipe.image ? recipe.image : recipe.imageUrl})` }}>
                <HeartFill onClick={() => handleFavourite()} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className=" position-absolute bottom-0 end-0 m-2" size={30} color={(isFavourite && isHovered) || (!isFavourite && !isHovered) ? "white" : "red"} />
            </div>
            <h5>{recipe.title ? recipe.title : recipe.name}</h5>
            {
                recipe.extendedIngredients && <p className="mb-0 text-body-tertiary">{`Ingredients: ${recipe.extendedIngredients.length}`}</p>
            }

        </>
    )
}

export default RecipeCard