import { parse } from "./deps/flags.js"
import { serve } from "./deps/server.js"
import { requestFileResponse } from "./requestFileResponse.js"
import { notFoundResponse } from "./notFoundResponse.js"

/**
 * 
 * @typedef {Object} ArgsType
 * @property {string} hostname
 * @property {number} port
 * @property {string} publicfolder
 */

/**
 * 
 * @type {ArgsType}
 */
const { hostname, port, publicfolder } = parse(Deno.args)

console.log("Starting server at http://" + hostname + ":" + port)

serve(async (req) => {
  const url = new URL(req.url)
  const path = url.pathname

  if (req.method !== "GET")
    return notFoundResponse()

  if (path.endsWith(".js") || path.endsWith(".mjs"))
    return await requestFileResponse(publicfolder + path, "text/javascript")

  if (path.endsWith(".css"))
    return await requestFileResponse(publicfolder + path, "text/css")

  if (path === "/")
    return await requestFileResponse(publicfolder + "/index.html", "text/html")

  return notFoundResponse()
}, { port, hostname })
