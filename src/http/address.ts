import serve from "../utils/axios";

export function getFriend(id:number |string){
  return serve({
    method:"GET",
    url:`/friend/${id}`
  })

}