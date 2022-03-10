export function createServer({ publicFolder, hostname, port } = { publicFolder: "./public", hostname: "0.0.0.0", port: 3000 }) {
  let createServerSubprocess

  function init() {
    createServerSubprocess = Deno.run({ cmd: [ "deno", "run", "--allow-net=" + hostname + ":" + port, "--allow-read=" + publicFolder
      , "_createServer.js", "--hostname=" + hostname, "--port=" + port ] })
    return createServerSubprocess.status()
  }

  function stop() {
    if (createServerSubprocess)
      createServerSubprocess.kill()
  }
  
  const public_ = 
    { init
    , stop
    }

  return public_
}