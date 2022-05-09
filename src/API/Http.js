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
    return process.env.NODE_ENV ==="production" ? window.location.protocol + "//" + window.location.host : 'https://192.168.0.103:4001';
}

/**後端API-Setting 控制器 */
export class Setting {
    /** GET方法 */

    /**
     * 取得指定IP 模組設定
     * @param {string} ip : 模組IP
     * @returns data of http request result
     */
    static async GetModuleSetting(ip) {
        var ret = await backendServiceRequest.get(`/api/Setting/GetModuleSetting/${ip}`)
        console.log(ret.data);
        return ret.data;
    }
    
    /**
     * 重置指定IP之模組當日碰撞次數統計值
     * @param  {String} ip : 模組IP
     */
    static async ResetHitNumToday(ip){
        await backendServiceRequest.get(`/api/Setting/ResetHitNumToday/${ip}`);
    }

    /////POST
    static async SetModuleSetting(settings){
        return await JsonPost(backendServiceRequest,"api/Setting/ModifyModuleSetting",settings);
    }


    static async ModifyEqUnitName(props){
        return await JsonPost(backendServiceRequest,"api/Setting/ModifyEqUnitName",props);
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

    static async GetCsvFile(key){
    
        var filePath = (await (backendServiceRequest.get(`api/Query/GetCsvFile/${key}`))).data;
        return getBaseURL()+"/"+ filePath;
    }
}

/**Post方法 
 * @param {AxiosInstance} axios_instance : axios 實例
 * @param {String} route : api 路徑 ,ex.api/setting/setMdoudleParam
 * @param {Object} jsonData : 要Post出去的物件 ex. { ip:'1.1.1.1' , name:'jsDak'}
 * @return {Object} : Json物件  
*/
async function JsonPost(axios_instance ,  route , jsonData){
    console.log(route,jsonData);
    return axios_instance.post(route,jsonData).then(res=>{
        return res.data;
    }).catch(e=>{
        console.log('err',e);
        return 'error'
    });
}