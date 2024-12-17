import { Col, Container, Row } from "react-bootstrap";
import HomeSidebar from "./HomeSidebar";
import CalendarPlan from "./right/CalendarPlan";
import HomeCentral from "./central/HomeCentral";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RemovePlansAction, RemoveUserAction, RetrieveActivePlan, RetrieveFavouritesAction, RetrieveUserAction } from "../../redux/actions";
import { toast } from "react-toastify";

export const differenceBetweenDates = (date1, date2) => {
    const tsDifference = date1.getTime() - date2.getTime();
    return Math.floor(tsDifference / (1000 * 60 * 60 * 24));
};

function Home() {
    const token = localStorage.getItem("token")
    const lastUpdatePlans = localStorage.getItem("updatedAt")
    const user = useSelector(state => state.user.logged)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const updatePlansStatus = async () => {
        try {
            const response = await fetch("http://localhost:3001/plans/myplans", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                localStorage.setItem("updatedAt", new Date())
                if (!user) {
                    dispatch(RetrieveUserAction(token, navigate))
                } else {
                    dispatch(RetrieveActivePlan(token))
                    dispatch(RetrieveFavouritesAction(token))
                }
            } else if (response.status === 401) {
                localStorage.removeItem("token")
                dispatch(RemoveUserAction())
                dispatch(RemovePlansAction())
                toast.warn("You must re-do login")
                navigate("/explore")
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/auth/login")
        } else {
            const lastUpdate = new Date(lastUpdatePlans)
            const today = new Date()
            const monday = new Date()
            monday.setDate(today.getDate() - ((today.getDay() === 0 ? 7 : today.getDay()) - 1))
            if (differenceBetweenDates(today, lastUpdate) > 6 || ((lastUpdate < monday) && (lastUpdate.getDate() !== monday.getDate()))) {
                updatePlansStatus()
                console.log("Up")
            } else if (!user) {
                dispatch(RetrieveUserAction(token, navigate))
            } else {
                dispatch(RetrieveActivePlan(token))
                dispatch(RetrieveFavouritesAction(token))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, user])
    return (
        <Container className="my-5">
            {
                user && (
                    <Row className="g-3">
                        <Col xs={12} md={5} xl={4}><HomeSidebar child1={<CalendarPlan />} /></Col>
                        <Col xs={12} md={7} xl={8} className=" order-last order-md-0"><HomeCentral /></Col>
                    </Row>
                )
            }

        </Container>
    )
}

export default Home