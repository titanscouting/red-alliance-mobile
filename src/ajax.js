const apiHost = 'https://scouting-api.herokuapp.com/';
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MmZhNjM3YWY5NTM1OTBkYjhiYjhhNjM2YmYxMWQ0MzYwYWJjOTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjkxODYzNjk4MjQzLWVnNWk0ZmgwMDFuN3NsMjhiMGJxZ3A0aDJ2YWU5Z24yLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjkxODYzNjk4MjQzLWVnNWk0ZmgwMDFuN3NsMjhiMGJxZ3A0aDJ2YWU5Z24yLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNTE1NzM0ODQ3MDM4MTA0MjA5IiwiaGQiOiJpbXNhLmVkdSIsImVtYWlsIjoiaWZvd2xlckBpbXNhLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSFR4SjE5VnctcjAxb0Q0LXBmSVoxQSIsIm5hbWUiOiJJYW4gRm93bGVyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tMTNWdHN4SXZFRjQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyY2t4QkswN1ExdGNaaVdxQnlTeUQycGR1ODFSdy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiSWFuIiwiZmFtaWx5X25hbWUiOiJGb3dsZXIiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4MTgwMjg4MCwiZXhwIjoxNTgxODA2NDgwLCJqdGkiOiIxNDIxOTdiNDA2YmQ0YzllMTIzMDUxZGE3MzhiNmM0MjNkYjhmNzUzIn0.FmeFF29k-4DpPxQmVeR3agMbteNXHdjtq-AtjKOG1nuoQRXnwgvfQxJSReSHSyoQiVSLCxOHH-SAau2ZQOedQbFpN-zSDzxJqWYKJtj1HxIT8RExmqV0d_iYvRKNAwE9RATiT-dGCNsmYEyoX3esGa1M7YpkVuNEJjIoxGmCm-W7qGzxXutculBJ79uWlrSTIV-_WfSsil1Dvf40p_fR749KwGRwy9IfgeT108BcH7QBgEm2ysxajP5k2Gtam7FWdfsTYRTFEXV8HY9cQ5MUvRI28TyYhS7hBV53P9Es24E02Qs4jnjYNAtCy34tlpO5XlQXXCOWLq-QFr4rI71F4Q';


export default {

    isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },


    async fetchMatches(competition) {
        const endpoint = encodeURI(apiHost + "api/fetchMatches?competition="+competition);
        
        try {
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                }
            }).then((response) => {
                return response.json();
            }).then((myJson) => {
                console.warn(myJson);
            });
        } catch(error) {
            console.error(error);
        }
    },

    async submitMatchData() {
        const endpoint = apiHost + "api/submitMatchData";
        try {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    competition_id: 'Central2020',
                    match_number: '12',
                    team_scouted: '2042',
                    data : '{"myfavoritecolor":"blue"}'
                }),
            }).then((response) => {
                return response.json();
            }).then((myJson) => {
                console.warn(myJson);
            })
            // let responseJson = await JSON.parse(response);
            // console.warn("This is from dev: "+responseJson);
        } catch(error) {
            console.error(error);
        }
    }





};