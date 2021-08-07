import axios from "axios";
const X_API_KEY: string = process.env.X_API_KEY || '';
export const getBlogs = async () => {
    const return_content = await axios.get('https://hotakeblog.microcms.io/api/v1/blogs', { headers: {
        'Content-type': 'application/json',
        'X-API-KEY': X_API_KEY
      }})
    return return_content.data
    // const return_content = await fetch('https://hotakeblog.microcms.io/api/v1/blogs', { method: 'GET',headers: {
    //     'Content-type': 'application/json',
    //     'X-API-KEY': X_API_KEY,
    //     'User-Agent': 'ANYTHING_WILL_WORK_HERE'
    // }}).then(async (res) => {
    //     const response = await res
    //     return response;
    // })
    // console.log("リターン値",return_content)
    // return return_content
}

export const getBlogBy = async (id:String) => {
    const return_content = await axios.get('https://hotakeblog.microcms.io/api/v1/blogs/' + String(id), { headers: {
        'Content-type': 'application/json',
        'X-API-KEY': X_API_KEY
      }})
    console.log("テスト", return_content.data)
    return return_content.data
    // const return_content = await fetch('https://sample-cms.microcms.io/api/v1/blogs/' + String(id), { method: 'GET', headers: {
    //   'Content-type': 'application/json',
    //   'X-API-KEY': X_API_KEY,
    //   'User-Agent': 'ANYTHING_WILL_WORK_HERE'
    // }}).then(async (res) => {
    //     const response = await res
    //     return response;
    // })
    // console.log("リターン値",return_content)
    // return return_content
}