
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export async function axios<T> (url: string, method: HttpMethod = 'GET', body?: object): Promise<T> {
  const headers = {
    'Content-Type': 'application/json'
    // Add any other headers here
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  }

  const res = await fetch(url, options)
  const data = await res.json()
  return data
}
