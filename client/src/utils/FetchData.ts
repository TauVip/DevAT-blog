import axios from 'axios'

export const postAPI = async (url: string, post: object) => {
  const res = await axios.post(`/api/${url}`, post)

  return res
}

export const getAPI = async (url: string) => {
  const res = await axios.get(`/api/${url}`)

  return res
}

export const patchAPI = async (url: string, post: object, token: string) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res
}
