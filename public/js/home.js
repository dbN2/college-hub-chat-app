$(document).ready(()=>{
    // ajax request
    $.get("/api/posts",{followingOnly: true}, results => {
        //console.log(results);
        outputPosts(results, $(".postsContainer"));
    })
})  
