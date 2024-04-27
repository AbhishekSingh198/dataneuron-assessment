import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


//initialize the customer router with hono
export const customerRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>();

//middleware to count requests
customerRouter.use("/*" , async(c , next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const count = await prisma.countC.count() ;

    if(!count){
        await prisma.countC.create({
            data: {
                count : 0
            }
        })
        await next() ;
    }
    else{
        await prisma.countC.updateMany({
            data: {
                count : {
                    increment : 1
                }
            }
        })

        await next() ;
    }
})


//post the data api
customerRouter.post('/' , async(c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json();

    const customer = await prisma.customer.create({
        data: {
            email: body.email ,
            name: body.name
        }
    })

    return c.json({
        id: customer.id
    })

})

//edit api
customerRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
        
    const body = await c.req.json();
    
    const email = c.req.header('X-Prev-Email')
    const customer = await prisma.customer.update({
        where: {
            email : email
        },
        data: {
            email: body.email ,
            name: body.name,
        }
    })

    return c.json({
        id: customer.id
    })
})

//get all data
customerRouter.get('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const customers = await prisma.customer.findMany({
        select: {
            name: true,
            id: true,
            email: true
        }
    }) ;
	return c.json({
        customers
    })
})
