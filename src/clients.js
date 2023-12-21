const getMacAddress = require("./hooks/mac-hock");
const axios = require('axios').default;
require('dotenv').config()

class TokenClient{
  mac_addr = null;
  host = null;
  config = null; 

  constructor(){
    this.host = process.env.SERVER || 3000;
  } 

  /**
   * function getMacAddress
   * @returns String "9f-6b-f5-52-ba-37"
   */
  get getMacAddress(){
    return getMacAddress();
  }

  /**
   * function inti
   * @param { {name: String, project_name: String, user_name: String, password: String} } options
   * @return Boolean
   * 
  */

  init(options = null){
    try{ 
      if(!options) throw new Error("Bad Request.");
      this.config = {...options, mac_addr: this.getMacAddress}; 
      return true;
    } catch(err){
      return false;
    } 
  }

  /**
   * function registerAccress
   * @return Promise<any>
   */
  registerAccress = () => {
    return new Promise(async (resolve, reject) => { 
      if(!this.config) reject("Bad Request");  
      await axios.post(`${this.host}/auth/sign-in`, this.config).then(res => {
        if(res.status !== 200) throw new Error(res)
        resolve({
          status: true,
          message: "success."
        });
      }).catch(err => reject(err)) 
    })
  }

  /**
   * 
   * @param { String } user_name 
   * @param { String } password 
   * @returns Promise Object
  */

  generateToken = (user_name, password) => {
    return new Promise(async (resolve, reject) => {
      await axios.post(`${this.host}/auth/token`, {name: user_name, password: password, mac_addr: this.getMacAddress}).then(res => {
        if(res.status !== 200) throw new Error(res) 
        resolve({
          status: true,
          data: res.data,
          token: res.data.token
        })
      }).catch(err => {  
        reject(err)
      }) 
    })
    
  } 

  /** 
   * function textAccess
   * @param {String} token
   * @return Promise String;
   * 
  */

  textAccess = (token) => {
    return new Promise(async (resolve, reject) => {
      if(!token) reject("Unauthorized"); 
      await axios.get(`${this.host}/`, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ` + token,
        }
      }).then(res => {
        if(res.status !== 200) throw new Error(res)
        resolve(res.data);
      }).catch(err => reject(err));
    })
  }

}

module.exports = TokenClient; 
