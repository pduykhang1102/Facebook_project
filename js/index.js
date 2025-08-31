
const content = document.getElementById("user_content").value.trim()
const inputImage = document.getElementById("image")
const inputVideo = document.getElementById("video")
const preview = document.getElementById("preview")
const clear = document.getElementById("clear")
const postBtn = document.getElementById("post")


let posts = localStorage.getItem("posts")
posts = posts ? JSON.parse(posts) : {}

function getNewId() {
    let lastId = localStorage.getItem("lastId")
    lastId = lastId ? 0 : parseInt

    const newId = lastId + 1
    localStorage.setItem("lastId", newId)
    return newId
}


inputImage.addEventListener("change", function () {
    const files = Array.from(this.files)

    const urlTransform = (file) => {
        window.url_img = URL.createObjectURL(file)
        window.img = document.createElement("img")
        img.src = url_img
        img.alt = "post_image"
        img.style.width = "100%"
        img.style.height = "300px"
        img.style.marginBottom = "5px"
        preview.appendChild(img)




    }

    files.forEach(urlTransform)
})

inputVideo.addEventListener("change", function () {
    const files = Array.from(this.files)

    const urlTransform = (file) => {
        window.url_video = URL.createObjectURL(file)
        window.video = document.createElement("video")
        video.src = url_video
        video.controls = true
        video.style.width = "466px"
        video.style.height = "240px"
        video.style.marginBottom = "5px"
        preview.appendChild(video)
    }

    files.forEach(urlTransform)
})

clear.addEventListener("click", function () {
    if (preview.contains(img))
        preview.removeChild(img)
    inputImage.value = ""
    if (preview.contains(video))
        preview.removeChild(video)
    inputVideo.value = ""

})



postBtn.addEventListener("click", function (event) {
    event.preventDefault()
    window.id = getNewId()
    let post = {
        id: getNewId() - 1,
        username: "",
        Content: content,
        time: new Date(),
        user_image: "",
        image: url_img,
        video: url_video,
        like: 0,
        laugh: 0,
        love: 0,
        sad: 0,
        angry: 0,
        comment: [],
        comment_counting: 0,
        share_counting: 0

    }
    posts[id] = post
    localStorage.setItem("posts", JSON.stringify(posts))




    if (preview.contains(img))
        posts[id].image.push(url_img)
    localStorage.setItem("posts", JSON.stringify(posts))
    if (preview.contains(video))
        posts[id].video.push(url_video)
})





const card_post = document.getElementById("post_webook")

