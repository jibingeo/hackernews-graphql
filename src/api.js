import request from 'request-promise';

const getUrl = (url) => {
  console.log(url)
  return request({
    url,
    json: true
  })
}

const getItem = (Id) => {
  return getUrl(`https://hacker-news.firebaseio.com/v0/item/${Id}.json`)
}

const getTopStories = () => {
  return getUrl(`https://hacker-news.firebaseio.com/v0/topstories.json`)
}

export {
  getItem,
  getTopStories
}
