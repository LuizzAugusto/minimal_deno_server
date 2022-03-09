import { serve } from "../deps/server.js"
import { log } from "./log.js"
import { requestFileResponse } from "./requestFileResponse.js"
import { notFoundResponse } from "./notFoundResponse.js"

export async function createServer({ publicFolder, hostname, port } = { publicFolder: "./public", hostname: "0.0.0.0", port: 3000 }) {
  await serve(async (req) => {
    const url = new URL(req.url)
    const path = url.pathname
    log(true, path)
  
    if (req.method !== "GET")
      return notFoundResponse()
  
    if (path === "/")
      return await requestFileResponse(publicFolder + "/index.html", "text/html")
  
    if (path.endsWith(".css"))
      return await requestFileResponse(publicFolder + path, "text/css")
  
    if (path.endsWith(".js") || path.endsWith(".mjs"))
      return await requestFileResponse(publicFolder + path, "text/javascript")
  
    return notFoundResponse()
  }, { port, hostname })
}
