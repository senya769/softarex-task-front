import axios from 'axios'
import authHeader from '../context/AuthHeader';

const ANSWER_BASE_REST_API = (id) => `http://localhost:9090/web-test/users/${id}/answers`
const id = localStorage.getItem('id')


class AnswerService{
    getAllAnswersByUserId(userId){
        return axios.get(ANSWER_BASE_REST_API(userId),authHeader())
    }
    getAnswerById(questId){}
    updateAnswers(answerId,answer){
        return axios.patch(ANSWER_BASE_REST_API(id)+`/${answerId}`,answer,authHeader())
    }
    deleteQuestion(questId){}
}
export default new AnswerService();