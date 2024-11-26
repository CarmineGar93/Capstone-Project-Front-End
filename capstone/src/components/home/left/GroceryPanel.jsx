import { Button, Card } from "react-bootstrap";

function GroceryPanel() {
    const groceries = [{
        name: "Bread",
        qty: 2,
        unit: "pcs"
    },
    {
        name: "Milk",
        qty: 2,
        unit: "L"
    },
    {
        name: "Chicken breast",
        qty: 300,
        unit: "gr"
    }]
    return (
        <Card className="border-0">
            <h5 className="mb-4 bg-white shadow-sm p-3 text-center">Your active grocery list</h5>
            <div className="p-3">
                {
                    groceries.length === 0 ? (
                        <p className="mb-5">There is no active grocery list</p>
                    ) : (
                        <>

                            {
                                groceries.map((prod, index) => {
                                    return (
                                        <div className="border-bottom border-1 d-flex justify-content-between mb-3">
                                            <p className="mb-0">{index + 1}. {prod.name}</p>
                                            <p className="mb-0">{prod.qty} {prod.unit}</p>
                                        </div>

                                    )
                                })
                            }

                        </>
                    )
                }
            </div>
            <div className="text-center p-3">
                <Button variant="danger">Grocery management</Button>
            </div>



        </Card>
    )
}

export default GroceryPanel