export default function authHeader() {
    const accessToken = localStorage.getItem('accessToken')
  
    if (accessToken) {
      return { headers:  {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin':'*'
      }};
    } else {
      return {};
    }
  }