import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
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
    const { id } = useParams()
    const history = useNavigate()

    useEffect(() => {
        QuestionService.getAllQuestionsByUserId(id).then((response) => {
            setQuestions(response.data)
            console.log(response.data)
        }).catch(err => {
            if (err.response.status === 403) (
                history('/login')
            )
        })
        const sock = new SockJS(SOCKET_URL)
        const stomp = Stomp.over(sock)
        stomp.connect(authHeader(), function (frame) {
            console.log('connect ')
            stomp.subscribe('/topic/questions', function (msg) {
                setQuestions(JSON.parse(msg.body))
            })
        })
    }, [id, history])

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
        </div>

    )
}

export default ListQuetionsComponent