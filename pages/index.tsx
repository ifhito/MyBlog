import { NextPage } from 'next';
import Link from 'next/link'
import React from 'react';

import { getBlogs } from '../lib/getContent';
import Head from 'next/dist/next-server/lib/head';
import Nav from '../components/nav';

type BlogItemType = {
  items: any
}
const BlogItem: React.FC<BlogItemType> = props => {
  const item = props.items;

  return (
    <div>
      <Link href="/blogs/[id]" as={`/blogs/${item.id}`}>
        <div>
          <span>{ item.date }</span>
          <span>{ item.title }</span>
        </div>
      </Link>
    </div>
  )
}

const Blogs: NextPage = (props: any) => {
  const { contents } = props;

  return (
    <div className="blog-container">
      <Head>
        <title>test</title>
      </Head>
      <Nav />
      {
        contents.map( (item: { id: React.Key; }) => <BlogItem items={ item } key={ item.id } />)
      }
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await getBlogs();
  console.log("コンテンツ", data.contents)
  return { props: { contents: data.contents } };
}

export default Blogs;