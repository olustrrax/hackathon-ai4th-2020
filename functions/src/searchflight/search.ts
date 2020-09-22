import axios, { AxiosRequestConfig } from 'axios'

const urlCode = `https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/1c16c6ab66eb72e47401110bc977977970238877/ISO3166-1.alpha2.json`
const kiwiFlight = `https://api.skypicker.com/flights`

export const searchFlight = (data) => {
  return new Promise((resolve, reject) => {
    const option: AxiosRequestConfig = {
      url: `${kiwiFlight}`,
      method : 'get',
      params: data,
      responseType: 'json'
    }
    axios(option).then(res => {
      const { data } = res    
      resolve(data.data)
    }).catch(err => reject(err))
  })
}
export const getCodeCountry = (country) => {
  return new Promise((resolve, reject) => {
    const option: AxiosRequestConfig = {
      url: urlCode,
      method : 'get',
      responseType: 'json'
    }
    axios(option).then(res => {
      const { data } = res
      for(let key in data){
          if(data[key].toLowerCase() == country.toLowerCase()){
            // console.log('codeCountry:',key)
            resolve(key)
          }
       }
      reject('try again')
    })
  }) 
}