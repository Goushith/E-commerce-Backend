const db= require('./db')

const getProducts=()=>{
   return db.Product.find().then(
    (result)=>{
       if (result){
        return {
            status:true,
            statusCode:200,
            products:result,
        }
    }
    else{
        return{
            status:false,
            statusCode:404,
            message:'no products found',
        }
    }
})
}


const addtowishlist=(id,title,price,image,description)=>{


    return db.Wishlist.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:'Product Already Exists'
                }
            }else{
                const newProduct =new db.Wishlist({id,title,price,image,description})
                    newProduct.save()
                    return{
                        status:true,
                        statusCode:200,
                        message:'Product added to wishlist'
                    }
            }
        }
    )
}


const getwishlist=()=>{
return db.Wishlist.find().then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                products:result
            }
        }
        else{
            return{
                status:false,
                statusCode:404,
                message:'your Wishlist is empty'
            }
        }
    }
)
    
}





const deletewish=(id)=>{
    return db.Wishlist.deleteOne({id}).then(
        (result)=>{
            if(result){
                // return{
                //     // status:true,
                //     // statusCode:200,
                //     // wishlist:result,
                //     // message:'product removed'
                // }
                return db.Wishlist.find().then(
                    (result)=>{
                        if(result){
                            return{
                                status:true,
                                statusCode:200,
                                wishlist:result,
                                message:"product removed Successfully"
                            }
                        }
                        else{
                            return{
                                status:false,
                                statusCode:404,
                                message:'your Wishlist is empty'
                            }
                        }
                    }
                )
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'your Wishlist is empty'
                }
            }
        }
    )
        
    }





module.exports={
getProducts,
addtowishlist,
getwishlist,
deletewish

}
