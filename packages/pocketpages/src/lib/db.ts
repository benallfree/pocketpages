import { stringify } from 'pocketbase-stringify'

export type FilterOptions = {
  filter?: string
  sort?: string
  limit?: number
  offset?: number
  filterParams?: Record<string, string>
}

export const findRecordByFilter = (
  collection: string,
  options?: Partial<FilterOptions>,
  dao = $app.dao()
) => {
  return findRecordsByFilter(collection, options, dao)?.[0]
}

export const findRecordsByFilter = (
  collection: string,
  options?: Partial<FilterOptions>,
  dao = $app.dao()
) => {
  const { filter, sort, limit, offset, filterParams }: FilterOptions = {
    filter: '1=1',
    sort: '',
    limit: 0,
    offset: 0,
    filterParams: {},
    ...options,
  }
  const records = dao.findRecordsByFilter(
    collection,
    filter,
    sort,
    limit,
    offset,
    filterParams
  )
  return JSON.parse(stringify(records))
}
