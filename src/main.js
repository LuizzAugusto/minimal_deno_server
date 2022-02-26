import { serve } from "../deps/server.js"
import { getPermissionOrExit } from "../deps/getPermissionOrExit.js"
import { requestFileResponse } from "./requestFileResponse.js"
import { notFoundResponse } from "./notFoundResponse.js"
import { log } from "./log.js"

const PUBLIC_DIR = "./public"
const PORT = 3000
const HOST = "0.0.0.0:" + PORT

await getPermissionOrExit({ name: "read", path: PUBLIC_DIR })
await getPermissionOrExit({ name: "net", host: HOST })

console.log("Starting server at http://" + HOST)

await serve(async (req) => {
  const path = (new URL(req.url)).pathname
  log(true, path)

  if (req.method !== "GET")
    return notFoundResponse()

  if (path === "/")
    return await requestFileResponse(PUBLIC_DIR + "/index.html", "text/html")

  if (path.endsWith(".css"))
    return await requestFileResponse(PUBLIC_DIR + path, "text/css")

  if (path.endsWith(".js") || path.endsWith(".mjs"))
    return await requestFileResponse(PUBLIC_DIR + path, "text/javascript")

  if (path.endsWith(".json"))
    return await requestFileResponse(PUBLIC_DIR + path, "application/json")

  return notFoundResponse()
}, { port: PORT })