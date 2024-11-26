import { Row, Col } from "react-bootstrap"
import globe from './globe.svg'

function ExploreInfo() {
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
            title: "Efficient management of your food products",
            description: "The system provides complete management of the products you currently have available at home",
            insertions: [
                {
                    icon: globe,
                    title: "Manual addition and removal of products",
                    description: "Easily and quickly add purchased products or remove them when used to keep your virtual pantry always up to date",
                },
                {
                    icon: globe,
                    title: "Automatic removal of products needed for selected recipes",
                    description: "At the end of the day, the products required for the recipes in your daily plan will be automatically removed",
                },
                {
                    icon: globe,
                    title: "Product check based on your weekly plan",
                    description: "We will notify you of any missing products based on your chosen weekly plan",
                }
            ]
        },
        {
            title: "Grocery management",
            description: "Create shopping lists quickly and easily based on the products you need. Once the shopping is completed, the system will automatically add the products to your virtual pantry.",
            insertions: [
                {
                    icon: globe,
                    title: "Send a shopping list to your phone",
                    description: "The system allows you to send your lists directly to your phone via message, so you always have them with you",
                },
                {
                    icon: globe,
                    title: "Online grocery ordering",
                    description: "Select one of your shopping lists and order it directly online from the nearest supermarket that offers delivery",
                },
                {
                    icon: globe,
                    title: "Auto-generation of lists based on missing products",
                    description: "The system will automatically generate shopping lists whenever, after setting a weekly plan, a product is missing to complete the chosen recipes",
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

export default ExploreInfo