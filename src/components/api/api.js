export default class PostDataForm {

  static async postData(postData) {
    const response = await fetch(`http://testtask.alto.codes/front-feedback.php`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    return data
  }
}