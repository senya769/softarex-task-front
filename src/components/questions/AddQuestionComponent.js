import React, { useState, useEffect } from 'react'
import QuestionService from '../../service/QuestionService'
import UserService from '../../service/UserService'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddQuestionComponent = () => {
    const [users, setusers] = useState([])
    const history = useNavigate()

    const [question, setQuestion] = useState()
    const [email, setEmail] = useState()
    const [typeAnswer, setTypeAnswer] = useState("DATE")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        UserService.getAllUsers().then(resp => {
            setusers(resp.data)
            setEmail(resp.data[0].email)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function getForm(type) {
        switch (type) {
            case "SINGLE_LINE":
                return (
                    <div>
                        <input type="text" class="form-control" />
                    </div>
                )

            case "MULTILINE":
                return (
                    <div>
                        <div className='my-1'>
                            <textarea name="Text1" cols="60" rows="5"></textarea>
                        </div>
                    </div>
                )
            case "CHECKBOX":
                return (
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="s" id="check" value="Milk" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Milk
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="s" id="flexCheckDefault" value="Bread" />
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
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                            <label class="form-check-label" for="flexRadioDefault2">
                                No
                            </label>
                        </div>
                    </div>
                )
            case "COMBOBOX":
                return (
                    <div>
                        <select class="form-select" multiple aria-label="multiple select example">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                )

            default:
                return (<div>
                    <input type="date" class="form-control" />
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
        QuestionService.createQuestion(email, questionSave).then(resp => {
            const id = localStorage.getItem('id')
            history(`/users/${id}/questions`)
        }).catch(err => {
            alert(JSON.stringify(err.response.data))
        })
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add question
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-input'>
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Email*</label>
                                <select class="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setEmail(e.target.value)}>
                                    {
                                        users.map(user =>
                                            <option>{user.email}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Question*</label>
                                <input type="text" class="form-control" onChange={(e) => setQuestion(e.target.value)} />
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddQuestionComponent