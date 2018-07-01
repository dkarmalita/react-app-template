console.log( 'fakeApi' )

/**
 * Possible values of random delay
 * @type {Array}
 */
const _delayOptions = [ 200, 300, 150, 250, 2000, 3000, 1000, 1500 ]

/**
 * Return random element of data
 * @param  {Array} data - array of options to return
 * @return {Any} - random option of data
 */
const _randOptionOf = ( options ) => options[Math.floor( options.length * Math.random())]

const randomDelay = () => _randOptionOf( _delayOptions )

const _isEmailAcceptable = ( email ) => !/@yahoo.com\s*$/.test( email )

/**
 * Fake async validator
 * @param  {Function} email) [description]
 * @return {[type]}          [description]
 */
export const testEmail = ( email ) => new Promise(( resolve, reject ) =>
  setTimeout(() => {
    const result = _isEmailAcceptable( email ) // _randOptionOf([true, false])
    if( result ){
      resolve({ email })
    } else {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        email,
        errors : ['yahoo emails are not acceptable'],
      })
    }
  }, randomDelay())
)

// const testEmail = (email) =>
// isEmailAcceptable(email)
// .then(
//   ({email}) => console.log('accepted', email),
//   // ({email, errors}) => console.log('rejected', email, errors)
// )
// .catch( ({email, errors}) => console.log('rejected', email, errors) )


// for (var i = 50 - 1; i >= 0; i--) {
//   testEmail(`mymail${i}@test.com`)
// }
