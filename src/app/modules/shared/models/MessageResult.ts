export enum JsonMessageCode
{
    Success = 1,
    Error = 2,
    UnknowError = 3,
    SesssaoExpirada = 4
}

export interface JsonResponse<T>
{
    codeResponse:JsonMessageCode;
    data:T;
    message:string
}