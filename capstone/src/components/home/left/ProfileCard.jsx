import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProfileCard() {
    const user = useSelector(state => state.user.logged)
    return (
        <Card className="border-0 p-4 d-flex flex-column align-items-center">
            <img src={user.avatarUrl} alt="" width={70} height={70} className="rounded-circle" />
            <h5 className="mt-2 mb-4">{user.name} {user.surname}</h5>
            <p className="mb-4">0 Followers - 0 Followed</p>
        </Card>
    )
}

export default ProfileCard