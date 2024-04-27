import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const adminRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>();


adminRouter.use("/*" , async(c , next)=>{
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

