import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import QuestionService from '../../service/QuestionService';
import UserService from '../../service/UserService';

const AddQuestionComponent = () => {
    const [users, setUsers] = useState([])
    const [question, setQuestion] = useState()
    const [email, setEmail] = useState('')
    const [typeAnswer, setTypeAnswer] = useState("DATE")
    const [emailError, setEmailError] = useState()
    const [questionsError, setQuestionError] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setEmailError('')
        setQuestionError('')
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        UserService.getAllUsers().then(resp => {
            setUsers(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const saveQuestion = (e) => {
        e.preventDefault()
        const questionSave = {
            "typeAnswer": typeAnswer,
            "question": question
        }
        QuestionService.createQuestion(email, questionSave).then(function () {
            setEmail('')
            setQuestion('')
            handleClose()
        })
            .catch(err => {
                const questionErrorMessage = err?.response?.data?.details?.question
                const emailErrorMessage = err?.response?.data?.details?.Value
                if (questionErrorMessage) {
                    setQuestionError(questionErrorMessage)
                }
                if (emailErrorMessage) {
                    setEmailError(emailErrorMessage.slice(19))
                }
                if (err.response.status == 500) {
                    window.location.reload()
                }
            })
    }

    return (
        <div>
            <div className='navbar navbar-dark justify-content-end '>
                <Link className='btn btn-primary my-1' onClick={handleShow}>
                    Add Question
                    <FontAwesomeIcon icon={faClipboardQuestion} className='mx-2' />
                </Link>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-input'>
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Email*</label>
                                {(emailError) &&
                                    <span className='text-danger'>{emailError}</span>}
                                <select class="form-control" id="exampleFormControlSelect1"
                                    onChange={(e) => setEmail(e.target.value)}
                                >
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
                                {(questionsError) &&
                                    <span className='text-danger mx-1'>{questionsError}</span>}
                                <input type="text" class="form-control" placeholder='Enter your question'
                                    onChange={(e) => setQuestion(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Answer Type*</label>
                                <select class="form-control" id="exampleFormControlSelect1"
                                    value={typeAnswer}
                                    onChange={(e) => setTypeAnswer(e.target.value)}>
                                    <option>DATE</option>
                                    <option>SINGLE_LINE</option>
                                    <option>MULTILINE</option>
                                    <option>RADIO_BUTTON</option>
                                    <option>CHECKBOX</option>
                                    <option>COMBOBOX</option>
                                </select>
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