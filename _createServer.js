import { parse } from "./deps/flags.js"
import { serve } from "./deps/server.js"
import { log } from "./log.js"
import { requestFileResponse } from "./requestFileResponse.js"
import { notFoundResponse } from "./notFoundResponse.js"

const { hostname, port } = parse(Deno.args, { "--" : true })

serve(async (req) => {
  const url = new URL(req.url)
  const path = url.pathname
  log(true, path)

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
