const API_BASE = "http://localhost:8080/api";

function getToken(){
    return localStorage.getItem("token");
}

function apiRequest(url, method, body){

    return fetch(API_BASE + url,{
        method:method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + getToken()
        },
        body: body ? JSON.stringify(body) : null
    })
    .then(res=>res.json())
}