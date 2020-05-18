const aws = require('aws-sdk');
aws.config.region = 'us-east-1';

const oracledb = require('oracledb');

exports.handler = async (event, context) =>
{
    let ret = false;

    console.log("Pool");
    await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING,
        poolMax: 1,
        poolMin: 0,
        // poolMax: 10,
        // poolMin: 10,
        // poolIncrement: 10,
    });
    let dbPool = oracledb.getPool();
    console.log("Pool created");

    let connection;
    try
    {
        console.log("Connection");
        connection = await dbPool.getConnection();
        console.log("Connection created");

        console.log("Query");
        const resp = await connection.execute(
                        "SELECT SYSDATE FROM dual WHERE :b = 1",
                        [1],
                        { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log("Query returned");

        ret = resp.rows.length > 0 ?  resp.rows[0].SYSDATE : null;
        console.log(ret);
    }
    catch (err)
    {
        throw err;
    }
    finally
    {
        if (connection)
        {
            try
            {
                console.log("Connection");
                await connection.close();
                console.log("Connection closed");
            }
            catch (err2) { console.error(err2); }
        }

        console.log("Pool");
        await dbPool.close(3);
        console.log("Pool closed");
    }

    return ret.toString();
}
