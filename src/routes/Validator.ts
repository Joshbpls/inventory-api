export function containsFields(body: any, requiredFields: string[]) {
    const keys = Object.keys(body)
    return requiredFields.every((field) => keys.includes(field))
}
