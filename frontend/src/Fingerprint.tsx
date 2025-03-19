import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";

export const Fingerprint = () => {
    const [fingerprint, setFingerPrint] = useState<string | null>(null)

    useEffect(() => {
        getFingerprint().then((fingerprint) => setFingerPrint(fingerprint))
    }, [])
    return <div>{fingerprint}</div>
}
export default Fingerprint
