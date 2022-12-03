import '../../App.css';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AnswerService from '../../service/AnswerService'
import AddQuestionComponent from '../questions/AddQuestionComponent';
import AddAnswerComponent from './AddAnswerComponent';
import EditQuestionComponent from '../questions/EditQuestionComponent';
import { Formik, Field, Form } from 'formik';
import { useSearchParams } from 'react-router-dom';
import './answer.css'

const ListAnswersByUserComponent = (par) => {
    const [answers, setAnswers] = useState([])
    const [info, setInfo] = useState()
    const { id } = useParams()
    const [search,ss] = useSearchParams()
    const value = search.getAll("s") + ' ';


    useEffect(() => {
        AnswerService.getAllAnswersByUserId(id).then((response) => {
            setAnswers(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    function saveAnswer(value){
        setInfo(value)
    }

    return (
        <div className="container">
            <h2 className='text-center'>List Answers</h2>
            <br></br>
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
                                <tr key={answer.id}>
                                    <td>{answer.id}</td>
                                    <td>{answer.question.user.email}</td>
                                    <td>{answer.question.question}</td>
                                    <td>{answer.question.typeAnswer}</td>
                                    <td>{answer.answer}</td>
                                    <td>
                                    <AddAnswerComponent answer={answer}  />
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                
                <p>{par.answer}</p>
            </div>
        </div>

    )
}

export default ListAnswersByUserComponent