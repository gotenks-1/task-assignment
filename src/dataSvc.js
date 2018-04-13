export default class DataSvc{
    
    static async tryUserLoginByIdPass(userid,pass){
        var userdata;
        var x = await fetch('http://localhost:8000/users?id='+userid).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data[0]){
                userdata=data[0];
            }
        });
        if(userdata&&userdata.pass==pass){
            return {
                status:"success",
                uData:userdata
            }
        }else{
            return {
                status:"failed",
                error:"Invalid username or pass"
            }
        }
    }

    static async getThreadById(id){
        var thread;
        
        await fetch('http://localhost:8000/threads?id='+id).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data[0]){
                thread=data[0];
            }
        });
        if(thread){
            return {
                status:"success",
                thread:thread
            }
        }else{
            return {
                status:"failed"
            }
        }
    }

    static async getRepliesByThreadId(tid){
        var replies;
        await fetch('http://localhost:8000/replies?tid='+tid).then((response)=>{
            return response.json();
        }).then((data)=>{
            replies=data
        });
        if(replies){
            return {
                status:"success",
                replies:replies
            }
        }else{
            return {
                status:"failed"
            }
        }
    }
    
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}