import axios from 'axios';
var backendServiceRequest = axios.create(
    {
        baseURL: getBaseURL(),
        headers:{
        "Accept": "*/*",
        "Content-Type": "application/json",

    }
        
    }
);

function getBaseURL(){
    return process.env.NODE_ENV ==="production" ? window.location.protocol + "//" + window.location.host : 'http://192.168.0.103:5000';
}

/**後端API-Setting 控制器 */
export class Setting {
    static async GetModuleSetting(ip) {
        var ret = await backendServiceRequest.get(`/api/Setting/GetModuleSetting/${ip}`)
        console.log(ret.data);
        return ret.data;
    }

    static async SetModuleSetting(settings){
        console.log(settings);
        var ret = await backendServiceRequest.post(`/api/Setting/ModifyModuleSetting`, JSON.stringify(settings),{
            headers:{
                "Content-Type": "application/json",
            }
        });
        console.log(ret.data);
        return ret.data;
    }

    static async ResetHitNumToday(ip){
        await backendServiceRequest.get(`/api/Setting/ResetHitNumToday/${ip}`);
    }
}

export class Query{
    static async GetIPList(){
        return (await backendServiceRequest.get('api/Query/GetIPList')).data;
    }
    static async QueryData(condition){
     return backendServiceRequest.post('api/Query/QueryData',condition).then(res=>{
          return res.data;
      }).catch(e=>{
          console.log('err',e);
          return 'error'
      });
    }
}