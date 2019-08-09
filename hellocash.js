//var config = require('./accounts')
const axios = require('axios')
const baseURL = 'https://api-et.hellocash.net'
//var token = ''



/*var self = module.exports = {
    login: (who) => {
        return new Promise((resolve, reject) => {
            if (Object.keys(config).includes(who)) {
                var options = {
                    url: config.api.authenticate,
                    method: 'POST',
                    body: config[who],
                    json: true
                }
                rp(options)
                    .then(data => {
                        console.log(data)
                        resolve(data.token)
                    })
                    .catch(err => {
                        reject(err)
                    })
            } else {
                reject({
                    message: `Unknown account ${who}`
                })
            }
        })
    },
    getInvoices: (whose) => {
        return new Promise((resolve, reject) => {
            self.login(whose)
                .then(token => {
                    var options = {
                        url: config.api.invoices,
                        method: 'GET',
                        json: true,
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                    return rp(options)
                })
                .then(invoices => {
                    console.log(invoices)
                    resolve(invoices)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    account: (who) => {
        return new Promise((resolve, reject) => {
            self.login(who).then(token => {
                var options = {
                    url: config.api.accounts,
                    json: true,
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
                return rp(options)
            })
                .then(accounts => {
                    resolve(accounts[0])
                })
                .catch(err => reject(err))
        })
    }
}*/

const hellocash = {
    login: (principal,credentials,system="lucy") => {
         return new Promise((fullfill,failed)=>{
             let body = {
                 "principal": principal,
                 "credentials": credentials,
                 "system": system
             }
             axios.post(`${baseURL}/authenticate`,body).then((res)=>{
                  fullfill(res.data.token);
             },(err)=>{
                   failed(err);
             });
         });
    },
    getInvoices: (param,token)=>{
         return new Promise((fullfill,failed)=>{
             let config = {
                url: `${baseURL}/invoices`,
                method: "get",
                headers: {authorization:`Bearer ${token}`},
                params: param
             }
             axios(config).then(res=>{
                 fullfill(res);
             },err=>{
                 failed(err);
             });
         });
    },
    postInvoices: (invoice,token)=>{
        return new Promise((fullfill,failed)=>{
            let config = {
                url: `${baseURL}/invoices`,
                method: "post",
                headers: {authorization:`Bearer ${token}`},
                data: invoice
            }
            axios(config).then(res=>{
                fullfill(res);
            },err=>{
                console.log(err.response);
                failed(err);
            });        
        });
    },
    
}

hellocash.login("1416563","lucy1234").then(res=>{
    console.log(res);

},err=>{
    console.log(err.data);
});




