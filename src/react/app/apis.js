// import { post }     from "./../base/portal";
// import config       from "../config";

// export function getLocalstorage( key){
//     return localStorage.getItem(key);
// }

// export function setLocalstorage( key, value){
//     localStorage.setItem(key, value);
// }

// export function removeLocalstorage( key){
//     localStorage.removeItem(key);
// }

export function CheckToken(token) {
    return new Promise(function(resolve,reject){
        fetch( "https://matarstars.com/v1/api/auth/me?token="+token )
       .then(function(response){
            resolve(response.json());
        }).catch(err=>{
            reject(err);
        });
    });
}

export function insertCarForm(data) {
    return new Promise(function(resolve,reject){
        fetch("https://matarstars.com/flask/car_form_submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.status === 200){
                return response.json();
            }else{
                return {};
            }
        }).then(function(response){
            resolve(response);
        }).catch(err=>{
            reject(err);
        });
    });
}
export function getCarFormSubmit(data) {
    return new Promise(function(resolve,reject){
        fetch("https://matarstars.com/flask/get_car_form_submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            resolve(res.data);
        }))
        .catch(err=>{
            reject(err);
        });    
    });
}

export function getinfoByContractId(data) {
    return new Promise(function(resolve,reject){
        fetch("https://matarstars.com/flask/get_info_by_contract_id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            resolve(res.data);
        }))
        .catch(err=>{
            reject(err);
        });    
    });
}

export function getListDriverByContractId(data) {
    return new Promise(function(resolve,reject){
        fetch("https://matarstars.com/flask/get_list_driver_by_contract_id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            resolve(res.data);
        }))
        .catch(err=>{
            reject(err);
        });    
    });
}

// export function getCarFormSubmit(data) {
//     return new Promise(function(resolve,reject){
//         fetch("https://matarstars.com/flask/get_car_form_submit", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         }).then(response => 
//             response.json().then(data => ({
//                 data: data,
//                 status: response.status
//             })
//         ).then(res => {
//             resolve(res.data);
//         }))
//         .catch(err=>{
//             reject(err);
//         });    
//     });
// }

export function findDriver(data) {
    return new Promise(function(resolve,reject){
        fetch("https://matarstars.com/flask/find_driver", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            resolve(res.data);
        }))
        .catch(err=>{
            reject(err);
        });    
    });
}


export function assignDriver(data) {
    return new Promise(function(resolve,reject){
        fetch("https://matarstars.com/flask/assign_driver", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            resolve(res.data);
        }))
        .catch(err=>{
            reject(err);
        });    
    });
}