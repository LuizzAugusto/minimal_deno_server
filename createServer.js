import { serve } from "./deps/server.js"
import { requestFileResponse } from "./requestFileResponse.js"
import { notFoundResponse } from "./notFoundResponse.js"

export function createServer({ publicFolder = "./public", hostname = "localhost", port = 3000 } = {}) {
  /**
   * 
   * @type {Promise<void>|undefined}
   */
  let _server

  function init() {
    console.log("Starting server at http://" + hostname + ":" + port)

    _server = serve(async (req) => {
      const url = new URL(req.url)
      const path = url.pathname

      if (req.method !== "GET")
        return notFoundResponse()

      if (path.endsWith(".js") || path.endsWith(".mjs"))
        return await requestFileResponse(publicFolder + path, "text/javascript")

      if (path.endsWith(".css"))
        return await requestFileResponse(publicFolder + path, "text/css")

      if (path === "/")
        return await requestFileResponse(publicFolder + "/index.html", "text/html")

      return notFoundResponse()
    }, { port, hostname })
  }

  function stop() {
    if (_server) {
      try { Promise.reject(_server) }
      catch(_) {/**/}
      _server.close()
    }
  }
  
  const public_ = 
    { init
    , stop
    }

  return public_
}