const getData = async () => {
    const response = await fetch("./data_post.json")

    const data = await response.json()
    if (data) {
        localStorage.setItem("lastId", data.length)
    }
    const dataLocalStorage = JSON.parse(localStorage.getItem("posts"));
    if (dataLocalStorage) {
        // console.log(dataLocalStorage) 
        listData = Object.entries(dataLocalStorage).map(([k, v]) => {
            return {
                id: k,
                user_image: v.post_image,
                username: v.username,
                Content: v.Content,
                time: v.time,
                image: v.image,
                like: 0,
                love: 0,
                laugh: 0,
                sad: 0,
                angry: 0,
                share_counting: 0,
                comment_counting: 0,
                comment: v.comment
            }
        })
    }
    // let new_list = [...data, ...listData]

    if (data) {
        card_post.innerHTML = data.map(item => {
            return `
             <div class="card post" id="post_webook">
                        <div class="card-body">
                            <div class="blog-title">
                                <a href=""><img class="people-avatar" style="border-radius: 50% ;"
                                        src=${item.user_image} alt="avatar-1"></a>
                                <div class="name_time-posted">
                                    <h7 class="card-title">${item.username}</h7>
                                    <p class="card-time-posted"><small class="text-body-secondary">Posted ${item.time} ago</small></p>
                                </div>
                            </div>
                            <p class="card-text">${item.Content}</p>
                            <img src="${item.image}" class="card-img-bottom" alt="ảnh blog 1">
                            <div class="d-flex justify-content-between mx-3 my-2" class="Review-comment-share">
                                <div class="emotion-left">
                                    <div style="display: none" class="icon_container" id="icon_container">
                                        <button class="icon" id="like"><i class="fa-solid fa-thumbs-up"></i></button>
                                        <button class="icon" id="love"><i class="fa-solid fa-heart"></i></button>
                                        <button class="icon" id="laugh"><i class="fa-solid fa-face-laugh-squint"></i></button>
                                        <button class="icon" id="sad"><i class="fa-solid fa-face-sad-tear"></i></button>
                                        <button class="icon" id="angry"><i class="fa-solid fa-face-angry "></i></i></button>
                                    </div>
                                    <div class="review rsc" id="rsc">
                                        <i class="fa-solid fa-thumbs-up like"></i>
                                        <i class="fa-solid fa-heart heart"></i>
                                        <p class="amount" style="font-weight: light;"></p>
                                    </div>
                                </div>
                                <div class="emotion-right d-flex">
                                    <div class=" rsc me-1">
                                        <i class="fa-solid fa-comment comment"></i>
                                        <p style="font-weight: light;" class="amount">${item.comment_counting}</p>
                                    </div>
                                    <div class=" rsc">
                                        <i class="fa-solid fa-share share"></i>
                                        <p style="font-weight: light;" class="amount">${item.share_counting}</p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class=" container-fluid button-for-rsc">
                                <div class="row">
                                    <div class="col-3 button-review">
                                        <div class="rsc-2">
                                            <button class="button-1" id="button-1">
                                                <i class="fa-regular fa-thumbs-up like1 "></i>
                                                <p>Thích</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-3 button-review">
                                        <div class="rsc-2">
                                            <button class="button-1" id="button-2">
                                                <i class="fa-regular fa-comment comment1"></i>
                                                <p>Bình luận</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-3 button-review">
                                        <div class="rsc-2">
                                            <button class="button-1" id="button-2">
                                                <i class="fa-solid fa-share share1"></i>
                                                <p>Chia sẻ</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-3 button-review">
                                        <div class="rsc-2">
                                            <button class="button-1" id="button-2">
                                                <i class="fa-regular fa-paper-plane send1"></i>
                                                <p>Send</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            `
        }).join("")
    }
}

getData()











// const show_iconContainer = () => {
//     const icon_button = document.getElementById("button-1")
//     const iconContainer = document.getElementById("icon_container")
//     const rsc = document.getElementById("rsc")


//     let timer

//     icon_button.addEventListener("click", () => {
//         iconContainer.style.display = "block"
//         rsc.style.display = "none"

//     })


//     iconContainer.addEventListener("mouseleave", () => {

//         timer = setTimeout(() => {
//             iconContainer.style.display = "none"
//             rsc.style.display = 'block'
//             rsc.style.display = "flex"
//         }, 2000);


//     })

//     iconContainer.addEventListener("mouseenter", () => {
//         clearTimeout(timer)

//     })

//     icon_counting()

// }

const icon_counting = () => {
    const like = document.getElementById("like")
    const love = document.getElementById("love")
    const laugh = document.getElementById("laugh")
    const sad = document.getElementById("sad")
    const angry = document.getElementById("angry")

    let post_iconCount = {
        likeCount: 0,
        loveCount: 0,
        laughCount: 0,
        sadCount: 0,
        angryCount: 0
    }

    let posts = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : {};

    function savePosts(posts) {
        localStorage.setItem("posts", JSON.stringify(posts))
    }



    like.addEventListener("click", () => {
        post_iconCount.likeCount = post_iconCount.likeCount + 1
    })

    love.addEventListener("click", () => {
        post_iconCount.loveCount = post_iconCount.loveCount + 1
    })

    laugh.addEventListener("click", () => {
        post_iconCount.laughCount = post_iconCount.laughCount + 1
    })

    sad.addEventListener("click", () => {
        post_iconCount.sadCount = post_iconCount.sadCount + 1
    })

    angry.addEventListener("click", () => {
        post_iconCount.angryCount = post_iconCount.angryCount + 1
    })




}

// show_iconContainer()


