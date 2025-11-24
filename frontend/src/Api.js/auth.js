import config from "../../config";

export class Service{


    async create(name,email,password){
        try {
            const res = await fetch(config.create, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify({ name, email, password }),
            });

            const data= await res.json()

            if (!res.ok) {
                
                const error = new Error(data.message || 'Failed to signup');
        
                throw error;
            }

           

            return data;

        } catch (error) {
             console.log("User Create Error:: ", error);
            throw error;
        }
    }



    async login(email, password) {
        try {
            const res = await fetch(config.login, {
                method: 'POST',
                headers: config.headers,
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json(); 

            if (!res.ok) {
                throw new Error(data.message || 'Failed to login'); 
            }

            return data;

        } catch (error) {
            console.log("login :: ", error);
            throw error;
        }
    }


    async logout(token){
        try {
            
            const header=config.headers;
                
            if(token){
                    header['authorization']=token
                }

            const res=await fetch(config.logout,{
                    method:"POST",
                    headers:header,
                })
            const data=res.json()

            if (!res.ok) {
                    throw new Error(data.message || 'Failed to logout');
                }
            
                

                return data

        } catch (error) {
            console.log("loogout :: ", error);
            throw error;
        }
    }
}

const authService=new Service()

export default authService