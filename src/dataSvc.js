export default class DataSvc{

    static async tryUserLoginByIdPass(userid,pass){
        var userdata;
        var x = await fetch('http://localhost:8000/users/'+userid).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data){
                userdata=data;
            }
        });
        if(userdata&&userdata.pass==pass){
            DataSvc._setUserData(userid,pass);
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

        await fetch('http://localhost:8000/threads/'+id).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data){
                thread=data;
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

    static async getThreads(){
        var threads;

        await fetch('http://localhost:8000/threads').then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data){
                threads=data;
            }
        });

        if(threads){
            return {
                status:"success",
                threads:threads
            }
        }else{
            return {
                status:"failed"
            }
        }
    }

    static async getThreadsByStatus(status){
        var threads;
        var url;
        if(status==="open"||status==="closed"){
            url='http://localhost:8000/threads/status/'+status;
        }else{
            url='http://localhost:8000/threads/user/'+status;
        }

        await fetch(url).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data){
                threads=data;
            }
        });

        if(threads){
            return {
                status:"success",
                threads:threads
            }
        }else{
            return {
                status:"failed"
            }
        }
    }

    static _setUserData(userid,pass){
        if(localStorage){
            localStorage.setItem("uid",userid);
            localStorage.setItem("upass",pass);
        }
    }

    static getUserData(){
        if(localStorage&&localStorage.getItem("uid")&&localStorage.getItem("upass")){
            return{
                id:localStorage.getItem("uid"),
                pass:localStorage.getItem("upass")
            }
        }
    }

    static removeUserData(){
        if(localStorage){
            localStorage.removeItem("uid");
            localStorage.removeItem("upass");
        }
    }

    static async getRepliesByThreadId(tid){
        var replies;
        await fetch('http://localhost:8000/replies/thread/'+tid).then((response)=>{
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

    static async postReply(data){
        var rData;
        await fetch("http://localhost:8000/replies/submit",{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'*'
            },
            // headers:{
            //     'content-type':'application/json',
            //     'Access-Control-Allow-Origin':'*'
            // },
        }).then((response)=>{
            rData={success:true};
            return response.json();
        }).then((data)=>{
            console.log('received json',data);
        });
        if(rData){
            return rData;
        }
        else{
            return {};
        }
    }

    static async postThread(value){
        var rData;
        var data={};
        data['uId']=value.user._id;
        data['content']=value.content;
        data['subject']=value.subject;
        data['status']=value.status;
        await fetch("http://localhost:8000/threads/submit",{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            return response.json();
        }).then(data=>{
            rData=data;
        });
        if(rData){
            return rData;
        }else{
            return {};
        }
    }

    static async signUp(value){
        //sign up here
        var rData;
        var data={};
        data['id']=value.id;
        data['pass']=value.pass;
        data['email']=value.email;
        data['dp']="/react.png";
        await fetch("http://localhost:8000/users",{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            return response.json();
        }).then(data=>{
            if(data.status==="success"){
                rData={
                    status:"success",
                    uData:data.user
                }
            }else{
                rData={
                    status:"failed",
                    error:data.msg
                }
            }
            console.log('received data',data);
        });
        if(rData){
            return rData;
        }else{
            return {};
        }
    }

}