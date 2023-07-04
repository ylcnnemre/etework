
export interface IReadRepository<T> {

    getAll():Array<T>
    getById(id:string):T

}