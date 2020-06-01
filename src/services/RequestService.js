import React from 'react'

class RequestService {

// async function
  async getRequest(url){
    let data = await (await (fetch(url)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        alert('Error: ', err)
      })
    ))
    return data
  }
}

export default new RequestService()
