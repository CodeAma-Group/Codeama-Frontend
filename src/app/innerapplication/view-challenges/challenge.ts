export interface Challenge{
  pictures:[],
  _id:string,
  applicationEndDate: string,
  endDate: string,
  announceWinnersDate:string,
  title:string,
  description: string,
  prizes:[],
  comments:[],
  participants:[]
}

export interface Data {
    data:{
  pictures:[],
  _id:string,
  applicationEndDate: string,
  endDate: string,
  announceWinnersDate:string,
  title:string,
  description: string,
  prizes:[],
  comments:[],
  participants:[]
    },
    message: String
}