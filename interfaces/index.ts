// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
import { AppProps } from "next/app"
import {GrayMatterFile} from 'gray-matter'
export type postDataResult = {
  id:string
  content: string
  data: {title:string, date:string}
  isEmpty: boolean
  excerpt: string
  orig: string
}

export type fileNameId = {
  params:{
    id: string
  }
}

export type postData = {
  id:string
  contentHtml:string
  title:string
  date:string
}

export type postMatterData = {
  id:string
  contentHtml:string
} & GrayMatterFile<string>

export type Props = {
  props:{
    allPostsData:postDataResult
  }
}
type PageProps = {
  title: string
  logData: {
    screenName: string
  }
}
export type AppPageProps = Omit<AppProps<PageProps>, "pageProps"> & {
  pageProps: PageProps
}