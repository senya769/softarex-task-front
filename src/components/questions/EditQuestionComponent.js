import React from 'react'
import QuestionService from '../../service/QuestionService'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../service/UserService'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const EditQuestionComponent = (props) => {
    const [users, setusers] = useState([])

    const [question, setQuestion] = useState()
    const [email, setEmail] = useState()
    const [typeAnswer, setTypeAnswer] = useState()
    const [answer, setAnswer] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setQuestion(props?.question?.question)
        setEmail(props?.question?.answer?.user.email)
        setTypeAnswer(props?.question?.typeAnswer)
        setAnswer(props?.question?.answer.answer)
        UserService.getAllUsers().then(resp => {
            setusers(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, [props])

    const updateQuestion = (e) => {
        e.preventDefault()
        const questionUpdate = {
            "typeAnswer": typeAnswer,
            "question": question
        }
        QuestionService.updateQuestion(props.question.id, questionUpdate).then(resp => {
            window.location.reload()
        }).catch(err => {
            alert(JSON.stringify(err.response.status))
        })
    }
    return (
        <div>
            <Link variant="primary" onClick={handleShow} className="mx-2" >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
            </Link>
            <Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </Link>
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
                                    value={email}
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
                                <input type="text" class="form-control"
                                    onChange={(e) => setQuestion(e.target.value)}
                                    value={question}
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Answer Type*</label>
                                <select class="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setTypeAnswer(e.target.value)}
                                    value={typeAnswer}>
                                    <option>DATE</option>
                                    <option>SINGLE_LINE</option>
                                    <option>MULTILINE</option>
                                    <option>RADIO_BUTTON</option>
                                    <option>CHECKBOX</option>
                                    <option>COMBOBOX</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect2">Answer*</label>
                                <input value={answer} type="text" class="form-control" readOnly />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => { updateQuestion(e) }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditQuestionComponent