import { Link } from "react-router-dom";
import ImageInput from "../components/ImageInput";
import serializeForm from  "form-serialize";

const CreateContact = ({onCreateContact}) => {

    // OnSubmit Handler
    const onSubmitHandler = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true }); // { hash: true } : To return form Fields value into an object
        onCreateContact(values);
    }

    return (
        // Create New Contact Page
        <div>
            <Link className="close-create-contact" to="/">Close</Link>
            {/* Create New Contact Form */}
            <form onSubmit={onSubmitHandler} className="create-contact-form">
                <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64}/>
                <div className="create-contact-details">
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="handle" placeholder="Handle" />
                    <button>Create Conatct</button>
                </div>
            </form>
        </div>
    )
}

export default CreateContact;