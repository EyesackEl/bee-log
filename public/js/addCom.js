const addComHandler = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const comment_text = document.querySelector('#contentInput').value.trim();
    const post_id = urlParams.get('post_id');

    const bodyJson = JSON.stringify({ comment_text, post_id })



    if(comment_text) {
        const response = await fetch ('/api/comment', {
            method: 'POST',
            body: bodyJson,
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#addComBtn').addEventListener('click', addComHandler);

