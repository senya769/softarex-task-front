import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import QuestionService from '../../service/QuestionService'
import UserService from '../../service/UserService'

const EditQuestionComponent = (props) => {
    const [users, setusers] = useState([])
    const [question, setQuestion] = useState()
    const [questionError, setQuestionError] = useState()
    const [questionId, setQuestionId] = useState()
    const [email, setEmail] = useState()
    const [typeAnswer, setTypeAnswer] = useState()
    const [answer, setAnswer] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setQuestion(props?.question?.question)
        setQuestionId(props?.question?.id)
        setEmail(props?.question?.answer?.user.email)
        setTypeAnswer(props?.question?.typeAnswer)
        setAnswer(props?.question?.answer.answer)
        UserService.getAllUsers().then(resp => {
            setusers(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, [props])

    const deleteQuestion = () => {
        QuestionService.deleteQuestionById(questionId).catch(err => {
            console.log(err)
        })
    }

    const updateQuestion = (e) => {
        e.preventDefault()
        const questionUpdate = {
            "typeAnswer": typeAnswer,
            "question": question
        }
        QuestionService.updateQuestion(props.question.id, questionUpdate).then(function () {
            handleClose()
        }).catch(err => {
            setQuestionError(err.response.data.details.question)
            console.log(err.response.data.message)
        })
    }

    return (
        <div>
            <Link onClick={handleShow}>
                <FontAwesomeIcon icon={faPenToSquare} className='text-secondary' size='lg' />
            </Link>
            <Link onClick={deleteQuestion}>
                <FontAwesomeIcon icon={faTrash} className="text-secondary mx-3" size='1x' />
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
                                            (JSON.parse(localStorage.getItem('email')) !== user.email) &&
                                            <option>{user.email}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Question*</label>
                                {(questionError) &&
                                    <span className='text-danger mx-2'>{questionError}</span>}
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