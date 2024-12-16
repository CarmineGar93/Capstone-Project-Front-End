import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RecipeCard from "../recipes/RecipeCard"
import RecipesPagination from "../plans/RecipesPagination"
import ModifyProfileModal from "./ModifyProfileModal"

function Profile() {
    const user = useSelector(state => state.user.logged)
    const profileId = useParams().profileId
    const [profile, setProfile] = useState(null)
    const favourites = useSelector(state => state.user.favourites)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipePerPage] = useState(6)
    const indexLast = currentPage * recipePerPage
    const indexFirst = indexLast - recipePerPage
    const currentRecipes = favourites.slice(indexFirst, indexLast)
    const [show, setShow] = useState(false)
    const retrieveUser = async () => {
        //da scrivere
    }
    useEffect(() => {
        if (Number(profileId) === user.userId) {
            setProfile(user)
        } else {
            retrieveUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                {
                    profile && (
                        <Col xs={12} lg={10} xl={8} className="bg-white rounded-4 p-5">
                            <Row className="align-items-center mb-8 gy-2">
                                <Col xs={12} md="auto" className="order-md-1"><h1>{profile.name} {profile.surname}</h1></Col>
                                <Col xs="auto" className="order-0"><img src={profile.avatarUrl} alt="" height={100} className="rounded-circle me-1" /></Col>
                                <Col xs="auto" className="order-2 ms-md-auto"><button className="rounded-5 bg-white p-2 px-3 text-nowrap ingredient-btn" onClick={() => setShow(true)}>Modify profile</button></Col>
                            </Row>
                            <h2 className="mb-4">Favourite recipes</h2>
                            <Row xs={2} md={3} className='gy-3 mb-3'>
                                {
                                    currentRecipes.map(recipe => {
                                        return (
                                            <Col key={recipe.reference}>
                                                <RecipeCard recipe={recipe} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            <RecipesPagination currentPage={currentPage} setCurrentPage={setCurrentPage} recipePerPage={recipePerPage} totalRecipes={favourites.length} />
                        </Col>
                    )
                }

            </Row>
            <ModifyProfileModal show={show} onHide={() => setShow(false)} user={user} />
        </Container>
    )
}

export default Profile