import { Row, Col } from "react-bootstrap"
import globe from './globe.svg'

function HomeInfo() {
    const array = [
        {
            title: "Week planification",
            description: "Thanks to a smooth and very simple interface, the app will help you choose receipts to insert in your weekly plan",
            insertions: [
                {
                    icon: globe,
                    title: "Selection of other users' weekly plan or auto-genereted ones",
                    description: "Don't want to lose time? Choose a plan made by other users or let the system generate automatically one for you",
                },
                {
                    icon: globe,
                    title: "Thousands of receipts available",
                    description: "We offer an huge amount of receipts for your plans. Didn't find the receipt you want? No problem, insert your own recceipts and use them for your plans",
                },
                {
                    icon: globe,
                    title: "Visualization day-by-day of the receipts to perform",
                    description: "Every day our system will show you, in case of an active plan, all the receipts that you will have to execute and all the information needed",
                }
            ]
        },
        {
            title: "Week planification",
            description: "Thanks to a smooth and very simple interface, the app will help you choose receipts to insert in your weekly plan",
            insertions: [
                {
                    icon: globe,
                    title: "Selection of other users' weekly plan or auto-genereted ones",
                    description: "Don't want to lose time? Choose a plan made by other users or let the system generate automatically one for you",
                },
                {
                    icon: globe,
                    title: "Thousands of receipts available",
                    description: "We offer an huge amount of receipts for your plans. Didn't find the receipt you want? No problem, insert your own recceipts and use them for your plans",
                },
                {
                    icon: globe,
                    title: "Visualization day-by-day of the receipts to perform",
                    description: "Every day our system will show you, in case of an active plan, all the receipts that you will have to execute and all the information needed",
                }
            ]
        },
        {
            title: "Week planification",
            description: "Thanks to a smooth and very simple interface, the app will help you choose receipts to insert in your weekly plan",
            insertions: [
                {
                    icon: globe,
                    title: "Selection of other users' weekly plan or auto-genereted ones",
                    description: "Don't want to lose time? Choose a plan made by other users or let the system generate automatically one for you",
                },
                {
                    icon: globe,
                    title: "Thousands of receipts available",
                    description: "We offer an huge amount of receipts for your plans. Didn't find the receipt you want? No problem, insert your own recceipts and use them for your plans",
                },
                {
                    icon: globe,
                    title: "Visualization day-by-day of the receipts to perform",
                    description: "Every day our system will show you, in case of an active plan, all the receipts that you will have to execute and all the information needed",
                }
            ]
        }

    ]
    return (
        <>
            {
                array.map((section, index) => {
                    return (
                        <Row className="mb-5">
                            <Col xs={12} md={6} className={`d-flex mb-3 mb-md-0 align-items-center ${index % 2 === 1 ? " order-md-1" : ""}`}>
                                <div>
                                    <h2>{section.title}</h2>
                                    <p>{section.description}</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                {
                                    section.insertions.map(row => {
                                        return (
                                            <Row className="mb-4">
                                                <Col xs={"auto"} className={`d-flex ${index % 2 === 1 ? "justify-content-start" : "justify-content-end"} align-items-start`}>
                                                    <div className=" bg-body-secondary p-2 p-xl-3 rounded-3 d-flex justify-content-center align-items-center">
                                                        <div>
                                                            <img src={row.icon} alt="" />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={10}>
                                                    <h5>{row.title}</h5>
                                                    <p>{row.description}</p>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    )
                })
            }
        </>

    )
}

export default HomeInfo