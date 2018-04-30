'use strict';

module.exports = config => {
  const util = require('./util')(config);

  /**
   * Util function to get the timeseries data.
   * 
   * @TODO: Add input validation.
   * 
   * @param {String} fn
   *   The enum fn available for timeseries data.
   * 
   * @returns {Function}
   *   A timeseries function to accept user data that returns a promise. 
   */
  const series = fn => (symbol, outputsize = 'compact', datatype = 'json', interval = '1min') =>
    util.fn(fn)({
      symbol,
      interval,
      outputsize,
      datatype
    });

  return {
    intraday: series('TIME_SERIES_INTRADAY'),
    daily: series('TIME_SERIES_DAILY'),
    daily_adjusted: series('TIME_SERIES_DAILY_ADJUSTED'),
    weekly: series('TIME_SERIES_WEEKLY'),
    weekly_adjusted: series('TIME_SERIES_WEEKLY_ADJUSTED'),
    monthly: series('TIME_SERIES_MONTHLY'),
    monthly_adjusted: series('TIME_SERIES_MONTHLY_ADJUSTED'),
    batch: symbols => {
      // Convert array to csv string.
      if (symbols instanceof Array) {
        symbols = symbols.join(',');
      }

      return util.fn('BATCH_STOCK_QUOTES')({ symbols });
    }
  };
};