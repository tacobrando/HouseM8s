export const Console = Object.freeze({
  Log () {
    console.log(`\x1b[30m[Log]\x1b[0m`, ...arguments)
  },
  Success() {
    console.log(`\x1b[32m✔\x1b[0m`, ...arguments)
  },
  Info() {
    console.log(`\u001B[1;34mℹ\x1b[0m`, ...arguments)
  },
  Warning() {
    console.warn(`\u001B[1;33m[Warning]\x1b[0m`, ...arguments)
  },
  Error() {
    console.error(`\u001b[1;31m[Error]\x1b[0m`, ...arguments)
  },
  TimeStart(arg1, arg2) {
    if(arg2) {
      console.time(`\u001b[1;32m${arg1}  \u001b[0m${arg2}`)
    } else {
      console.time(arg1)
    }
  },
  TimeEnd(arg1, arg2) {
    if(arg2) {
      console.timeEnd(`\u001b[1;32m${arg1}  \u001b[0m${arg2}`)
    } else {
      console.timeEnd(arg1)
    }
  }
})
