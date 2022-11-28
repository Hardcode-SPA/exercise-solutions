const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

async function rickAndMortyCharacters() {
    // Custom Rueckgabeobjekt, das anzeigt, ob Funktion erfolgreich war
    // und ggf. Daten mitliefert, bzw. Fehlerdaten im Falle von Fehlern mitliefert
    let resultObj = {
        success: true,
        data: null,
        error: null
    };


    try {
        // Frage Liste der Charaktere von der API an
        let respCharList = await fetch(API_BASE_URL);

        // Pruefe, ob Anfrage erfolgreich war (HTTP Code 2XX)
        if (respCharList.ok) {
            // Parse von der API gelieferte Daten
            let charListBody = await respCharList.json();

            // Extrahiere Gesamtanzahl der Charaktere
            let charCount = charListBody.info.count;

            // Erhalte Zufallszahl zwischen 1 und charCount+200
            let randomID = Math.floor(Math.random() * (charCount + 200) + 1);
            // let randomID = 966;
        
            // Frage Charaktereintrag von der API mit ZufallsID an
            let respChar = await fetch(API_BASE_URL + randomID);

            // Pruefe, ob Anfrage erfolgreich war (HTTP Code 2XX)
            if (respChar.ok) {
                // Parse erhaltene Daten
                let charBody = await respChar.json();
                // Speichere geparste Daten in Rueckgabeobjekt
                resultObj.data = charBody;
                // Setze Erfolgsindikator des Rueckgabeobjekts auf true
                resultObj.success = true;
            
            } else { // Anfrage war nicht erfolgreich (HTTP Code 4XX oder 5XX)
                // Erstelle Fehlerobjekt
                let error = {};

                // Pruefe, ob HTTP Status 404 ist (Angefragte Ressource nicht gefunden)
                if (respChar.status === 404) {
                    // Beschreibe Fehlerobjekt mit Details zum Fehler
                    error = {
                        errorCode: respChar.status,
                        message: `Error: The Database was compromised. No data under the code ${randomID}.`
                    };
            
                } else { // Sonstige Fehler
                    // Beschreibe Fehlerobjekt mit Details zum Fehler
                    error = {
                        errorCode: respChar.status,
                        message: `The database was compromised.`
                    };
                }

                // Loese Fehler aus und uebergebe ihm JSON Repraesentation des Fehlerobjekts
                throw new Error(JSON.stringify(error));
            }
        
        } else {
            // Loese Fehler aus und uebergebe ihm JSON Repraesentation des Fehlerobjekts
            throw new Error(JSON.stringify({
                errorCode: respCharList.status,
                message: `The database was compromised.`
            }));
        }

    } catch (error) {
        // Parse JSON Fehlerobjekt in JS Objekt
        let errorObj = JSON.parse(error.message);

        // Setze Erfolgsindikator des Rueckgabeobjekt auf false
        resultObj.success = false;

        // Setze das geparste Fehlerobjekt als Fehlerobjekt im Rueckgabeobjekt
        resultObj.error = errorObj;

    } finally {
        // Gebe in jedem Fall das Rueckgabeobjekt als Rueckgabewert zurueck
        return resultObj;
    }

/* 
    fetch(API_BASE_URL)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            }
        })
        .then(body => {
            let maxCount = body.info.count();
            let randomID = Math.floor(Math.random() * (charCount + 200) + 1);

            return fetch(API_BASE_URL + randomID);
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                if (resp.status === 404) {
                    let errObj = {
                        status: 404,
                        msg: `The database was compromised. No data found for ID ${77}`
                    };
                    throw new Error(JSON.stringify(errObj));
                }
            }
        })
        .then(body => {
            successCallback(body);
        })
        .catch(error => {
            errorCallback(error);
        }); 
 */
}


export { rickAndMortyCharacters };