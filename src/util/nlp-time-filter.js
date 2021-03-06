import chrono from 'chrono-node'

const BEFORE_REGEX = /before:"(.*?)"/
const AFTER_REGEX = /after:"(.*?)"/

/**
 * @typedef QueryFilters
 * @type {Object}
 * @property {string} query The non-date-filter search terms.
 * @property {number|undefined} startDate Number of ms representing the start of filter time.
 * @property {number|undefined} endDate Number of ms representing the end of filter time.
 */

/**
 * Takes in query as a string and extracts startDate, endDate, and query parts.
 *
 * @param {string} query The query string that user has entered.
 * @returns {QueryFilters} The extracted query parameters.
 */
export default function extractTimeFiltersFromQuery(query) {
    const matchedBefore = query.match(BEFORE_REGEX)
    const matchedAfter = query.match(AFTER_REGEX)

    let startDate
    let endDate
    if (matchedBefore) {
        const parsedDate = chrono.parseDate(matchedBefore[1])
        endDate = parsedDate && parsedDate.getTime()
    }
    if (matchedAfter) {
        const parsedDate = chrono.parseDate(matchedAfter[1])
        startDate = parsedDate && parsedDate.getTime()
    }

    const extractedQuery = query
        .replace(BEFORE_REGEX, '')
        .replace(AFTER_REGEX, '')
        .trim()

    return {
        startDate,
        endDate,
        query: extractedQuery,
    }
}
