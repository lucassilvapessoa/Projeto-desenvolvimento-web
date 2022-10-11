module.exports = {
    postInsert: (dbConnection, [nome, endereco, urlimagem], errors ,callback) => {
        console.log('[insert]');
        const sql = `INSERT INTO pontoturistico (nome, endereco, urlimagem) VALUES (?,?,?)`;
        dbConnection.query(sql,[nome,endereco,urlimagem], callback)
    }
}