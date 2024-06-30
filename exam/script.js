const board = {
    posts: [],
    elements: document.querySelector(".post"),
    init: function () {
        this.posts = interface.getPosts();
        this.render();
    },
    search: function (value, option) {
        this.clear();
        switch (option) {
            case "title":
                var posts = interface.getPostsByTitle(value); break;
            case "content":
                var posts = interface.getPostsByContent(value); break;
            case "id":
                var posts = interface.getPostsById(value); break;
        }
        this.posts = posts;
        this.render();
    },
    clear: function () {
        while (this.elements.length) {
            this.elements[0].remove();
        }
    },
    render: function () {
        this.posts.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");

            const titleSpan = document.createElement("span");
            titleSpan.classList.add("post-title");
            titleSpan.innerText = post.title;
            postDiv.appendChild(titleSpan);

            const contentSpan = document.createElement("span");
            contentSpan.classList.add("post-content");
            contentSpan.innerText = post.content;
            postDiv.appendChild(contentSpan);

            const user = interface.getUserById(post.userId);

            const userSpan = document.createElement("span");
            userSpan.classList.add("post-user");
            userSpan.innerText = user.name + " (" + user.email + ")";
            postDiv.appendChild(userSpan);
            
            const container = document.querySelector("#post-container");
            container.appendChild(postDiv);
        });
    },
    openModal: function (post) {
        const modal = document.getElementById("modal");
        const modalTitle = modal.querySelector(".modal-title");
        const modalBody = modal.querySelector(".modal-body");
        const modalAuthor = modal.querySelector(".modal-author");

        modalTitle.innerText = post.title;
        modalBody.innerText = post.content;
        const user = interface.getUserById(post.userId);
        modalAuthor.innerText = `Author: ${user.name} (${user.email})`;

        modal.style.display = "block";
    }
};

document.querySelector("#search-button").addEventListener("click", function () {
    const value = document.querySelector("#search-input").value;
    const option = document.querySelector(".search-option > input:checked").value;
    board.search(value, option);
});

document.querySelector(".modal-close").addEventListener("click", function () {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
});

window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

board.init();