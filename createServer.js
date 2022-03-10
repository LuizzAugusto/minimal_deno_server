export function createServer({ publicFolder = "./public", hostname = "0.0.0.0", port = 3000 } = {}) {
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
    if (serverSubprocess)
      serverSubprocess.kill()
  }
  
  const public_ = 
    { init
    , stop
    }

  return public_
}