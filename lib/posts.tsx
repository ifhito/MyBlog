import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {fileNameId, postData, postDataResult} from '../interfaces'
import {getBlogs} from './getContent'
const postsDirectory= path.join(process.cwd(), 'posts')

export const getSortedPostsData = async ():Promise<postDataResult>=> {
        // const fileNames =  fs.readdirSync(postsDirectory)
    // const allPostsData = fileNames.map(fileName => {
        // const id = fileName.replace(/\.md$/, '')

        // const fullPath = path.join(postsDirectory, fileName)
        // const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = await getBlogs();
        const id:string = data.contents.items.id;
        const title:string = data.contents.items.title;
        const date: string = data.contents.items.date;
        // const matterResult = matter(data.contents.items.);
        const allPostsData = {
            'id':id,
            'title':title,
            'date': date
        }
        console.log(allPostsData);
    // })
    return JSON.parse(JSON.stringify(allPostsData))
} 

export const getAllPostIds = (): Array<fileNameId> => {
    const fileNames = fs.readdirSync(postsDirectory)
    
    return fileNames.map((fileName):fileNameId => {
        return {
            params:{
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export const getPostData = async (id:string):Promise<postData> => {

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    console.log('content',matterResult.content)
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
    const contentHtml = processedContent.toString()
    const title = matterResult.data.title
    const date = matterResult.data.date
    return {
        id,
        contentHtml,
        title,
        date
    }
}