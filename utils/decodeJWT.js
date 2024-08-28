export const  decodeJWT = (token) => {
    const base64UrlToBase64 = base64Url => {
        return base64Url.replace(/-/g, '+').replace(/_/g, '/');
    };

    const base64Decode = base64 => {
        const padding = '='.repeat((4 - base64.length % 4) % 4);
        const base64WithPadding = base64 + padding;
        const binaryString = atob(base64WithPadding);
        const bytes = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return new TextDecoder().decode(bytes);
    };

    const [header, payload, signature] = token.split('.');

    const decodedHeader = base64Decode(base64UrlToBase64(header));
    const decodedPayload = base64Decode(base64UrlToBase64(payload));

    return {
        header: JSON.parse(decodedHeader),
        payload: JSON.parse(decodedPayload),
        signature: signature
    };
}
