import http from "k6/http"
import { check } from "k6"
const tokens = open('token.json')
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
    let token = JSON.parse(tokens)
    let res = http.get(
        "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations"
        , {
            headers: {
                Authorization: `${token.admin}`
            }
        });
    check(res, {
        "status is 200": (r) => r.status === 200
    })
}