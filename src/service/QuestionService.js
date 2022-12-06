import axios from 'axios'
import authHeader from '../context/AuthHeader';

const QUESTION_BASE_REST_API = (id) => `http://localhost:9090/web-test/users/${id}/questions`
const authUserId = localStorage.getItem('id')

class QuestionService{
    getAllAnswersByUserId(userId){
        return axios.get(QUESTION_BASE_REST_API(userId),authHeader())
    }
   async createQuestion(email,question){
        return axios.post(QUESTION_BASE_REST_API(authUserId)+`?email=${email}`,question,authHeader())
    }
    getQuetionById(questId){
        return axios.get(QUESTION_BASE_REST_API(authUserId)+`/${questId}`,authHeader())
    }
    updateQuestion(questId,question){
        return axios.patch(QUESTION_BASE_REST_API(authUserId)+`/${questId}`,question,authHeader())
    }
    deleteQuestion(questId){}
}
export default new QuestionService();