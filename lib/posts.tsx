import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {fileNameId, MatterResult, postData} from '../interfaces'
const postsDirectory= path.join(process.cwd(), 'posts')

export const getSortedPostsData = () => {
    const fileNames =  fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)
        console.log('test',{id,...matterResult})
        return {
            id,
            ...matterResult
        }
    })
    console.log('allPostData', allPostsData)
    return JSON.parse(JSON.stringify(allPostsData.sort((a, b) => {
        if (a.data.date < b.data.date) {
            return 1
        } else {
            return -1
        }
    })))
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

    const matterResult: MatterResult = matter(fileContents)
    console.log('content',matterResult.content)
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}