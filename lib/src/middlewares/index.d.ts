declare function errorHandler(err: any, req: any, res: any, next: any): Promise<void>;
declare function validationCheck(req: any, res: any, next: any): void;
declare const _default: {
    validationCheck: typeof validationCheck;
    errorHandler: typeof errorHandler;
};
export default _default;
