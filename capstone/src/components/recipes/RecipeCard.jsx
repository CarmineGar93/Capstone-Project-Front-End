import { useEffect, useState } from "react";
import { HeartFill } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from "react-redux";
import { ChangeLoadingAction, RetrieveFavouritesAction } from "../../redux/actions";
import { toast } from "react-toastify";

function RecipeCard({ recipe }) {
    const favourites = useSelector(state => state.user.favourites)
    const dispatch = useDispatch()
    const id = recipe.id ? recipe.id : recipe.reference
    const token = localStorage.getItem("token")
    const [imageUrl, setImageUrl] = useState(recipe.image ? recipe.image : recipe.imageUrl)
    const [isFavourite, setIsFavourite] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    useEffect(() => {
        setImageUrl(recipe.image ? recipe.image : recipe.imageUrl)
    }, [recipe])
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
        if (favourites.some(fav => fav.reference === id)) {
            setIsFavourite(true)
        } else {
            setIsFavourite(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourites, recipe])
    return (
        <>
            <div className="mb-2 recipe-background position-relative rounded-4" style={{ "--url": `url(${imageUrl})` }}>
                <HeartFill onClick={() => {
                    dispatch(ChangeLoadingAction(true))
                    setTimeout(() => {
                        handleFavourite()
                    }, 2000)
                }
                } onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className=" position-absolute bottom-0 end-0 m-2" size={30} color={(isFavourite || isHovered) ? "red" : "white"} />
            </div>
            <img src={imageUrl} alt={recipe.title ? recipe.title : recipe.name} className="d-none" onError={() => setImageUrl("../no-image.jpg")}></img>
            <h5>{recipe.title ? recipe.title : recipe.name}</h5>
        </>
    )
}

export default RecipeCard