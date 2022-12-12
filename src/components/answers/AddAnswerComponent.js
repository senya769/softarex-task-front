import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import AnswerService from '../../service/AnswerService';

const AddAnswerComponent = (props) => {
    var mas = []
    const [answer, setanswer] = useState(props?.answer?.answer)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveAnswer = (e) => {
        e.preventDefault()
        const answerDto = {
            answer: answer
        }
        if (mas.length !== 0) {
            answerDto.answer = mas.toString()
        }
        AnswerService.updateAnswers(props.answer.id, answerDto).catch(err => {
            console.log(JSON.stringify(err.response.data))
        })
        handleClose()
    }

    const addCheckedValueInArray = (e) => {
        if (e.target.checked) {
            mas.push(e.target.value)
        } else {
            const index = mas.indexOf(e.target.value);
            if (index !== -1) {
                mas.splice(index, 1);
            }
        }
        console.log(mas)
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
                    <form>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={(e) => { addCheckedValueInArray(e) }} name="check" value="Milk"
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                                Milk
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={(e) => { addCheckedValueInArray(e) }} name="check" value="Bread" />
                            <label class="form-check-label" for="flexCheckChecked">
                                Bread
                            </label>
                        </div>
                    </form>
                )
            case "RADIO_BUTTON":
                return (
                    <div>
                        <div class="form-check form-check-inline">
                            <input type="radio" name="radio" value="Yes"
                                checked={answer === 'Yes' ? true : false}
                                defaultChecked={true}
                                onChange={(e) => setanswer(e.target.value)}
                            />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input type="radio" name="radio" value="No"
                                checked={answer === 'No' ? true : false}
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
                        <select class="form-select" multiple aria-label="multiple select example"
                            onChange={(e) => { setanswer(e.target.value) }}>
                            <option selected={answer === 'One'} value="One">One</option>
                            <option selected={answer === 'Two'} value="Two">Two</option>
                            <option selected={answer === 'Three'} value="Three">Three</option>
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
                <FontAwesomeIcon icon={faPenToSquare} className='text-secondary' size='lg' />
            </Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Answer the Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-input'>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Email</label>
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
                    <Button variant="primary" onClick={(e) => { saveAnswer(e) }}>
                        Answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddAnswerComponent