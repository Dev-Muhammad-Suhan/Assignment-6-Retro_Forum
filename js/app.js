// First
const loadAPI = async () => {
    const resposeAPI = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await resposeAPI.json();
    const posts = data.posts;
    createPosts(posts)
}

// Second
const createPosts = (posts) => {
    posts.forEach(currentPost => {
        // Access All Data
        const userId = currentPost.id;
        const profileImage = currentPost.image;
        const isActive = currentPost.isActive;

        const category = currentPost.category;
        const authorName = currentPost.author.name;
        const title = currentPost.title;
        const description = currentPost.description;

        const comment_count = currentPost.comment_count;
        const view_count = currentPost.view_count;
        const posted_time = currentPost.posted_time;

        // Custom Created ID
        const titleID = "title" + userId;
        const viewID = "view" + userId;

        // Create HTML Element
        const allPostContainer = document.getElementById('all-post');
        const div = document.createElement('div');

        // Set inner HTML
        div.innerHTML = `
            <div class=" md:flex lg:flex gap-6 p-6 border rounded-3xl bg-[#7d7dfc17] border-[#797DFC]">
                <!-- Person Image -->
                <div>
                    <div class="avatar">
                        <!-- isActive -->
                        <div id ="${userId}" class="badge badge-sm absolute z-20 -right-1"></div>

                        <div class="max-w-16 mask mask-squircle">
                            <img
                                src="${profileImage}" />
                        </div>
                    </div>
                </div>

                <!-- Post Detail -->
                <div class="grow" >
                    <h3 class="font-medium mb-3"><span># ${category}</span><span> &nbsp; Author : ${authorName}</span></h3>
                    <h1 id="${titleID}" class="text-xl font-bold mb-4">${title}</h1>
                    <p class="mb-5 text-gray-500">${description}</p>
                    <hr class="border-dashed border-gray-400 mb-6">

                    <div class="flex justify-between items-center">
                        <div class="flex gap-6">
                            <!-- Massage -->
                            <div><i class="fa-regular fa-message"></i> ${comment_count}</div>
                            <!-- View -->
                            <div><i class="fa-regular fa-eye"></i> <span id="${viewID}">${view_count}</span></div>
                            <!-- Time -->
                            <div><i class="fa-regular fa-clock"></i> ${posted_time} min</div>
                        </div>

                        <!-- Mail-icon -->
                        <div onclick="markAsRead(${titleID}, ${viewID})" class="btn"><i class="fa-solid fa-square-envelope fa-2xl"
                                style="color: #45b090;"></i></div>
                    </div>
                </div>
            </div>
            `;
        // ------------------------------
        // Append All-Post
        allPostContainer.appendChild(div);

        // Set Online-Offline Status
        const getId = document.getElementById(userId);
        if (!!isActive) {
            const online = getId.classList.add("bg-green-400")
        }
        else {
            const online = getId.classList.add("bg-red-500")
        }

    })
}

// Third
function markAsRead(titleId, viewId) {
    const title = titleId.innerText;
    const view = viewId.innerText

    const markAsReadContainer = document.getElementById("mark-as-read");
    const div2 = document.createElement('div');
    div2.innerHTML = `
        <div class="bg-white rounded-3xl flex justify-between items-center p-4">
            <div class="w-52 font-bold text-gray-600">${title}</div>
            <div><i class="fa-regular fa-eye"></i> <span class="text-gray-500">${view}</span></div>
        </div>
    `;
    markAsReadContainer.appendChild(div2);

    // Set Mark Count
    const markCount = document.getElementById("mark-count")
    let markCountInt = parseInt(document.getElementById("mark-count").innerText);
    let newCount = markCountInt + 1;

    markCount.innerText = newCount;
}


// Fourth
const loadLatestPostsAPI = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();
    const latestPosts = data;
    createLatestPosts(latestPosts);
}

