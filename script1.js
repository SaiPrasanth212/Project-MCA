// Trigger split-screen animation
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500); // Trigger animation after 500ms
});

// Redirection on button click
document.getElementById('trackBtn').addEventListener('click', function() {
    window.location.href = 'exp_track.html';  // Redirect to the expense tracker page
});
