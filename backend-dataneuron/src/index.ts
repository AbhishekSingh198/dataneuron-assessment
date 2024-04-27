import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { adminRouter } from './routes/admin';
import { customerRouter } from './routes/customer';
import { employeeRouter } from './routes/employee';
import { countRouter } from './routes/count';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.use("/*", cors());
app.route("/api/v1/admin" , adminRouter);
app.route("/api/v1/customer" , customerRouter);
app.route("/api/v1/employee" , employeeRouter);
app.route("/api/v1/count" , countRouter)

export default app
