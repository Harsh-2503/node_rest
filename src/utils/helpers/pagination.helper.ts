import config from "../../configs/general.config";

function getOffset(currentPage: number = 1): number {
    const result: number = (currentPage - 1) * config.listPerPage;
    return result
}

function validatePageParam(page: unknown): number {
    let currentPage: number = Number(page);
    if (isNaN(currentPage) || currentPage <= 0) {
        currentPage = 1;
    }
    return currentPage;
}




export { getOffset, validatePageParam };