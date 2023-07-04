
export interface IWriteRepository<T>{

     add(item:T):boolean

     addRange(items:Array<T>):boolean

     remove(item:T):boolean

     removeRange(items:Array<T>):boolean

     update(item:T):boolean
}