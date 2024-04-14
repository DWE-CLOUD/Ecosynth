export function getImagePaths(searchText, quantity, safeSearch, color, license) {
    return fetch("http://127.0.0.1:5000/simple_search?" + new URLSearchParams({
        keywords: searchText,
        max_results: quantity,
        safesearch: (safeSearch ? "On" : "Off"),
        color: color,
        license: license
    }))
    .then(response => response.json())
    .then(response => response.map(item => item['image']))
    .catch(err => {
        console.log(err)
        return "";
    });
}