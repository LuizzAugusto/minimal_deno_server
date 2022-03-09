/**
 * 
 * @param {boolean} logEnabled 
 * @param  {...any} args 
 */
export async function log(logEnabled, ...args) {
  if (logEnabled)
    await console.log(...args)

  return
}