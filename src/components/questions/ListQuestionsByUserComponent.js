import '../../App.css';
import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import QuestionService from '../../service/QuestionService'
import AddQuestionComponent from './AddQuestionComponent';
import EditQuestionComponent from './EditQuestionComponent';

const ListQuetionsComponent = () => {
    const [questions, setQuestions] = useState([])
    const { id } = useParams()
    const history = useNavigate()


    useEffect(() => {
        QuestionService.getAllAnswersByUserId(id).then((response) => {
            setQuestions(response.data)
            console.log(response.data)
        }).catch(err => {
            if(err.response.status==403)(
                history('/login')
            )
        })
    }, [id])

    return (
        <div className="container">
            <h2 className='text-center'>List Questions</h2>
            <AddQuestionComponent/>
            <table className='table table-hover table-light'>
                <thead className='border table-dark bg-secondary'>
                    <th scope="col">ID</th>
                    <th scope="col">For User</th>
                    <th scope="col">Question</th>
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
                                    <td>{question.answer.answer}</td>
                                    <td>
                                    <EditQuestionComponent question={question}  />
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>     
        </div>

    )
}

export default ListQuetionsComponent