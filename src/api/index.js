import axios from 'axios'
import { stripIndent } from 'common-tags'

import {
  CARTO_ENDPOINT,
  CARTO_TABLE,
  RESULTS_PER_PAGE
} from '@/config'

export default {
  async getDepartments () {
    const sql = stripIndent`
      select dept_name
      from ${CARTO_TABLE}
      group by dept_name
      order by dept_name
    `
    const opts = {
      method: 'get',
      url: CARTO_ENDPOINT,
      params: { q: sql }
    }
    const response = await axios(opts)
    return response.data.rows.map((row) => row.dept_name)
  },

  async search ({ firstName, lastName, department, page = 0 }) {
    const offset = page * RESULTS_PER_PAGE
    const whereClauses = ['1 = 1'] // leave at least 1 condition in case no others
    if (firstName) whereClauses.push(`first_name ILIKE '${firstName}'`)
    if (lastName) whereClauses.push(`last_name ILIKE '${lastName}'`)
    if (department) whereClauses.push(`dept_name = '${department}'`)
    const sql = stripIndent`
      select *
      from ${CARTO_TABLE}
      where ${whereClauses.join(' AND ')}
      order by last_name, first_name
      limit ${RESULTS_PER_PAGE}
      offset ${offset}
    `
    const opts = {
      method: 'get',
      url: CARTO_ENDPOINT,
      params: { q: sql }
    }
    const response = await axios(opts)
    return response.data.rows
  }
}
