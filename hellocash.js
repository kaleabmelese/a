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
    login: async (principal,credentials,system="lucy")=>{
        let body = {
            "principal": principal,
            "credentials": credentials,
            "system": system
        }
        return (await axios.post(`${baseURL}/authenticate`,body)).data.token;
    },
    getInvoices: async (param,token)=>{
        let config = {
            url: `${baseURL}/invoices`,
            method: "get",
            headers: {authorization:`Bearer ${token}`},
            params: param
         }
         return (await axios(config)).data;
    },
    postInvoices: async (invoice,token)=>{
        let config = {
            url: `${baseURL}/invoices`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data; 
    },
    validateInvoice: async (invoice,token) =>{
        let config = {
            url: `${baseURL}/invoices/validate`,
            method: "post",
            headers: {authorization:`Bearer ${token}`},
            data: invoice
        }
        return (await axios(config)).data; 
    },
    deleteInvoice: async (id,token)=>{
        let config = {
            url: `${baseURL}/invoices?id=${id}`,
            method: "delete",
            headers: {authorization:`Bearer ${token}`},
        }  
        return (await axios(config)).data;
    }
    
}

hellocash.login("1416563","lucy1234").then(res=>{
    console.log(res);
  hellocash.getInvoices({offset:1,limit:1,id:PS7694GXT1N749ZJ0SY6EEJBE1J9EOBY},res).then(res=>{console.log(res)},err=>{console.log("s")})
   //hellocash.deleteInvoice("PS7694GXT1N749ZJ0SY6EEJBE1J9EOBY",res).then(res=>{console.log(res)},err=>{console.log(err.response.data)})
},err=>{
    console.log(err.data);
});
