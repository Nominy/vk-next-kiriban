export function fetchData(data: string) {
    const url = `/api/data?groups=${encodeURIComponent(data)}`;
    const headers = new Headers({ 'ngrok-skip-browser-warning': 'true' });
    return fetch(url, { headers }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}