const btn = document.getElementById('btn')
const users = document.querySelectorAll('.users>.avatar>img')
const span = document.querySelectorAll('.users>.avatar>span')
const commentSection = document.getElementById('commentSection')
let x = ''
let z = ''
let left = 5
let left2 = 5
let flag = 0
let openPosts = ''
let cm = ''


// ******* user's avatars expand and shrink ******

btn.addEventListener('click', () => {
      if (flag % 2 == 0) {
            users.forEach((img) => {
                  img.style.left = left + '%'
                  left += 10
            })
            span.forEach((span) => {
                  span.style.left = left2 + '%'
                  left2 += 10
            })
            flag++
      } else {
            users.forEach((img) => {
                  img.style.left = '50%'
                  left = 5
            })
            span.forEach((span) => {
                  span.style.left = '50%'
                  left2 = 5
            })
            flag++
      }
})

users.forEach((img) => {
      img.addEventListener('mouseenter', () => {
            img.nextElementSibling.style.top = '90%'
            if (window.innerWidth < 764) {
                  img.nextElementSibling.style.top = '100%'
            }
      })
      img.addEventListener('mouseleave', () => {
            img.nextElementSibling.style.top = '60%'
      })
})

// ******* showing posts relevant to each user ******

users.forEach((item, ind) => {
      item.addEventListener('click', () => {
            openPosts = document.querySelectorAll('.open')
            openPosts.forEach((el) => {
                  el.remove()
            })
            let clickedUser = ind + 1
            fetch('https://jsonplaceholder.typicode.com/posts')
                  .then(posts => posts.json())
                  .then(post => {
                        let y = document.createElement('div')
                        y.classList.add('wrapper')
                        post.map((i) => {

                              if (i.userId == clickedUser) {

                                    x = document.createElement('div')
                                    x.classList.add('open')
                                    x.setAttribute('data-id', i.id)
                                    x.innerHTML = `
                                    <div>
                                          <h5><span>${i.userId}</span></h5>
                                          <h2>${i.title}</h2>
                                    </div>
                                    <p>${i.body}</p>
                                    <i class="bi bi-chat-text-fill icon"><span>comment</span></i>
                                    <i class="bi bi-x icon" ><span>close</span></i>
                                    <div class="button">more</div>
                                    `
                                    y.appendChild(x)

                              }
                              document.getElementsByClassName('users')[0].appendChild(y)

                        })

                        // ***** opening comment icon relevant to each post *****

                        openPosts = document.querySelectorAll('.open')
                        openPosts.forEach((element) => {
                              element.children[4].addEventListener('click', () => {
                                    element.children[2].style.left = '20%'
                                    element.children[2].style.top = '90%'
                                    element.children[2].style.opacity = '1'
                                    element.children[3].style.left = '80%'
                                    element.children[3].style.top = '90%'
                                    element.children[3].style.opacity = '1'

                                    let postId = element.getAttribute('data-id')

                                    element.children[2].addEventListener('click', () => {
                                          cm = document.querySelectorAll('.cm')
                                          cm.forEach((elmnt) => {

                                                elmnt.remove()

                                          })
                                          commentSection.style.top = element.getBoundingClientRect().top + window.scrollY + 'px'
                                          if (window.innerWidth > 764) {

                                                if (postId % 2 == 1) {
                                                      commentSection.style.left = '50%'
                                                } else {
                                                      commentSection.style.left = '0'
                                                }
                                          } else {
                                                commentSection.style.width = '90%'
                                                commentSection.style.height = '50vh'
                                                commentSection.style.left = '5%'
                                          }
                                          fetch('https://jsonplaceholder.typicode.com/comments')
                                                .then(para => para.json())
                                                .then(comments => {
                                                      comments.map((postComment) => {
                                                            if (postComment.postId == postId) {
                                                                  z = document.createElement('div')
                                                                  z.classList.add('cm')
                                                                  z.innerHTML = `
                                                                  <div>
                                                                        <div>
                                                                              <h5><span>${postComment.postId}</span></h5>
                                                                              <h3>${postComment.name}</h3>
                                                                        </div>
                                                                        <i class="bi bi-star fav" ></i>
                                                                  </div>
                                                                  <p>${postComment.body}</p>
                                                                  
                                                                  `
                                                                  commentSection.appendChild(z)

                                                            }

                                                      })

                                                      // ***** faving a comment ****

                                                      let favorite = document.querySelectorAll('.fav')
                                                      favorite.forEach((fav) => {
                                                            let p = 0
                                                            fav.addEventListener('click', (e) => {
                                                                  if (p % 2 == 1) {
                                                                        e.target.classList.replace('bi-star-fill', 'bi-star')

                                                                        p++
                                                                  } else {
                                                                        e.target.classList.replace('bi-star', 'bi-star-fill')
                                                                        p++
                                                                  }
                                                            })
                                                      })
                                                })

                                    })


                              })

                              // *****closing comment section*****

                              element.children[3].addEventListener('click', () => {
                                    element.children[2].style.left = '50%'
                                    element.children[2].style.top = '70%'
                                    element.children[2].style.opacity = '0'
                                    element.children[3].style.left = '50%'
                                    element.children[3].style.top = '70%'
                                    element.children[3].style.opacity = '0'
                                    commentSection.style.top = '-500%'


                              })


                        })



                  })



      })




})


