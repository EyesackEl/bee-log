const addPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#titleInput').value.trim();
    const post_content = document.querySelector('#contentInput').value.trim();


    if(title && post_content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, post_content}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#addPostBtn').addEventListener('click', addPostHandler);
