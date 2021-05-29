import { httpLogger } from '@root/src/logger'
import { NextFunction, Request, Response } from 'express'

interface IContent {
  url: string
  method: string
  reqHeaders: string
  resHeaders: string
  queryParams: string
  body: string
  status: number
  response: any
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { url, body, headers, method, query } = req

  const original = res.send
  const custom: any = (data: any) => {
    res.send = original
    res.send(data)

    const dataToLog: IContent = {
      url,
      method,
      reqHeaders: JSON.stringify(headers),
      resHeaders: JSON.stringify(Object.assign({}, res.getHeaders())),
      queryParams: JSON.stringify(query),
      body: JSON.stringify(body),
      status: res.statusCode,
      response: JSON.stringify(data),
    }

    let level: 'info' | 'error' = 'info'
    if (dataToLog.status >= 500) level = 'error'

    httpLogger.log(level, dataToLog)
  }

  res.send = custom
  next()
}
