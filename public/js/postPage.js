$(document).ready(()=>{
    // ajax request
    $.get("/api/posts/" + postId, results => {
        //console.log(results);
        outputPostsWithReplies(results, $(".postsContainer"));
    })
})  
