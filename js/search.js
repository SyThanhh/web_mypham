var searchForm = document.getElementById('searchForm');
var searchIcon = document.getElementById('Icon');

function opensearch() {
    searchForm.style.opacity = '1';
    searchForm.style.top = '100%';
    searchForm.style.visibility = 'visible';
}

searchIcon.addEventListener('click', opensearch);

searchForm.addEventListener('mouseleave', function() {
    searchForm.style.opacity = '0';
    searchForm.style.top = '100%';
    searchForm.style.visibility = 'hidden';
});





