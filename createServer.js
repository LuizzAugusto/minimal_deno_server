export function createServer({ publicFolder = "./public", hostname = "localhost", port = 3000 } = {}) {
  /**
   * @type {Deno.Process|undefined}
   */
  let serverSubprocess

  function init() {
    serverSubprocess = Deno.run({ cmd: [ "deno", "run", "--allow-net=" + hostname + ":" + port, "--allow-read=" + publicFolder
      , "_server.js", "--hostname=" + hostname, "--port=" + port, "--publicfolder=" + publicFolder ] })
    return serverSubprocess.status()
  }

  function stop() {
    if (serverSubprocess) {
      try { Promise.reject(server) }
      catch(_) {/**/}
      serverSubprocess.close()
    }
  }
  
  const public_ = 
    { init
    , stop
    }

  return public_
}