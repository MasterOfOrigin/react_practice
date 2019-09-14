import * as R from 'ramda';

/*
  FORMAT API RES:
  api res data only available in 3 hour periods for free tier.
  Format api res to aggregate 3 hour periods into days
  * Get temperature minimum and maximum across the day
  * Get the day time weather icon that shows up most for the entire day
  * Use date string to get day of week
*/

// format every period into objects with day, temp min & max, and weather icon(s)
const format3hrTimeBlocks = R.map(
  R.applySpec({
    'day': R.compose(
      R.flip(R.prop)({
        0: 'Sun',
        1: 'Mon',
        2: 'Tues',
        3: 'Weds',
        4: 'Thurs',
        5: 'Fri',
        6: 'Sat'
      }),
      (d) => new Date(d).getDay(),
      R.prop('dt_txt')
    ),
    //create singleton arrays with R.of because R.concat in mergeConcat won't work with different types
    'temp_min': R.compose(R.of, R.path(['main', 'temp_min'])),
    'temp_max': R.compose(R.of, R.path(['main', 'temp_max'])),
    'weather_icon': R.compose(
      R.reject(
        R.includes('n')
      ),
      R.pluck('icon'),
      R.prop('weather')
    )
  })
)

const convTempKtoF = (T_K) => (T_K*9/5) - 459.67
const RoundConvTempKtoF = (T_K) => Math.round(convTempKtoF(T_K))

// convert temp to farenheit and get max
const setTempMaxFromList = R.over(
  R.lensProp('temp_max'),
  R.compose(
    RoundConvTempKtoF,
    R.reduce(R.max, 0)
  )
)

// convert temp to farenheit and get min
const setTempMinFromList = R.over(
  R.lensProp('temp_min'),
  R.compose(
    RoundConvTempKtoF,
    R.reduce(R.min, Infinity)
  )
)

// get most frequent day time weather icon across whole day
const setMostFrequentWeatherIcon = R.over(
  R.lensProp('weather_icon'),
  R.compose(
    R.prop(0),
    R.chain(
      R.prop,
      R.compose(
        R.reduce(R.max, 0),
        R.keys
      )
    ),
    R.invert,
    R.countBy(R.identity)
  )
)

// merge all 3 hour period values into arrays
const mergeConcat = R.reduce(R.mergeWith(R.concat), {})

const formatDay = R.compose(
  setMostFrequentWeatherIcon,
  setTempMinFromList,
  setTempMaxFromList,
  mergeConcat,
  R.map(R.omit(['day']))
)

const formatDaysList = R.compose(
  R.mapObjIndexed(formatDay),
  R.groupBy(R.prop('day')),
  format3hrTimeBlocks,
  R.prop('list')
)

const formatApiRes = R.applySpec({
  city: R.path(['city', 'name']),
  days: formatDaysList
})

export default formatApiRes
