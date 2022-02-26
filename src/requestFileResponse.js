/**
 * 
 * @param {string} path
 * @param {string} contentType
 * @param {(text: string) => Promise<string>|undefined} transformTextBeforeRespond
 */
export async function requestFileResponse(path, contentType = "text/plain", transformTextBeforeRespond = async (text) => await text) {
  try {
    const file = await Deno.readTextFile(path)
    return new Response(await transformTextBeforeRespond(file), { status: 200, headers: { "content-type": contentType } })
  }
  catch(e) { console.error(e) }
  return await notFoundResponse()
}