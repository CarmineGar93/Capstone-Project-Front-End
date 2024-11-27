import { Alert, Card, Button } from "react-bootstrap"

function ProductsCheck() {
    const check = false;

    return (
        <Card className="border-0">
            <h5 className="mb-3 bg-white shadow-sm p-3 text-center">Your products</h5>
            <div className="p-3">
                {
                    check ? (
                        <Alert variant="danger" className="mb-0">
                            Some products are missing to perform all your weekly recepies
                        </Alert>
                    ) : (
                        <Alert variant="success" className="mb-0">
                            Your products are aligned with your weekly plan
                        </Alert>
                    )
                }
            </div>
            <div className="text-center p-3">
                <Button variant="danger">Products management</Button>
            </div>
        </Card>
    )
}

export default ProductsCheck