import { NextPage } from 'next'

import Head from 'next/dist/next-server/lib/head';
import Nav from '../../components/nav';
import {getBlogBy, getBlogs} from '../../lib/getContent'

interface BlogItemType {
  id: String,
  createdAt: String,
  updatedAt: String,
  title: String,
  date: String,
  content: String
}

const BlogsItemPage: NextPage<BlogItemType> = (props) => {
  const { title, date, content } = props;
  console.log("title, date, content", title, date, content)
  return (
    <>
      <Head>
          <title>test</title>
      </Head>
      <Nav />
      <section>
        <h2>{ title }</h2>
        <p>{ date }</p>
        <div>{ content }</div>
      </section>
    </>
  )
}

export const getStaticPaths = async () => {
  const data = await getBlogs();
  console.log("データ", data.contents)
  const paths = data.contents.map((item:{id:string}) => `/blogs/${item.id}`);
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }:any) => {
  console.log("ぱらむ", params)
  const id = params.id;
  const data = await getBlogBy(id);
  console.log("data======", data);
  return { props: data}
}

export default BlogsItemPage;