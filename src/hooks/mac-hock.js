/**
 * 
 * desc: npm install address
 * url: https://www.npmjs.com/package/address?activeTab=readme
 * version: ^2.0.1
 * git: https://github.com/node-modules/address
 * 
 */

const { mac } = require('address');


/**
 * function getMacAddress
 * @return String Mac Address "9f-6b-f5-52-ba-37" | bool false
*/
 
const getMacAddress = () => {
  try{
    return mac((err, addr) => {
      if(err) throw new Error(err);
      return addr; // "9f-6b-f5-52-ba-37"
    })
  } catch(err){
    return false;
  }
} 

module.exports = getMacAddress;