// Fifth
const createLatestPosts = (latestPosts) => {
    latestPosts.forEach(LPost => {
        const cover_image = LPost.cover_image;
        const title = LPost.title;
        const description = LPost.description;
        const profile_image = LPost.profile_image;
        const authorName = LPost.author.name;

        // Set Post-Date
        let posted_date = '';
        posted_date = LPost.author.posted_date;
        if (posted_date == undefined) {
            posted_date = "No publish date"
        }

        // Set Designation
        let authorDesignation = '';
        authorDesignation = LPost.author.designation;
        if (authorDesignation == undefined) {
            authorDesignation = "Unknown";
        }

        // Create New Element
        const latestPostsContainer = document.getElementById("Latest-Posts-Container");
        const div = document.createElement('div');

        div.classList.add("flex-1");
        div.classList.add("flex");
        div.innerHTML = `
                <div class="card min-h-[530px] bg-base-100 shadow-xl border">
                    <figure class="px-6 pt-6">
                        <img src="${cover_image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="px-6 py-4">
                        <!-- Date -->
                        <div>
                            <i class="fa-regular fa-calendar-minus" style="color: #5f6367;"></i>&nbsp;
                            <span>${posted_date}</span>
                        </div>

                        <h2 class="card-title font-bold py-4">${title}</h2>
                        <p>${description}</p>

                        <div class="card-actions items-center gap-3 pt-4">
                            <!-- img -->
                            <div class="avatar">
                                <div class="w-8 rounded-full">
                                    <img src="${profile_image}" />
                                </div>
                            </div>
                            <!-- text -->
                            <div>
                                <h3 class="font-bold">${authorName}</h3>
                                <p>${authorDesignation}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        latestPostsContainer.appendChild(div)
    })

}


// Call Function
loadAPI()
loadLatestPostsAPI()


// ---------------------------------------------
// Search Functionality
const searchBtnClick = () => {
    const inputField = document.getElementById("input-field");
    const categoryName = inputField.value;
    searchResultAPI(categoryName);
    loadSpinner(true);
}
const searchResultAPI = async (categoryName) => {
    const resposeAPI = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await resposeAPI.json();
    const posts = data.posts;
    showResult(posts)
}
const showResult = (post) => {
    const allPostContainer = document.getElementById('all-post');
    // Clear allPostContainer Before Search
    allPostContainer.textContent = '';

    post.forEach(currentPost => {
        console.log(currentPost)

        // --------------------------------

        // Access All Data
        const userId = currentPost.id;
        const profileImage = currentPost.image;

        const category = currentPost.category;
        const authorName = currentPost.author.name;
        const title = currentPost.title;
        const description = currentPost.description;

        const comment_count = currentPost.comment_count;
        const view_count = currentPost.view_count;
        const posted_time = currentPost.posted_time;

        // Custom Created ID
        const titleID = "title" + userId;
        const viewID = "view" + userId;

        // Create HTML Element
        const allPostContainer = document.getElementById('all-post');
        const div = document.createElement('div');

        // Set inner HTML
        div.innerHTML = `
            <div class=" md:flex lg:flex gap-6 p-6 border rounded-3xl bg-[#7d7dfc17] border-[#797DFC]">
                <!-- Person Image -->
                <div>
                    <div class="avatar">
                        <!-- isActive -->
                        <div id ="${userId}" class="badge badge-sm absolute z-20 -right-1"></div>

                        <div class="max-w-16 mask mask-squircle">
                            <img
                                src="${profileImage}" />
                        </div>
                    </div>
                </div>

                <!-- Post Detail -->
                <div class="grow" >
                    <h3 class="font-medium mb-3"><span># ${category}</span><span> &nbsp; Author : ${authorName}</span></h3>
                    <h1 id="${titleID}" class="text-xl font-bold mb-4">${title}</h1>
                    <p class="mb-5 text-gray-500">${description}</p>
                    <hr class="border-dashed border-gray-400 mb-6">

                    <div class="flex justify-between items-center">
                        <div class="flex gap-6">
                            <!-- Massage -->
                            <div><i class="fa-regular fa-message"></i> ${comment_count}</div>
                            <!-- View -->
                            <div><i class="fa-regular fa-eye"></i> <span id="${viewID}">${view_count}</span></div>
                            <!-- Time -->
                            <div><i class="fa-regular fa-clock"></i> ${posted_time} min</div>
                        </div>

                        <!-- Mail-icon -->
                        <div onclick="markAsRead(${titleID}, ${viewID})" class="btn"><i class="fa-solid fa-square-envelope fa-2xl"
                                style="color: #45b090;"></i></div>
                    </div>
                </div>
            </div>
            `;
        // ------------------------------
        // Append All-Post
        allPostContainer.appendChild(div);

        // Set Online-Offline Status
        const isActive = currentPost.isActive;
        const getId = document.getElementById(userId);

        if (!!isActive) {
            const online = getId.classList.add("bg-green-400")
        }
        else {
            const online = getId.classList.add("bg-red-500")
        }

        // --------------------------------
    })
    // Hide Loader after Show all Result
    loadSpinner(false);
}

// Loading Spinner
const loadSpinner = (isTrue) => {
    const loader = document.getElementById('loader');
    if (isTrue) {
        loader.classList.remove('hidden')

    } else {
        loader.classList.add('hidden')
    }
}