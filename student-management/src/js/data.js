// URL-Konstanten
const API_BASE_URL = 'https://test.100best.guide/locations/dci-students';
const API_STUDENT_ENDPOINT = 'student';

// Bsp.: https://test.100best.guide/locations/dci-students/student?skip=10&limit=20&classId=cs-2022
async function fetchStudents(limit = '', skip = '', classId = '') {
    // Baue Request-Url zusammen
    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}/?limit=${limit}&skip=${skip}&classId=${classId}`
    
    try {
        // Fuehre GET-Anfrage an API-Server durch
        let res = await fetch(url);

        // Wenn massiver Fehler (500)
        if (res.status === 500) {
            // Schmeisse Fehler
            throw new Error(res.status);
        }

        // Parse API-Antwort
        let body = await res.json();

        // Wenn API-Antwort 2XX
        if (res.ok) {
            // Beende Promise positiv mit geparster Antwort
            return Promise.resolve(body);
        }

        // Schmeisse Fehler mit geparster Antwort
        throw new Error(JSON.stringify(body));

    } catch (error) {
        // Beende Promise negativ mit Fehlernachricht
        return Promise.reject(error);
    }
    
}

export { fetchStudents };