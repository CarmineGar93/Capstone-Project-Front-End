import { Card } from "react-bootstrap";

function ProfileCard() {
    return (
        <Card className="border-0 p-4 d-flex flex-column align-items-center">
            <img src="https://placedog.net/100/100" alt="" width={60} height={60} className="rounded-circle" />
            <h5 className="mt-2 mb-4">Name Surname</h5>
            <p className="mb-4">0 Followers - 0 Followed</p>
        </Card>
    )
}

export default ProfileCard