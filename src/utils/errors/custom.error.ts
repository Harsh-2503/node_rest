
function isDuplicateKeyError(error: any): error is { code: string } {
    return error && error.code === '23505';
}
function isForeignKeyConstraitError(error: any): error is { code: string } {
    return error && error.code === '23503';
}

function isInavlidUUIDError(error: any): error is { code: string } {
    return error && error.code === '22P02'
}

export { isDuplicateKeyError, isForeignKeyConstraitError, isInavlidUUIDError }