import React from 'react'
import { useState } from 'react'
import AnswerService from '../../service/AnswerService'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
        if(mas.length !==0){
            answerDto.answer = mas.toString()
        }
        
        AnswerService.updateAnswers(props.answer.id, answerDto).then((resp) => {
            window.location.reload()
        }).catch(err => {
            alert(JSON.stringify(err.response.data))
        })
    }
    const test = (e) => {
        if (e.target.checked) {
            console.log(e.target.value)
            mas.push(e.target.value)
        } else {
            const index = mas.indexOf(e.target.value);

            if (index !== -1) {
               var del = mas.splice(index, 1);
            }
            console.log("index" +index + ' del ' + del)
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
                            <input class="form-check-input" type="checkbox" onChange={(e) => { test(e) }} name="check" value="Milk"
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                                Milk
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={(e) => { test(e) }} name="check" value="Bread" />
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
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