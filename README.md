# DataNeuron- Assessment - build a page with 3 resiable components (every components have add data to table, count of API requests , and table which shows data)

**Three Components (My assumption to make things better)**
1. Employee Data
2. Admin Data
3. Customer

# Created a Backend API using 
1. Cloudflare workers (deployed here)
2. hono library (similar to express in cloudflare workers)
3. Postgresql (DB)
4. PRISMA (ORM for connection pooling and easier DB access)
5. BAckend deployed to cloudflare worker
6. `https://backend-dataneuron.pabhishek198.workers.dev` (this is backend endpoint below is the frontend url)


# Created a Frontend Aas mentioned
1. React + Typescript
2. tailwind
3. MAterial UI
4.  `https://dataneuron-assessment.vercel.app/`


***DataBase Schema***
1. 3 tables as employee, admin, customer for name , email
2. 1 for every components count which acts as middleware for every component and get count of requests and increase.
3. Also use the count to get the count data.

## The endpoints for API
1. Got three routes for employee , customer , admin for the get data , put data
2. One more is for using count