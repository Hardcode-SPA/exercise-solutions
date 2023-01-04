// konstantes Objekt mit allen Größenvoreinstellungen
const SIZES = {
    s: '30px',
    m: '60px',
    l: '120px',
    xl: '200px'
};
// Konstante für die Standardgröße
const DEFAULT_SIZE = SIZES.m;

// Konstantes Objekt für die Typenvoreinstellungen
const TYPES = {
    square: '0px',
    rounded: '8px',
    circle: '50%'
};
// Konstante für den Standardtyp
const DEFAULT_TYPE = TYPES.square;


// Props:
// -> src: Pfad zum Bild, das angezeigt werden soll
// -> size: s,m,l,lx - Die 4 möglichen Größen des anzuzeigenden Avatars
// -> type: square, rounded, circle - Die 3 möglichen Formen des anzuzeigenden Avatars
function Avatar(props) {
    // Wenn die prop "size" angegeben, setze Breite auf die entsprechende Voreinstellung
    // sonst Standardgröße
    let width = (props.size) ? SIZES[props.size] : DEFAULT_SIZE;
    let height = width;

    // Wenn die prop "type" angegeben, setze border-radius auf die entsprechende Voreinstellung
    // sonst Standardtype
    let borderRadius = (props.type) ? TYPES[props.type] : DEFAULT_TYPE;

    return (
        <img 
            src={props.src} 
            alt="This is an avatar" 
            /* Die Styles können wie in CSS angegeben werden in doppelten geschweiften Klammern */
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius
            }}
        />
    );
}

export default Avatar;