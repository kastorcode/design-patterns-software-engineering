## Facade
Structural pattern that provides a simplified interface to a broader set of interfaces in a system. It makes a complex system easier to use by hiding the internal complexity and providing a single, easier-to-use interface. The following example simplifies making HTTP requests, abstracting implementation details.
```js
class APIFacade {
  static BASE_URL = 'https://jsonplaceholder.typicode.com'

  static async getAllPosts () {
    const response = await fetch(`${APIFacade.BASE_URL}/posts`)
    return await response.json()
  }

  static async getUserPosts (userId) {
    const response = await fetch(`${APIFacade.BASE_URL}/posts?userId=${userId}`)
    return await response.json()
  }

  static async getPost (postId) {
    const response = await fetch(`${APIFacade.BASE_URL}/posts/${postId}`)
    return await response.json()
  }

  static async createPost ({ userId, title, body }) {
    const response = await fetch(`${APIFacade.BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ userId, title, body })
    })
    return await response.json()
  }

  static async updatePost ({ userId, postId, title, body }) {
    const response = await fetch(`${APIFacade.BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ userId, id: postId, title, body })
    })
    return await response.json()
  }

  static async deletePost (postId) {
    await fetch(`${APIFacade.BASE_URL}/posts/${postId}`, {
      method: 'DELETE'
    })
  }
}

console.log('***** GET ALL POSTS *****\n')
console.log(await APIFacade.getAllPosts())
console.log('\n*************************')
```