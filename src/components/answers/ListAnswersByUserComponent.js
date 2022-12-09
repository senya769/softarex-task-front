import '../../App.css';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AnswerService from '../../service/AnswerService'
import AddAnswerComponent from './AddAnswerComponent';
import "./answer.css"
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import authHeader from '../../context/AuthHeader';

const SOCKET_URL = 'http://localhost:9090/web-test/ws';

const ListAnswersByUserComponent = () => {
    const [answers, setAnswers] = useState([])
    const { id } = useParams()
    const history = useNavigate()

    useEffect(() => {
        AnswerService.getAllAnswersByUserId(id).then((response) => {
            setAnswers(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
            if (error.response.status === 403) (
                history('/login')
            )
        })
        const sock = new SockJS(SOCKET_URL)
        const stomp = Stomp.over(sock)
        stomp.connect(authHeader(), function (frame) {
            console.log('connect ')
            stomp.subscribe('/topic/answers', function (msg) {
                setAnswers(JSON.parse(msg.body))
            })
        })
    }, [id, history])

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
                        <th>Question type</th>
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
                                        <td>{answer?.question?.typeAnswer}</td>
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
        </div>

    )
}

export default ListAnswersByUserComponent