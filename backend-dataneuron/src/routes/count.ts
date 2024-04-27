import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const countRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>();

countRouter.get('/a' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const entry = await prisma.countA.findFirst({
        select : {
            count : true
        }
    })

    if(!entry){
        return c.json({count : 0}) ;
    }
    else{
        return c.json({count : entry.count}) 
    }
})

countRouter.get('/c' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const entry = await prisma.countC.findFirst({
        select : {
            count : true
        }
    })

    if(!entry){
        return c.json({count : 0}) ;
    }
    else{
        return c.json({count : entry.count}) 
    }
})

countRouter.get('/e' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    const entry = await prisma.countE.findFirst({
        select : {
            count : true
        }
    })

    if(!entry){
        return c.json({count : 0}) ;
    }
    else{
        return c.json({count : entry.count}) 
    }
})