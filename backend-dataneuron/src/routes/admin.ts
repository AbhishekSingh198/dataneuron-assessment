import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// initialize the adminrouter which is used in index.ts , here using it to make call by isnitializing with Hono just like express
export const adminRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>();

//middleware for increasing the count of requests in DB
adminRouter.use("/*" , async(c , next)=>{
    //intialize the prisma client using DB url for prisma accellerate (ORM)
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const count = await prisma.countA.count() ;

    if(!count){
        await prisma.countA.create({
            data: {
                count : 1
            }
        })
        await next() ;
    }
    else{
        await prisma.countA.updateMany({
            data: {
                count : {
                    increment : 1
                }
            }
        })

        await next() ;
    }
})

//post the data Add data
adminRouter.post('/' , async(c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json();

    const admin = await prisma.admin.create({
        data: {
            email: body.email ,
            name: body.name
        }
    })

    return c.json({
        id: admin.id
    })

})


//put request - edit request - using email 
adminRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
        
    const body = await c.req.json();
    
    const email = c.req.header('X-Prev-Email')
    
    const admin = await prisma.admin.update({
        where: {
            email: email
        },
        data: {
            email: body.email ,
            name: body.name,
        }
    })

    return c.json({
        id: admin.id
    })
})

//get all data endpoint
adminRouter.get('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const admins = await prisma.admin.findMany({
        select: {
            name: true,
            id: true,
            email: true
        }
    }) ;
	return c.json({
        admins
    })
})

