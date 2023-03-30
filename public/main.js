const postsContainer = document.getElementById("posts-container")
const nameContainer = document.getElementById("name-input")
const roleSelector = document.getElementById("roles")
const subjectContainer = document.getElementById("subject-input")
const textContainer = document.getElementById("content")
const publishButton = document.getElementById("publish-button")

let currentPostCount = 0

const getPosts = async () => {
    const response = await fetch('/getPosts')
    const posts = await response.json()
    console.log(posts)
    currentPostCount = posts.length
    let postsList = posts.map((post) => createPost(post.rol, post.nombre, post.materia, post.contenido, post.fecha))
    console.log(postsList)
    postsList.forEach((article) => postsContainer.insertBefore(article, postsContainer.firstChild))
    checkNewPosts()
}

//Refresh de posts
const checkNewPosts = async () => {
    const response = await fetch('/getPosts')
    const posts = await response.json()
    if (posts.length > currentPostCount){
      currentPostCount = posts.length
      console.log("Nuevo post")
      let newPost = posts[Object.keys(posts)[Object.keys(posts).length - 1]]
      console.log(newPost)
      postsContainer.insertBefore(createPost(newPost.rol, newPost.nombre, newPost.materia, newPost.contenido, newPost.fecha), postsContainer.firstChild)
    }
    //checkNewPosts()
}

const createPost = (rol, nombre, materia, contenido, fecha) => {
    const post = document.createElement('article')
    post.style.width = '70%'
    post.style.display = 'flex'
    post.style.flexDirection = 'column'
    post.style.backgroundColor = '#1E1734'
    post.style.color = '#F8F8F8'
    post.style.borderRadius = '5px'
    post.style.margin = "5px"
    post.style.padding = "10px"

    //nombre
    const nameSpan = document.createElement('span')
    nameSpan.append(nombre)
    nameSpan.style.fontWeight = 'bold'
    post.append(nameSpan)

    //rol
    const roleSpan = document.createElement('span')
    roleSpan.style.marginBottom = '5px'
    roleSpan.append(rol)
    post.append(roleSpan)

    //materia
    const subjectSpan = document.createElement('span')
    subjectSpan.append(`Materia: ${materia}`)
    subjectSpan.style.fontWeight = 'italic'
    post.append(subjectSpan)
    

    //contenido
    const textSpan = document.createElement('span')
    textSpan.append(contenido)
    post.append(textSpan)
    textSpan.style.overflowWrap = 'break-word'

    //fecha
    const dateSpan = document.createElement('span')
    dateSpan.style.marginTop = '5px'
    dateSpan.style.alignSelf = 'end'
    dateSpan.append(fecha)
    post.append(dateSpan)

    return post

}

const publish = async () => {
    const body = {
        rol: roleSelector.value,
        nombre: nameContainer.value,
        materia: subjectContainer.value,
        contenido: textContainer.value,
        fecha: '2023-03-30'
    }

    const response = await fetch('/post', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    
    roleSelector.value = ''
    nameContainer.value = ''
    subjectContainer.value = ''
    textContainer.value = ''
    return response  
}

publishButton.addEventListener('click', async(event) => {
    event.preventDefault
    await publish()
})


getPosts()

