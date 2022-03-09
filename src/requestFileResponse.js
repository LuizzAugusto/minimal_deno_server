/**
 * 
 * @param {string} path
 * @param {string} contentType
 * @param {(text: string|Promise<string>) => string|Promise<string>} transformTextBeforeRespond
 */
export async function requestFileResponse(path, contentType = "text/plain", transformTextBeforeRespond = (text) => text) {
  try {
    const file = Deno.readTextFile(path)
    return new Response(await transformTextBeforeRespond(file), { status: 200, headers: { "content-type": contentType } })
  }
  catch(e) { console.error(e) }
  return await new Response(undefined, { status: 404 })
}
