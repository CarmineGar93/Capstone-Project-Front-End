import { useRef, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { ArrowLeft, PencilFill } from 'react-bootstrap-icons'
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { RetrieveUserAction } from "../../redux/actions"

function ModifyProfileModal({ show, onHide, user }) {
    const [userFields, setUserFields] = useState({
        name: user.name,
        surname: user.surname
    })
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [img, setImg] = useState(null)
    const [preview, setPreview] = useState(null)
    const [color, setColor] = useState("grey")
    const inputRef = useRef(null)
    const handleChange = (e) => {
        setImg(e.currentTarget.files[0])
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result)
        }

        reader.readAsDataURL(file)
    }
    const uploadAvatar = async () => {
        let formData = new FormData()
        formData.append('avatar', img)
        try {
            const response = await fetch("http://localhost:3001/users/me/avatar", {
                method: 'PATCH',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.ok) {
                toast.success("User updated correctly")
                dispatch(RetrieveUserAction(token))
                reset()
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
    const modifyUser = async () => {
        try {
            const response = await fetch("http://localhost:3001/users/me", {
                method: 'PUT',
                body: JSON.stringify(userFields),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                if (img) {
                    uploadAvatar()
                } else {
                    toast.success("User updated correctly")
                    dispatch(RetrieveUserAction(token))
                    reset()
                }
            } else {
                const error = await response.json()
                throw new Error(error.message)
            }
        } catch (err) {
            toast.error(err)
        }
    }
    const handleSave = (e) => {
        e.preventDefault()
        if (userFields.name === user.name && userFields.surname === user.surname) {
            uploadAvatar()
        } else {
            modifyUser()
        }
    }
    const reset = () => {
        setPreview(null)
        setImg(null)
        setUserFields({
            name: user.name,
            surname: user.surname
        })
        onHide()
    }
    return (
        <Modal show={show} onHide={() => reset()} centered>
            <div className="p-5 position-relative">
                <h3 className="text-center">Modify profile</h3>
                <button className="btn-experience bg-white border-0 rounded-circle p-2 position-absolute top-50 translate-middle" onClick={() => reset()}><ArrowLeft size={25} /></button>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <div className="position-relative">
                    <img src={preview ? preview : user.avatarUrl} alt="" className="rounded-circle" height={100} width={100} />
                    <button className="bg-white border-0 p-1 rounded-circle position-absolute bottom-0 end-0 shadow bg-modify" onMouseEnter={() => setColor("white")} onMouseLeave={() => setColor("grey")} onClick={() => inputRef.current.click()}><PencilFill size={25} color={color} className="p-1" /></button>
                </div>


            </div>
            <div className="p-5 mb-5">
                <Form.Control type="text" value={userFields.name} className="mb-4" onChange={(e) => setUserFields({
                    ...userFields,
                    name: e.target.value
                })}>

                </Form.Control>
                <Form.Control type="text" value={userFields.surname} onChange={(e) => setUserFields({
                    ...userFields,
                    surname: e.target.value
                })}>

                </Form.Control>
                <Form.Control type="file" ref={inputRef} className="d-none" onChange={(e) => handleChange(e)}></Form.Control>

            </div>
            <Button variant="danger" className="rounded-5 mx-5 my-3" disabled={userFields.name === user.name && userFields.surname === user.surname && !img} onClick={(e) => handleSave(e)}>Save</Button>
        </Modal>
    )
}

export default ModifyProfileModal