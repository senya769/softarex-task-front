import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import '../../App.css';
import authHeader from '../../context/AuthHeader';
import AnswerService from '../../service/AnswerService';
import AddAnswerComponent from './AddAnswerComponent';
import "./answer.css";

const SOCKET_URL = 'http://localhost:9090/web-test/ws';

const ListAnswersByUserComponent = () => {
    const [answers, setAnswers] = useState([])
    const { id } = useParams()
    var [page, setPage] = useState(1)
    var [size, setSize] = useState(3)
    var [maxSize, setMaxSize] = useState(100)
    const history = useNavigate()

    function clickPagePrev() {
        if (page > 1) {
            loadAnswers(page - 1, size)
            setPage(page - 1)
        }
    }
    function clickPageNext() {
        if (page++ < maxSize) {
            loadAnswers(page, size)
            setPage(page)
        }
    }

    async function loadAnswers(pageR, sizeR) {
        AnswerService.getAllAnswersByUserId(id, pageR, sizeR).then((response) => {
            if (response.data.length) {
                setAnswers(response.data)
            } else {
                setMaxSize(pageR)
                if (pageR > 1) {
                    setPage(pageR - 1)
                }
            }
            console.log(response.data)
        }).catch(error => {
            console.log(error)
            if (error.response.status === 403) (
                history('/login')
            )
        })
    }

    function changeSizeElements(e) {
        setSize(e.value)
        setPage(1)
        loadAnswers(1, e.value)
    }

    useEffect(() => {
        loadAnswers(page, size)
        const sock = new SockJS(SOCKET_URL)
        const stomp = Stomp.over(sock)
        stomp.connect(authHeader(), function (frame) {
            console.log('connect ')
            stomp.subscribe(`/topic/answers/${id}`, function (msg) {
                setAnswers(JSON.parse(msg.body))
                if (JSON.parse(msg.body).length < 1) (
                    clickPagePrev()
                )
            })
        })
    }, [id, history, page, size])

    return (
        <div className="container">
            <h2 className='text-center'>List Answers</h2>
            <br></br>
            {(answers.length === 0) &&
                <div className='text-center'>
                    <h3>There are no questions for you</h3>
                </div>
                ||
                <table className='table table-hover table-light'>
                    <thead className='border table-dark bg-secondary'>
                        <th className='px-2 bold'>ID</th>
                        <th>From User</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            answers.map(
                                answer =>
                                    <tr key={answer?.id}>
                                        <td>{answer?.id}</td>
                                        <td>{answer?.question?.user?.email}</td>
                                        <td>{answer?.question?.question}</td>
                                        <td>{answer?.answer}</td>
                                        <td>
                                            <AddAnswerComponent answer={answer} />
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            }
            {(answers.length !== 0) &&
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

export default ListAnswersByUserComponent