import React from 'react'
import { useState,useEffect } from 'react'
import AnswerService from '../../service/AnswerService'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const AddAnswerComponent = (props) => {
    const [answer, setanswer] = useState(props?.answer?.answer)
    const values = []
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveAnswer = () => {
        const answerDto = {
            "answer": answer
        }
        AnswerService.updateAnswers(props.answer.id, answerDto).then((resp) => {
            window.location.reload()
        }).catch(err => {
            alert(JSON.stringify(err.response.data))
        })
    }

    function getForm(type) {
        switch (type) {
            case "SINGLE_LINE":
                return (
                    <div>
                        <input type="text" class="form-control"
                            value={answer}
                            onChange={(e) => setanswer(e.target.value)} />
                    </div>
                )

            case "MULTILINE":
                return (
                    <div>
                        <div className='my-1'>
                            <textarea name="Text1" cols="60" rows="5"
                                value={answer}
                                onChange={(e) => setanswer(e.target.value)}></textarea>
                        </div>
                    </div>
                )
            case "CHECKBOX":
                return (
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="s" id="check" value="Milk" 
                            checked
                            />
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
                        <div class="form-check form-check-inline">
                            <input type="radio" name="radio" value="Yes"
                                checked={answer == 'Yes' ? true : false}
                                defaultChecked={true}
                                onChange={(e) => setanswer(e.target.value)}
                            />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input type="radio" name="radio" value="No"
                                checked={answer == 'No' ? true : false}
                                onChange={(e) => setanswer(e.target.value)} />
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
                            <option selected = {answer == 'One'?true:false} value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                )

            default:
                return (<div>
                    <input type="date" class="form-control"
                        value={answer}
                        onChange={(e) => { setanswer(e.target.value) }} />
                </div>
                )
        }
    }
    return (
        <div>
            <Link onClick={handleShow} className="mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
            </Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-input'>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Email address</label>
                            <input type="email"
                                class="form-control"
                                value={props?.answer?.question?.user.email}
                                placeholder="name@example.com" disabled />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Question</label>
                            <input type="text"
                                value={props?.answer?.question?.question}
                                class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Answer</label>
                            {getForm(props?.answer?.question?.typeAnswer)}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { saveAnswer() }}>
                        Answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddAnswerComponent