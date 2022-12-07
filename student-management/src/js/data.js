// URL-Konstanten
const API_BASE_URL = 'https://test.100best.guide/locations/dci-students';
const API_STUDENT_ENDPOINT = 'student';

// Bsp.: https://test.100best.guide/locations/dci-students/student?skip=10&limit=20&classId=cs-2022
async function fetchStudents(limit = '', skip = '', classId = '') {
    // Baue Request-Url zusammen
    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}/?limit=${limit}&skip=${skip}&classId=${classId}`;

    // Fuehre GET-Anfrage an API-Server durch
    return performFetch(url, 'GET', null);
}


async function fetchStudent(studentId) {
    // Baue Request-Url zusammen
    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}/${studentId}`;

    // Fuehre GET-Anfrage an API-Server durch
    return performFetch(url, 'GET', null);
}

async function postStudent(data) {
    // Baue Request-Url zusammen
    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}`;

    // Fuehre POST-Anfrage an API-Server durch
    return performFetch(url, 'POST', data);
}

async function putStudent(data) {
    // Baue Request-Url zusammen
    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}/${data._id}`;

    // Fuehre PUT-Anfrage an API-Server durch
    return performFetch(url, 'PUT', data);
}

async function deleteStudent(id) {
    // Baue Request-Url zusammen
    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}/${id}`;

    // Fuehre DELETE-Anfrage an API-Server durch
    return performFetch(url, 'DELETE', null);
}

// Hilfsfunktion zum Durchfuehren von Fetch-Anfragen an die API
async function performFetch(url, method, data) {
    // Baue options-Objekt zusammen
    let options = {
        method: method, // HTTP Methode
        headers: { // 'Briefkopf'
            'Content-Type': 'application/json' // Daten Format
        },
        body: JSON.stringify(data) // Payload
    };

    // Wenn GET- oder DELETE-Anfrage, loesche body aus den Options raus, 
    // weil verboten
    if ( method === 'GET' || method === 'DELETE' ) delete options.body;


    try {
        // Fuehre Anfrage an API-Server durch
        let res = await fetch(url, options);

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


export { fetchStudents, fetchStudent, postStudent, putStudent, deleteStudent };