import { httpLogger } from '@root/src/logger'
import { IConnectionDoc } from '@root/src/models/Connection'
import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

interface IContent {
  url: string
  method: string
  reqHeaders: string
  resHeaders: string
  queryParams: string
  body: string
  status: number
  response: any
  connection: {
    ip: string
    country: string
    lookupInfo: string
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { url, body, headers, method, query } = req

  const connection = res.locals.connection as IConnectionDoc

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
      connection: {
        ip: connection.ip as string,
        country: _.get(connection, 'lookUpData.country_name', null),
        lookupInfo: JSON.stringify(connection.lookUpData),
      },
    }

    let level: 'info' | 'error' = 'info'
    if (dataToLog.status >= 500) level = 'error'

    httpLogger.log(level, dataToLog)
  }

  res.send = custom
  next()
}
