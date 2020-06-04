import React from 'react'
import RequestService from './RequestService'

const BASE_URL = "https://subway-times-api.herokuapp.com"

class NetworkService {

  getStarredStops(){
    const url = `${BASE_URL}/starred_stops`
    return RequestService.getRequest(url)
  }

  getOneStarredStop(stopId){
    const url = `${BASE_URL}/starred_stops/${stopId}`
    return RequestService.getRequest(url)
  }

  getStopArrivals(lineId, stopId){
    const url = `${BASE_URL}/find?line_id=${lineId}&stop_id=${stopId}`
    return RequestService.getRequest(url)
  }

  // Auth



  // getArticles(){
  //   var url = `${BASE_URL}/search/v2/articlesearch.json${API_KEY}`
  //   return RequestService.getRequest(url)
  // }
  //
  // getTopStories(){
  //   var url = `${BASE_URL}/topstories/v2/technology.json${API_KEY}`
  //   return RequestService.getRequest(url)
  // }

}

export default new NetworkService()
