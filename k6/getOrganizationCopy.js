import http from "k6/http"
import { check } from "k6"



// const tokens = open('token.json')

import { SharedArray } from "k6/data"
const token = new SharedArray('accounts', function() {
    const data = JSON.parse(open('token.json'))
    return data
})

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 300,
    duration: "10s",
    thresholds: {
        http_req_duration: ["p(90) < 94000", "p(95) < 96000", "p(99.9) < 998000"],
        http_req_failed: ["rate<0.01"],
    },
};
export default function () {
    let url = "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations"
    const values = Object.values(token[0])
    let randomToken = values[Math.floor(Math.random() * values.length)]
    const params = {
        headers : {
            Authorization : `Bearer ${randomToken}`
        }
        
    }
    // console.log(values)
    console.log(randomToken)
    const res = http.get(url, params)

}