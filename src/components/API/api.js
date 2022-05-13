export default class PostDataForm {

  static async postData(post) {
    const response = await fetch(`http://testtask.alto.codes/front-feedback.php`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: post.name,
        email: post.email,
        rating: post.rating,
        comment: post.comment
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    return data
  }
}