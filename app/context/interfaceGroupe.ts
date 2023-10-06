export interface IGroupe {
    _id: Id
    name: string
    id: Id2
  }
  
  export interface Id {
    $oid: string
  }
  
  export interface Id2 {
    $numberInt: string
  }
  