import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/Date'
import {postDataResult, PropsAllPostsData} from '../interfaces'
import {NextPage} from 'next'
const Home:NextPage<{allPostsData: Array<postDataResult>}> = ({allPostsData}: {allPostsData: Array<postDataResult>}) => {
  console.log('check',allPostsData)
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, data}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{data.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={data.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps = ():PropsAllPostsData => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default Home