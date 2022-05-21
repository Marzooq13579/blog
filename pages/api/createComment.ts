// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from "@sanity/client";


type Data = {
  name?: string
  message?: string
  err? : any
}



export const config = {

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
    token: process.env.SANITY_API_TOKEN,
    useCdn: process.env.NODE_ENV === 'production',
  }

const client = sanityClient(config)


export default async function createComment(  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  const {_id,name,email,comment} = JSON.parse(req.body)
  console.log("Body",req.body)
  try{
    await client.create({
      _type:'comment',
      post:{
        _type:'reference',
        _ref:_id
      },
      name,
      email,
      comment
    })
  }catch(err: any) {
    console.log("Err",err)
    return res.status(500).json({message:`Couldnt submit comment`,err});  
  }
  
  return res.status(200).json({ name: 'John Doe' })
}
