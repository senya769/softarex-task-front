import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import QuestionService from '../../service/QuestionService';
import UserService from '../../service/UserService';

const AddQuestionComponent = () => {
    const [users, setusers] = useState([])
    const [question, setQuestion] = useState()
    const [email, setEmail] = useState('')
    const [typeAnswer, setTypeAnswer] = useState("DATE")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        UserService.getAllUsers().then(resp => {
            setusers(resp.data)
            // setEmail(resp.data[0].email)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function getForm(type) {
        switch (type) {
            case "SINGLE_LINE":
                return (
                    <div>
                        <input type="text" class="form-control" readOnly />
                    </div>
                )

            case "MULTILINE":
                return (
                    <div>
                        <div className='my-1'>
                            <textarea name="Text1" cols="60" rows="5" readOnly ></textarea>
                        </div>
                    </div>
                )
            case "CHECKBOX":
                return (
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="check" value="Milk" readOnly />
                            <label class="form-check-label" for="flexCheckDefault">
                                Milk
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="flexCheckDefault" value="Bread" readOnly />
                            <label class="form-check-label" for="flexCheckChecked">
                                Bread
                            </label>
                        </div>
                    </div>
                )
            case "RADIO_BUTTON":
                return (
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" readOnly />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked readOnly />
                            <label class="form-check-label" for="flexRadioDefault2">
                                No
                            </label>
                        </div>
                    </div>
                )
            case "COMBOBOX":
                return (
                    <div>
                        <select class="form-select" multiple aria-label="multiple select example" readOnly>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                )

            default:
                return (
                    <div >
                        <input type="date" class="form-control" readOnly />
                    </div>
                )
        }
    }

    const saveQuestion = (e) => {
        e.preventDefault()
        const questionSave = {
            "typeAnswer": typeAnswer,
            "question": question
        }
        QuestionService.createQuestion(email, questionSave).catch(err => {
            alert(JSON.stringify(err.response.data))
        })
        handleClose()
    }

    return (
        <div>
            <Link variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-question-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
            </Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-input'>
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Email*</label>
                                <select class="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setEmail(e.target.value)}>
                                    <option value="" disabled selected>Select Email</option>
                                    {
                                        users.map(user =>
                                            (JSON.parse(localStorage.getItem('email')) !== user.email) &&
                                            <option>{user.email}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Question*</label>
                                <input type="text" class="form-control" placeholder='Enter your question'
                                    onChange={(e) => setQuestion(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Answer Type*</label>
                                <select class="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setTypeAnswer(e.target.value)}>
                                    <option>DATE</option>
                                    <option>SINGLE_LINE</option>
                                    <option>MULTILINE</option>
                                    <option>RADIO_BUTTON</option>
                                    <option>CHECKBOX</option>
                                    <option>COMBOBOX</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Answer</label>
                                {getForm(typeAnswer)}
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => { saveQuestion(e) }}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddQuestionComponent