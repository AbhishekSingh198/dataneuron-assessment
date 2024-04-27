import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

//initialize employee router with hono
export const employeeRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>();

//middleware for count
employeeRouter.use("/*" , async(c , next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const count = await prisma.countE.count() ;

    if(!count){
        await prisma.countE.create({
            data: {
                count : 0
            }
        })
        await next() ;
    }
    else{
        await prisma.countE.updateMany({
            data: {
                count : {
                    increment : 1
                }
            }
        })

        await next() ;
    }
})


//add data api
employeeRouter.post('/' , async(c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const body = await c.req.json();

    const employee = await prisma.employee.create({
        data: {
            email: body.email ,
            name: body.name
        }
    })

    return c.json({
        id: employee.id
    })

})

//edit data api
employeeRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
        
    const body = await c.req.json();
    const email = c.req.header('X-Prev-Email')
    
    const employee = await prisma.employee.update({
        where: {
            email :  email

        },
        data: {
            email: body.email ,
            name: body.name,
        }
    })

    return c.json({
        id: employee.id
    })
})

//get all data api
employeeRouter.get('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const employees = await prisma.employee.findMany({
        select: {
            name: true,
            id: true,
            email: true
        }
    }) ;
	return c.json({
        employees
    })
})
