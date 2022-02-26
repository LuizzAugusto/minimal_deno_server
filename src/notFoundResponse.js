export function notFoundResponse () {
  return new Response(undefined, { status: 404 })
}