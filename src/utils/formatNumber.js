export function formatNumber(value) {
    if (value === "" || value === null || value === undefined) {
        return "";
    }

    return Number(value).toLocaleString("en-US");
}