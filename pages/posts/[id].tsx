import Layout from '../../components/Layout'
import Head from 'next/head'
import {getAllPostIds, getPostData} from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import {ReactNode} from 'react'
import { postData } from '../../interfaces'
import Date from '../../components/Date'
export const getStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}:{params:{id:string}})=>{
    console.log('param',params)
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

const Post = ({postData}:{postData:postData}):ReactNode => {
    console.log("postdate", postData)
    return (
    <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
    )
}
export default Post