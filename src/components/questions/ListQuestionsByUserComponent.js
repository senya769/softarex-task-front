import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import '../../App.css';
import authHeader from '../../context/AuthHeader';
import QuestionService from '../../service/QuestionService';
import AddQuestionComponent from './AddQuestionComponent';
import EditQuestionComponent from './EditQuestionComponent';

const SOCKET_URL = 'http://localhost:9090/web-test/ws';

const ListQuetionsComponent = () => {
    const [questions, setQuestions] = useState([])
    var [page, setPage] = useState(1)
    var [size, setSize] = useState(3)
    var [maxSize, setMaxSize] = useState(100)
    const { id } = useParams()
    const history = useNavigate()

    function clickPagePrev() {
        if (page > 1) {
            setPage(page - 1)
            loadQuestions(page - 1, size)
        }
    }
    function clickPageNext() {
        if (page++ < maxSize) {
            loadQuestions(page, size)
            setPage(page)
        }
    }

   async function loadQuestions(pageR, sizeR) {
        QuestionService.getAllQuestionsByUserId(id, pageR, sizeR).then((response) => {
            if (response.data.length !== 0) {
                setQuestions(response.data)
            } else {
                setMaxSize(pageR)
                if(pageR > 1){
                setPage(pageR - 1)
                }
            }
            console.log(response.data)
        }).catch(err => {
            if (err.response.status === 403) (
                history('/login')
            )
        })
    }

    function changeSizeElements(e) {
        setSize(e.value)
        setPage(1)
        loadQuestions(1, e.value)
    }

    useEffect(() => {
        loadQuestions(page, size)
        const sock = new SockJS(SOCKET_URL)
        const stomp = Stomp.over(sock)
        stomp.connect(authHeader(), function () {
            console.log('connect ')
            stomp.subscribe(`/topic/questions/${id}`, function (msg) {
                setQuestions(JSON.parse(msg.body))
                if (JSON.parse(msg.body).length === 0) (
                    clickPagePrev()
                )
            })
        })
    }, [id, history, page, size])

    return (
        <div className="container">
            <h2 className='text-center'>List Questions</h2>
            <AddQuestionComponent />
            {(questions.length === 0) &&
                <div className='text-center'>
                    <h3>You haven't asked any questions yet</h3>
                </div>
                ||
                <table className='table table-hover table-light'>
                    <thead className='border table-dark bg-secondary'>
                        <th scope="col">ID</th>
                        <th scope="col">For User</th>
                        <th scope="col">Question</th>
                        <th scope="col">Answer type</th>
                        <th scope="col">Answer</th>
                        <th scope="col">Action</th>
                    </thead>
                    <tbody>
                        {
                            questions.map(
                                question =>
                                    <tr key={question.id}>
                                        <td>{question.id}</td>
                                        <td>{question.answer.user.email}</td>
                                        <td>{question.question}</td>
                                        <td>{question.typeAnswer}</td>
                                        <td>{question.answer.answer}</td>
                                        <td>
                                            <EditQuestionComponent question={question} />
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            }
            {(questions.length !== 0) &&
                <div class="d-flex justify-content-end">
                    <div class="col-6">
                        <Pagination>
                            <Pagination.Prev onClick={() => clickPagePrev()} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={() => clickPageNext()} />
                        </Pagination>

                    </div>
                    <div class="col-1">
                        <select className='form-control h-60 w-50 text-center'
                            onChange={(e) => { changeSizeElements(e.target) }}>
                            <option>3</option>
                            <option>5</option>
                            <option>8</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>
            }
        </div>
    )
}

export default ListQuetionsComponent