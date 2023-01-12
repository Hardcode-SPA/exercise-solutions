
// Erhaelt die Clickhandler als Callbacks ueber die Props
export default function Controls({pushCallback, popCallback, unshiftCallback, shiftCallback}) {
    return (
        <>
            <button
                onClick={pushCallback}
            >push</button>

            <button
                onClick={popCallback}
            >pop</button>

            <button
                onClick={unshiftCallback}
            >unshift</button>

            <button
                onClick={shiftCallback}
            >shift</button>
        </>
    );
}