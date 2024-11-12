const { Router } = require("express");
const DBConnection = require("../config/dbConnection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = Router();

router.get("/", async(req, res) => {
    const db = new DBConnection();

    try {
        await db.connect();
        //Execute a query
        const results = await db.query(`SELECT * FROM user`);

        if(Object.keys(results).length != 0) {
            res.json({ message: "Method Get", data: results, status: 200 });
        } else {
            res.json({ message: "there are no records", data: results, status: 404 });
        }
    } catch (err) {
        res.json({ message: "Error Get", data: err.message, status: 404 });
    } finally {
        // Close the connection
        await db.close();
    }
});

router.get("/:id", async(req, res) => {
    const db = new DBConnection();

    try {
        await db.connect();
        //Execute a query 
        const getUser = await db.query(`SELECT * FROM user WHERE user_id = ${req.params.id}`);

        if(Object.keys(getUser).length != 0) {
            res.json({ message: "Method Get Id", data: getUser, status: 200 });
        } else {
            res.json({ message: "Unregistered user", data: getUser, status: 404 });
        }
    } catch (err) {
        res.json({ message: "Error Get Id", data: err.message, status: 404 });
    } finally {
        // Close the connection
        await db.close();
    }
})

router.post("/", async(req, res) => {
    const db = new DBConnection();

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const dataQry = [req.body.user, hashedPassword, req.body.status, req.body.role];
        const qry = `INSERT INTO user (user_user, user_password, userStatus_fk, role_fk) VALUES (?, ?, ?, ?);`;

        await db.connect();
        //Execute a query

        const results = await db.query(qry, dataQry);

        if(Object.keys(results).length != 0) {
            res.json({ message: "Method Post", data: "ok", status: 200 });
        } else {
            res.json({ message: "Methos Post", data: "error", status: 404 });
        }
    } catch (err) {
        res.json({ message: "Error Post", data: err.message, status: 404 });
    } finally {
        // Close the connection 
        await db.close();
    }
})

router.put("/:id", async(req, res) => {
    const db = new DBConnection();

    try {
        await db.connect();
        const getRole_module = await db.query(`SELECT * FROM role_module WHERE roleModule_id = ${req.params.id}`);

        if(Object.keys(getRole_module).length != 0) {
            const dataQry = [req.body.role, req.body.module];
            const qry = `UPDATE role_module SET role-fk = ?, module_fk = ? WHERE roleModule_id = ${req.params.id};`;
            //Execute a query
            const results = await db.query(qry, dataQry);

            if(Object.keys(results).length != 0) {
                res.json({ message: "Method Put", data: "ok", status: 200 });
            } else {
                res.json({ message: "Method Put", data: "error", status: 404 });
            }
        } else {
            res.json({ message: "module not create", data: "error", status: 404 });
        }
    } catch (err) {
        res.json({ message: "Error Post", data: err.message, status: 404 });
    } finally {
        // Close the connection 
        await db.close();
    }
})

router.delete("/:id", async(req, res) => {
    const db = new DBConnection();

    try {
        await db.connect();
        const getRole_module = await db.query(`SELECT * FROM role_module WHERE roleModule_id = ${req.params.id}`);

        if(Object.keys(getRole_module).length != 0) {
            const qry = `DELETE FROM role_module WHERE roleModule_id = ${req.params.id};`;
            //Execute a query
            const results = await db.query(qry);

            if(Object.keys(results).length != 0) {
                res.json({ message: "Method Delete", data: "ok", status: 200 });
            } else {
                res.json({ message: "Method Delete", data: "error", status: 404 });
            }
        } else {
            res.json({ message: "module not Delete", data: "error", status: 404 });
        }
    } catch (err) {
        res.json({ message: "Error Delete", data: err.message, status: 404 });
    } finally {
        // Close the connection
        await db.close();
    }
})

module.exports = router;